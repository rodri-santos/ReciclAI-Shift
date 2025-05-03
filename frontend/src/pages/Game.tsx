import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Game.css';
import ecopontoAzul from '/src/assets/ecopontoazul.png';
import ecopontoAmarelo from '/src/assets/ecopontoamarelo.png';
import ecopontoVerde from '/src/assets/ecopontoverde.png';
import lixoOrganico from '/src/assets/lixoorganico.png';

const trashItems = [
  { id: 1, name: 'Jornal 📰', type: 'papel' },
  { id: 2, name: 'Copo Plástico 🥤', type: 'plastico' },
  { id: 3, name: 'Vaso 🏺', type: 'vidro' },
  { id: 4, name: 'Lata 🥫', type: 'plastico' },
  { id: 5, name: 'Caixa 📦', type: 'papel' },
  { id: 6, name: 'Casca 🍎', type: 'organico' },
  { id: 7, name: 'Envelope ✉️', type: 'papel' },
  { id: 8, name: 'Casca 🍌', type: 'organico' },
  { id: 9, name: 'Pacote Leite 🥛', type: 'papel' },
  { id: 10, name: 'Frasco 🧪', type: 'vidro' },
  { id: 11, name: 'Casca 🥚', type: 'organico' },
  { id: 12, name: 'Livro 📚', type: 'papel' },
  { id: 13, name: 'Folha 🥬', type: 'organico' },
  { id: 14, name: 'Garrafa 💧', type: 'plastico' },
  { id: 15, name: 'Copo Vidro 🍷', type: 'vidro' },
  { id: 16, name: 'Papel 📄', type: 'papel' },
  { id: 17, name: 'Casca 🍊', type: 'organico' },
  { id: 18, name: 'Pacote 📦', type: 'papel' },
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
  const [availableItems, setAvailableItems] = useState(trashItems);
  const [displayedItems, setDisplayedItems] = useState(trashItems.slice(0, 6));

  // Inicializa o jogo com 6 itens aleatórios
  useEffect(() => {
    const shuffledItems = [...trashItems].sort(() => Math.random() - 0.5);
    setDisplayedItems(shuffledItems.slice(0, 6));
    setAvailableItems(shuffledItems);
  }, []);

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
    e.dataTransfer.setData('itemId', item.id.toString());
  };

  const handleDrop = (e, bin) => {
    e.preventDefault();
    const trashType = e.dataTransfer.getData('trashType');
    const itemId = parseInt(e.dataTransfer.getData('itemId'));

    if (trashType === bin.accepts) {
      setFeedback('Correto!');
      setScore(score + 1);
      
      // Encontra o índice do item que foi reciclado
      const recycledItemIndex = displayedItems.findIndex(item => item.id === itemId);
      
      if (recycledItemIndex !== -1) {
        // Remove o item reciclado da lista de disponíveis
        const newAvailableItems = availableItems.filter(item => item.id !== itemId);
        
        // Filtra os itens que não estão sendo exibidos atualmente
        const unusedItems = newAvailableItems.filter(
          item => !displayedItems.some(displayed => displayed.id === item.id)
        );
        
        if (unusedItems.length > 0) {
          // Escolhe um novo item aleatório
          const randomIndex = Math.floor(Math.random() * unusedItems.length);
          const newItem = unusedItems[randomIndex];
          
          // Atualiza a lista de itens exibidos, removendo o item reciclado
          const newDisplayedItems = displayedItems.filter(item => item.id !== itemId);
          newDisplayedItems.push(newItem);
          
          setDisplayedItems(newDisplayedItems);
          setAvailableItems(newAvailableItems);
        } else {
          // Se não houver mais itens disponíveis, reinicia o jogo com novos itens aleatórios
          const shuffledItems = [...trashItems].sort(() => Math.random() - 0.5);
          setDisplayedItems(shuffledItems.slice(0, 6));
          setAvailableItems(shuffledItems);
        }
      }
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

      <div className="game-container" style={{ paddingTop: '80px' }}>
        <div className="game-header">
          <h1 className="game-title">♻️ Jogo da Reciclagem</h1>
          <p className="score">Pontuação: <span className="font-semibold">{score}</span></p>
        </div>

        <div className="trash-list">
          {displayedItems.map((item) => (
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
