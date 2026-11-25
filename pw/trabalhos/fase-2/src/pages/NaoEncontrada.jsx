import { Link } from "react-router";

function NaoEncontrada() {
  return (
    <main className="container">
      <h1>Página não encontrada</h1>
      <p>O endereço que você tentou acessar não existe.</p>
      <Link to="/">Voltar para o início</Link>
    </main>
  );
}

export default NaoEncontrada;
