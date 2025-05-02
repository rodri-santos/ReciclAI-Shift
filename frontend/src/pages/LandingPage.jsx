import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao ReciclAI ♻️</h1>
      <p className="text-lg mb-8">Classifica o teu lixo e descobre para onde deve ir.</p>
      <button
        onClick={() => navigate('/classify')}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Começar a Classificar
      </button>
    </div>
  );
};

export default LandingPage;