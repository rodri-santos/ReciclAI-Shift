import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '/src/styles/TrashClassifier.css';

import LogoBar from '/src/assets/LongImage.png';

const TrashClassifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const response = await axios.post(
        'http://localhost:8000/classify/',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setResult(response.data);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Erro ao classificar imagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Barra de Navegação */}
      <div className="navBar">
        <div className="navLinks">
          <button onClick={() => navigate('/')} className="navLink">Home</button>
          <button onClick={() => navigate('/classify')} className="navLink">Classificador</button>
          <button onClick={() => navigate('/recycling')} className="navLink">Reciclagem</button>
          <button onClick={() => navigate('/game')} className="navLink">Jogo</button>
        </div>
      </div>

      {/* Banner */}
      <div className="bannerBar">
        <div
          className="bannerInner"
          style={{ backgroundImage: `url(${LogoBar})` }}
        >
          <h1 className="bannerTitle">RecicIAI</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg bg-white space-y-4">
        <div className="uploadPaper">
          <div className="container">
            <div className="folder">
              <div className="front-side">
                <div className="tip"></div>
                <div className="cover"></div>
              </div>
              <div className="back-side cover"></div>
            </div>
            <label className="custom-file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              Escolher
            </label>
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="previewImg"
            />
          )}
          <button
            onClick={handleUpload}
            className="updateBtn"
            disabled={loading}
          >
            {loading ? 'A classificar...' : 'Classificar'}
          </button>
        </div>

        {result && (
          <div className="resultPaper">
            <div className="resultTitle">Classe mais provável:</div>
            <p className="resultText">{result.classe_mais_provavel}</p>

            <div className="resultTitle">Contentor adequado:</div>
            <p className="resultText">{result.contentor}</p>

            <div className="resultTitle">Probabilidades completas:</div>
            <ul>
              {Object.entries(result.classificacao)
                .sort((a, b) => b[1] - a[1])
                .map(([label, prob]) => (
                  <li key={label}>
                    {label}: <strong>{(prob * 100).toFixed(1)}%</strong>
                  </li>
                ))
              }
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashClassifier;
