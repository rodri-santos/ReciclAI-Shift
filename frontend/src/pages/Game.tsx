import React, { useState } from 'react';
import '../styles/Game.css'; // Importando o CSS com Tailwind refinado

const trashItems = [
  { id: 1, name: 'Papel 🧻', type: 'papel' },
  { id: 2, name: 'Garrafa de plástico 🧴', type: 'plastico' },
  { id: 3, name: 'Garrafa de vidro 🍾', type: 'vidro' },
  { id: 4, name: 'Lata 🥫', type: 'plastico' },
  { id: 5, name: 'Cartão 📦', type: 'plastico' },
  { id: 6, name: 'Maçã Comida 🍎', type: 'plastico' },
];

const bins = [
  { id: 'azul', label: 'Papel 📘', accepts: 'papel', color: 'bg-blue-400' },
  { id: 'amarelo', label: 'Plástico/Metal 💛', accepts: 'plastico', color: 'bg-yellow-300' },
  { id: 'verde', label: 'Vidro 💚', accepts: 'vidro', color: 'bg-green-400' },
];

const Game = () => {
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

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
    e.preventDefault(); // Necessário para permitir o drop
  };

  return (
    <div className="game-container">
      <h1 className="game-title">♻️ Jogo da Reciclagem</h1>
      <p className="score">Pontuação: <span className="font-semibold">{score}</span></p>

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
            <div className="bin-label">{bin.label}</div>
          </div>
        ))}
      </div>

      {feedback && (
        <div
          className={`feedback ${feedback === 'Correto!' ? 'correct' : 'wrong'}`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default Game;
