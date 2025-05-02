import { useNavigate } from 'react-router-dom';
import '/src/styles/LandingPage.css';
import bannerImage from '/src/assets/Logo.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Barra de Navegação sem fundo */}
      <div className="navBar">
        <div className="navLinks">
          <button onClick={() => navigate('/')} className="navLink">Home</button>
          <button onClick={() => navigate('/classify')} className="navLink">Classificador</button>
        </div>
      </div>

      {/* Banner */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${bannerImage})` }}
      ></div>

      {/* Card Central */}
      <div className="cardCentral">
        <h1 className="cardTitle"><span>RecyclAI</span></h1>
        <p className="cardDesc">Descrição do que fazemos</p>
      </div>

      {/* Como Funciona */}
      <div>
        <h2 className="stepsTitle">Como Funciona?</h2>
        <div className="stepsContainer">
          <div className="stepCard">
            <p><strong>Passo 1</strong><br />Descrição</p>
          </div>
          <div className="stepCard">
            <p><strong>Passo 2</strong><br />Descrição</p>
          </div>
          <div className="stepCard">
            <p><strong>Passo 3</strong><br />Descrição</p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('/classify')} className="comecarBtn">
            COMEÇAR
          </button>
        </div>
      </div>

      {/* Sugestões / Contato */}
      <div className="sugestoesPaper">
        <h2 className="sugestoesTitle">Dúvidas ou Sugestões?</h2>
        <input type="text" placeholder="Escreva a sua mensagem" className="sugestoesInput" />
        <button className="sugestoesBtn">ENVIAR</button>
      </div>
    </div>
  );
};

export default LandingPage;
