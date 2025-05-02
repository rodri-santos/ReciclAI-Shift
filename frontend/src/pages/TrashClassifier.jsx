import React, { useState } from 'react';
import axios from 'axios';

const TrashClassifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/classify/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Erro ao classificar imagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg bg-white space-y-4">
      <h1 className="text-xl font-bold">Classificador de Lixo</h1>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded-md" />}

      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        disabled={loading}
      >
        {loading ? 'A classificar...' : 'Classificar'}
      </button>

      {result && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Resultados:</h2>
          <ul className="list-disc ml-5">
            {Object.entries(result).map(([label, prob]) => (
              <li key={label}>
                {label}: <strong>{(prob * 100).toFixed(1)}%</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrashClassifier;
