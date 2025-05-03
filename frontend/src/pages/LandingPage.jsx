import { useNavigate } from 'react-router-dom';
import '/src/styles/LandingPage.css';

import bannerImage from '/src/assets/f1.jpg';
import icon1 from '/src/assets/icon1.png';
import icon2 from '/src/assets/icon2.png';
import icon3 from '/src/assets/icon3.png';

const steps = [
  {
    icon: icon1,
    title: 'Passo 1',
    desc: 'Carrega em “Começar” para dar início ao processo.',
  },
  {
    icon: icon2,
    title: 'Passo 2',
    desc: 'Escolhe uma foto do resíduo e clica em “Classificar” — o resultado será apresentado logo abaixo.',
  },
  {
    icon: icon3,
    title: 'Passo 3',
    desc: 'Queres tentar de novo? Basta escolher outra imagem e clicar novamente no botão.',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Barra de Navegação sem fundo */}
      <div className="navBar">
        <div className="navLinks">
          <button onClick={() => navigate('/')} className="navLink">Home</button>
          <button onClick={() => navigate('/classify')} className="navLink">Classificador</button>
          <button onClick={() => navigate('/recycling')} className="navLink">Reciclagem</button>
          <button onClick={() => navigate('/game')} className="navLink">Jogo</button>
        </div>
      </div>

      {/* Banner */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${bannerImage})` }}
      ></div>

      {/* Card Central */}
      <div className="cardCentral">
        <h1 className="cardTitle">
          <span>ReciclAI</span>
        </h1>
        <p className="cardDesc">A ReciclAI é uma webapp que te diz onde deves reciclar o lixo, a partir de uma simples foto. Rápido, inteligente e amigo do ambiente.</p>
      </div>

      {/* Como Funciona */}
      <section className="howItWorks">
        <h2 className="stepsTitle">Como Funciona?</h2>
        <div className="stepsContainer">
          {steps.map((step, i) => (
            <div className="stepCard" key={i}>
              <img src={step.icon} alt={step.title} className="stepIcon" />
              <strong>{step.title}</strong>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/classify')} className="comecarBtn">
          Começar
        </button>
      </section>

   

      {/* Sugestões / Contato */}
      <div className="sugestoesPaper">
        <h2 className="sugestoesTitle">Dúvidas ou Sugestões?</h2>
        <div className="sugestoesForm">
          <input
            type="text"
            placeholder="Escreva a sua mensagem"
            className="sugestoesInput"
          />
          <button className="sugestoesBtn">Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
