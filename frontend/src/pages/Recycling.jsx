import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Recycling.css';
import imagem from '/src/assets/image.png';

const Recycling = () => {
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/recycling/')
      .then(res => res.json())
      .then(data => {
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
        {/* Container com a frase */}
        <div className="recyclingIntro">
        <img src={imagem} alt="Imagem ilustrativa" className="introImage" />
  <p>
    Embora Portugal tenha registado um aumento contínuo na taxa de reciclagem de resíduos municipais ao longo dos anos, o país continua a apresentar níveis significativamente inferiores aos de muitos dos seus congéneres europeus.
    <p> Nesta página podes podes ver a evolução da Taxa de Reciclagem de Resíduos Municipais na Europa e algumas dicas sobre os ecopontos.
    </p>
  </p>
</div>

        {/* Gráfico */}
        <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg bg-white space-y-4">
          <Plot
            data={graphData.data}
            layout={graphData.layout}
            frames={graphData.frames}
            config={{ responsive: true }}
          />
        </div>

        {/* Eco Dicas */}
        <div className="ecoTipsContainer">
          <div className="ecoTipsGroup">
            <div className="ecoTip blue">
              <strong>Sabias que muitos colocam coisas erradas no ecoponto azul?</strong>
              <p>
                <span className="ecoSubTitle">Não deves colocar:</span>
                <ul>
                  <li>Sacos de plástico</li>
                  <li>Papel sujo ou engordurado</li>
                  <li>Fraldas descartáveis</li>
                  <li>Papel vegetal ou autocolante</li>
                </ul>
                <span className="ecoSubTitle">Deves colocar:</span>
                Só papel, jornais, revistas, caixas e embalagens de cartão limpas!
              </p>
            </div>

            <div className="ecoTip yellow">
              <strong>Sabias que o ecoponto amarelo é onde se cometem mais erros?</strong>
              <p>
                <span className="ecoSubTitle">Não deves colocar:</span>
                <ul>
                  <li>Pilhas e eletrónicos</li>
                  <li>Utensílios de cozinha (tachos, panelas)</li>
                  <li>Embalagens com restos de comida</li>
                  <li>Garrafas de óleo usadas</li>
                </ul>
                <span className="ecoSubTitle">Deves colocar:</span>
                Embalagens de plástico, metal e pacotes tipo Tetra Pak – sempre vazios!
              </p>
            </div>

            <div className="ecoTip green">
              <strong>Sabias que nem todo o tipo vidro deve ir para o ecoponto verde?</strong>
              <p>
                <span className="ecoSubTitle">Não deves colocar:</span>
                <ul>
                  <li>Espelhos</li>
                  <li>Vidros de janelas</li>
                  <li>Loiça, cerâmica ou pirex</li>
                  <li>Lâmpadas (não específicas reciclagem)</li>
                </ul>
                <span className="ecoSubTitle">Deves colocar:</span>
                Apenas garrafas, frascos e boiões de vidro – sempre sem tampa!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recycling;
