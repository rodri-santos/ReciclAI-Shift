import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Game.css';
import ecopontoAzul from '/src/assets/ecopontoazul.png';
import ecopontoAmarelo from '/src/assets/ecopontoamarelo.png';
import ecopontoVerde from '/src/assets/ecopontoverde.png';
import lixoOrganico from '/src/assets/lixoorganico.png';

const trashItems = [
  { id: 1, name: 'Papel 🧻', type: 'papel' },
  { id: 2, name: 'Garrafa Plástico 🧴', type: 'plastico' },
  { id: 3, name: 'Garrafa Vidro 🍾', type: 'vidro' },
  { id: 4, name: 'Lata 🥫', type: 'plastico' },
  { id: 5, name: 'Cartão 📦', type: 'papel' },
  { id: 6, name: 'Maçã Comida 🍎', type: 'organico' },
];

const bins = [
  { id: 'azul', label: 'Papel 💙', accepts: 'papel', color: 'bg-blue-400', image: ecopontoAzul },
  { id: 'amarelo', label: 'Plástico/Metal 💛', accepts: 'plastico', color: 'bg-yellow-300', image: ecopontoAmarelo },
  { id: 'verde', label: 'Vidro 💚', accepts: 'vidro', color: 'bg-green-400', image: ecopontoVerde },
  { id: 'marrom', label: 'Orgânico 🤎', accepts: 'organico', color: 'bg-amber-700', image: lixoOrganico },
];

const facts = [
  "Sabias que apenas 9% de todo o plástico produzido no mundo até hoje foi efetivamente reciclado?",
  "Sabias que o plástico pode demorar até 500 anos a decompor-se?",
  "Sabias que o ecoponto mais usado em Portugal é o amarelo?",
  "Sabias que Lisboa é uma das cidades com menor taxa de reciclagem no país?",
  "Sabias que há mais de 45 mil ecopontos espalhados por Portugal?",
  "Sabias que as garrafas de vidro podem ser recicladas infinitamente sem perder qualidade?",
  "Sabias que reciclar uma lata de alumínio poupa energia suficiente para manter uma TV ligada por 3 horas?",
  "Sabias que a reciclagem ajuda a preservar recursos naturais como madeira, água e minerais?"
];

const Game = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback('');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  useEffect(() => {
    setCurrentFact(Math.floor(score / 2) % facts.length);
  }, [score]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('trashType', item.type);
  };

  const handleDrop = (e, bin) => {
    e.preventDefault();
    const trashType = e.dataTransfer.getData('trashType');

    if (trashType === bin.accepts) {
      setFeedback('Correto!');
      setScore(score + 1);
    } else {
      setFeedback('Errado!');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="navBar">
        <div className="navLinks">
          <button onClick={() => navigate('/')} className="navLink">Home</button>
          <button onClick={() => navigate('/classify')} className="navLink">Classificador</button>
          <button onClick={() => navigate('/recycling')} className="navLink">Reciclagem</button>
          <button onClick={() => navigate('/game')} className="navLink">Jogo</button>
        </div>
      </div>

      <div className="game-container" style={{ paddingTop: '80px' }}> {/* Ajuste o padding-top conforme necessário */}
        <div className="game-header">
          <h1 className="game-title">♻️ Jogo da Reciclagem</h1>
          <p className="score">Pontuação: <span className="font-semibold">{score}</span></p>
        </div>

        <div className="trash-list">
          {trashItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="trash-item"
            >
              {item.name}
            </div>
          ))}
        </div>

        <div className="bins-container">
          {bins.map((bin) => (
            <div
              key={bin.id}
              onDrop={(e) => handleDrop(e, bin)}
              onDragOver={handleDragOver}
              className={`bin ${bin.color}`}
            >
              {bin.image && <img src={bin.image} alt={bin.label} className="bin-image" />}
              <div className="bin-label">{bin.label}</div>
            </div>
          ))}
        </div>

        {feedback && (
          <div
            key={Date.now()}
            className={`feedback ${feedback === 'Correto!' ? 'correct' : 'wrong'}`}
          >
            {feedback}
          </div>
        )}

        <div className="fact-banner">
          <p className="fact-text">{facts[currentFact]}</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
