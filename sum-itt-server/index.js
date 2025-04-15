require('dotenv').config();

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send("✅ Sum-itt backend is running!");
});

app.post('/summarize', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const filePath = path.join(__dirname, file.path);
    let textContent = "";

    if (file.mimetype === 'application/pdf') {
      const pdfBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(pdfBuffer);
      textContent = data.text;
    } else if (file.mimetype === 'text/plain') {
      textContent = fs.readFileSync(filePath, 'utf-8');
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    // Trim long inputs to avoid API limits
    const trimmedText = textContent.slice(0, 3000);

    // Summarize via Hugging Face API (DistilBART)
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: trimmedText },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
      }
    );

    const summary = response.data[0]?.summary_text || "Summary not available.";
    res.json({ summary });

    // Cleanup
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error("Error in summarization:", err.message);
    res.status(500).json({ error: "Failed to summarize the file" });
  }
});
const csv = require('csv-parser');

app.post('/expense-summary', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = path.join(__dirname, file.path);
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      fs.unlinkSync(filePath); // cleanup

      let expense = 0;
      const categoryMap = {};
      const monthlySummaryMap = {};

      results.forEach((row) => {
        const amount = parseFloat(row.Amount);
        if (isNaN(amount) || amount > 0) return; // Only consider negative (spent) values

        const absAmount = Math.abs(amount);
        expense += absAmount;

        const category = row.Category || 'Uncategorized';
        categoryMap[category] = (categoryMap[category] || 0) + absAmount;

        const date = new Date(row.Date);
        const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        monthlySummaryMap[month] = (monthlySummaryMap[month] || 0) + absAmount;
      });

      const topCategories = Object.entries(categoryMap)
        .map(([category, amount]) => ({ category, amount: amount.toFixed(2) }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

      const monthlySummary = Object.entries(monthlySummaryMap)
        .map(([month, amount]) => ({ month, amount: amount.toFixed(2) }))
        .sort((a, b) => a.month.localeCompare(b.month));

      res.json({
        summary: {
          total: expense.toFixed(2),
          topCategories,
          monthlySummary,
        }
      });
    });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});

app.post('/sumscriptor', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const filePath = path.join(__dirname, file.path);
    const fileData = fs.readFileSync(filePath);

    const response = await axios.post(
      'https://api.deepgram.com/v1/listen',
      fileData,
      {
        headers: {
          Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
          'Content-Type': file.mimetype,
        }
      }
    );

    fs.unlinkSync(filePath); // delete temp file

    const transcript = response.data.results?.channels[0]?.alternatives[0]?.transcript || "";
    res.json({ transcript });
  } catch (err) {
    console.error("❌ Sumscriptor error:", err.response?.data || err.message || err);
    res.status(500).json({ error: "Failed to transcribe file" });
  }
});

app.post('/split-topics', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const filePath = path.join(__dirname, file.path);
    let rawText = "";

    if (file.mimetype === "application/pdf") {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      rawText = data.text;
    } else if (file.mimetype === "text/plain") {
      rawText = fs.readFileSync(filePath, "utf-8");
    } else {
      return res.status(400).json({ error: "Unsupported file type. Use .txt or .pdf" });
    }

    fs.unlinkSync(filePath); // cleanup

    const prompt = `
Split the following class notes into topic-wise sections with headings and explanations:

${rawText.slice(0, 3000)}
    `;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
      }
    );

    const organizedNotes = response.data[0]?.generated_text || "Could not split notes.";
    res.json({ result: organizedNotes });

  } catch (err) {
    console.error("❌ Topic Split Error:", err.response?.data || err.message || err);
    res.status(500).json({ error: "Topic-wise splitting failed." });
  }
});

app.post('/chat', async (req, res) => {
  const userMessages = req.body.messages || [];

  const toolSystemPrompt = {
    role: "system",
    content: `
You are the Sum-itt AI Assistant. You help users find the right tool from the Sum-itt app.

Tools:
1. 📄 PDF/Text Summarizer – For summarizing uploaded PDFs or text notes.
2. 📊 Expense Tracker – Upload a bank statement CSV to analyze expenses.
3. 🎙️ Sumscriptor – Upload audio/video and get a full transcript.
4. 📚 Topic-wise Notes Splitter – Organize long notes into topic-based sections.

Suggest the best tool based on the user's need in a short, clear way.
`
  };

  const messages = [toolSystemPrompt, ...userMessages];

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("❌ Chat error:", err.response?.data || err.message);
    res.status(500).json({ error: "Groq AI failed to respond." });
  }
});

let notesMemory = ""; // temporarily store uploaded notes

app.post('/upload-notes', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file || file.mimetype !== 'application/pdf') {
    return res.status(400).json({ error: 'Invalid file. Please upload a PDF.' });
  }

  try {
    const filePath = path.join(__dirname, file.path);
    const dataBuffer = fs.readFileSync(filePath);
    const parsed = await pdfParse(dataBuffer);
    fs.unlinkSync(filePath);

    notesMemory = parsed.text;
    res.json({ success: true, message: "Notes uploaded successfully." });
  } catch (err) {
    console.error("❌ PDF Upload Error:", err);
    res.status(500).json({ error: "Failed to process the PDF." });
  }
});
 // this is already set by /upload-notes route

app.post('/chat-with-notes', async (req, res) => {
  const { messages } = req.body;

  if (!notesMemory) {
    return res.status(400).json({ error: "No notes available. Please upload a PDF first." });
  }

  const fullMessages = [
    {
      role: "system",
      content: `
You are an AI assistant that answers only based on the following class notes. 
Do not use any external knowledge. Be clear and helpful.

Notes:
${notesMemory}
      `
    },
    ...messages
  ];

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: fullMessages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("❌ Ask Sum-itt error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to respond to query." });
  }
});

app.post('/get-bullets-from-notes', async (req, res) => {
  if (!notesMemory) {
    return res.status(400).json({ error: "No notes found. Please upload a PDF first." });
  }

  const prompt = `
You are an AI that extracts important bullet-point summaries from lecture notes.

Instructions:
- Organize bullet points by topic
- Be concise and avoid repetition
- Preserve topic order and structure

Notes:
${notesMemory.slice(0, 6000)}
`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          { role: "user", content: prompt }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const bullets = response.data.choices[0].message.content;
    res.json({ bullets });
  } catch (err) {
    console.error("❌ Bullet Summary Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate bullet summary." });
  }
});

app.post("/generate-glossary", async (req, res) => {
  if (!notesMemory) {
    return res.status(400).json({ error: "Please upload a PDF first." });
  }

  const prompt = `
From the following class notes, extract a glossary of important terms and their definitions.
Only include unique and relevant concepts. Format as a list with each term followed by a colon and its meaning.

Notes:
${notesMemory.slice(0, 6000)}
`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          { role: "user", content: prompt }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const glossaryText = response.data.choices[0].message.content;
    res.json({ glossary: glossaryText });
  } catch (err) {
    console.error("❌ Glossary Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate glossary." });
  }
});
