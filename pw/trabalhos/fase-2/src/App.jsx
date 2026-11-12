import Cabecalho from "./components/Cabecalho";
import ListaProdutos from "./components/ListaProdutos";
import Rodape from "./components/Rodape";
import produtos from "./dados/produtos";

function App() {
  return (
    <>
      <Cabecalho />

      <main className="container">
        <h1>Catálogo</h1>
        <p>Temos {produtos.length} produtos disponíveis na loja.</p>

        <ListaProdutos produtos={produtos} />
      </main>

      <Rodape />
    </>
  );
}

export default App;
