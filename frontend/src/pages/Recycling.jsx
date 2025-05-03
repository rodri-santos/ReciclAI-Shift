import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Recycling.css';

const Recycling = () => {
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/recycling/')
      .then(res => res.json())
      .then(data => {
        console.log(data.graph_data);
        setGraphData(data.graph_data);
      })
      .catch(err => {
        console.error("Erro ao buscar os dados do gráfico:", err);
      });
  }, []);

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
          <button onClick={() => navigate('/game')} className="navLink">Jogo</button>
        </div>
      </div>

      {/* Conteúdo abaixo da barra */}
      <div className="pageContent">
        <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg bg-white space-y-4">
          <Plot
            data={graphData.data}
            layout={graphData.layout}
            frames={graphData.frames}
            config={{ responsive: true }}
          />
        </div>

        <div className="ecoTipsContainer">
          <div className="ecoTip blue">
            <p>
              🟦 <strong>Sabias que muitos colocam coisas erradas no ecoponto azul?</strong><br />
              🚫 Não deves colocar:<br /><br />
              Sacos de plástico<br />
              Papel sujo ou engordurado<br />
              Fraldas descartáveis<br />
              Papel vegetal ou autocolante<br /><br />
              ✅ Só deves pôr papel, jornais, revistas, caixas e embalagens de cartão limpas!
            </p>
          </div>
          <div className="ecoTip yellow">
            <p>
              🟨 <strong>Sabias que o ecoponto amarelo é onde se cometem mais erros?</strong><br />
              🚫 Não deves colocar:<br /><br />
              Pilhas e eletrónicos<br />
              Utensílios de cozinha (tachos, panelas)<br />
              Embalagens com restos de comida<br />
              Garrafas de óleo usadas<br /><br />
              ✅ Aqui deves pôr embalagens de plástico, metal e pacotes tipo Tetra Pak – sempre vazios!
            </p>
          </div>
          <div className="ecoTip green">
            <p>
              🟩 <strong>Sabias que nem todo o vidro vai para o ecoponto verde?</strong><br />
              🚫 Não deves colocar:<br /><br />
              Espelhos<br />
              Vidros de janelas<br />
              Loiça, cerâmica ou pirex<br />
              Lâmpadas (exceto as específicas para reciclagem)<br /><br />
              ✅ Deves colocar apenas garrafas, frascos e boiões de vidro – sempre sem tampa!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recycling;
