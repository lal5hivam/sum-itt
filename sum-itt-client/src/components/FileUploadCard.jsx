const FileUploadCard = ({ title, description, onClick }) => (
    <div className="border rounded-2xl p-6 shadow-md bg-white hover:shadow-lg transition w-full sm:w-96">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm mb-4 text-gray-600">{description}</p>
      <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Upload
      </button>
    </div>
  );
  
  export default FileUploadCard;
  