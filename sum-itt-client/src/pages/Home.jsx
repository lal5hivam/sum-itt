import FileUploadCard from "../components/FileUploadCard";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-8">
      <h2 className="text-2xl font-bold">Choose What You Want to Summarize</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        <FileUploadCard
          title="PDF / Text File Summarizer"
          description="Upload PDFs or text files and get summaries instantly."
          onClick={() => alert("Redirect to PDF/text upload")}
        />
        <FileUploadCard
          title="Image Summarizer (OCR)"
          description="Upload handwritten or scanned notes for summarization."
          onClick={() => alert("Redirect to OCR tool")}
        />
        <FileUploadCard
          title="Bank Statement (CSV) Tracker"
          description="Upload your bank statement and get a smart expense breakdown."
          onClick={() => alert("Redirect to CSV expense tool")}
        />
      </div>
    </div>
  );
};

export default Home;
