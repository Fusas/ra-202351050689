import { useState } from "react";
import Cabecalho from "./components/Cabecalho";
import ListaProdutos from "./components/ListaProdutos";
import FormularioContato from "./components/FormularioContato";
import Rodape from "./components/Rodape";
import produtos from "./dados/produtos";

function App() {
  const [categoria, setCategoria] = useState("");

  const produtosFiltrados =
    categoria === ""
      ? produtos
      : produtos.filter((produto) => produto.categoria === categoria);

  return (
    <>
      <Cabecalho />

      <main className="container">
        <h1>Catálogo</h1>
        <p>Temos {produtosFiltrados.length} produtos disponíveis na loja.</p>

        <div className="campo campo-filtro">
          <label htmlFor="categoria">Filtrar por categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
          >
            <option value="">Todas as categorias</option>
            <option value="Teclado">Teclado</option>
            <option value="Mouse">Mouse</option>
            <option value="Headset">Headset</option>
            <option value="Cadeira">Cadeira</option>
            <option value="Mousepad">Mousepad</option>
          </select>
        </div>

        <ListaProdutos produtos={produtosFiltrados} />

        <h2>Fale com a gente</h2>
        <FormularioContato />
      </main>

      <Rodape />
    </>
  );
}

export default App;
