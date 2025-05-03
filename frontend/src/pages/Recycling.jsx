import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';
import '/src/styles/TrashClassifier.css'; // Reutilizamos o estilo existente (ou cria outro CSS, se preferires)

const Recycling = () => {
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/recycling/')
      .then(res => res.json())
      .then(data => {
        console.log(data.graph_data); // Verifica os dados recebidos
        setGraphData(data.graph_data); // Salva os dados para renderizar o gráfico
      })
      .catch(err => {
        console.error("Erro ao buscar os dados do gráfico:", err);
      });
  }, []);

  // Verifica se os dados já foram carregados
  if (!graphData) {
    return <div>Carregando gráfico...</div>;
  }

  return (
    <div>
      {/* Barra de Navegação */}
      <div className="navBar">
        <div className="navLinks">
          <button onClick={() => navigate('/')} className="navLink">Home</button>
          <button onClick={() => navigate('/classify')} className="navLink">Classificador</button>
          <button onClick={() => navigate('/recycling')} className="navLink">Reciclagem</button>
        </div>
      </div>

      <h1 className="text-xl font-bold mt-100 mb-100">Taxa de Reciclagem na Europa</h1>

      <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg bg-white space-y-4">
        {/* Renderizando o gráfico com Plotly.js */}
        <Plot
          data={graphData.data}  // Os dados do gráfico
          layout={graphData.layout}  // Layout do gráfico
          frames={graphData.frames}  // Os frames de animação (anos)
          config={{ responsive: true }}  // Configurações extras, como responsividade
        />
      </div>
    </div>
  );
};

export default Recycling;
