import Saudacao from "./components/Saudacao";
import CartaoPerfil from "./components/CartaoPerfil";

function App() {
  return (
    <>
      <h1 className="titulo">Meu primeiro React</h1>
      <Saudacao nome="Ana" />
      <Saudacao nome="Bruno" />
      <Saudacao nome="Carla" />

      <CartaoPerfil nome="Ana" curso="ADS" emoji="🎸" />
      <CartaoPerfil nome="Bruno" curso="SI" emoji="⚽" />
      <CartaoPerfil nome="Carla" curso="CC" emoji="🎮" />
    </>
  );
}

export default App;
