import { NavLink } from "react-router";
import { useCarrinho } from "../contexts/CarrinhoContext";

function Cabecalho() {
  const { itens } = useCarrinho();

  return (
    <header className="cabecalho">
      <div className="container cabecalho__conteudo">
        <p className="logo">Fusas's Store</p>
        <nav>
          <NavLink to="/" end>
            Início
          </NavLink>
          <NavLink to="/contato">Contato</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
          <span className="carrinho">🛒 {itens.length}</span>
        </nav>
      </div>
    </header>
  );
}

export default Cabecalho;
