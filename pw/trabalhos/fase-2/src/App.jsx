import { useEffect, useState } from "react";
import Cabecalho from "./components/Cabecalho";
import ListaProdutos from "./components/ListaProdutos";
import FormularioContato from "./components/FormularioContato";
import Carregando from "./components/Carregando";
import MensagemErro from "./components/MensagemErro";
import Rodape from "./components/Rodape";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    fetch("/produtos.json")
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os produtos.");
        }
        return resposta.json();
      })
      .then(setProdutos)
      .catch((erro) => setErro(erro.message))
      .finally(() => setCarregando(false));
  }, []);

  const produtosFiltrados =
    categoria === ""
      ? produtos
      : produtos.filter((produto) => produto.categoria === categoria);

  return (
    <>
      <Cabecalho />

      <main className="container">
        <h1>Catálogo</h1>

        {carregando && <Carregando />}
        {erro && <MensagemErro mensagem={erro} />}

        {!carregando && !erro && (
          <>
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

            {produtosFiltrados.length === 0 ? (
              <p>Nenhum produto encontrado nessa categoria.</p>
            ) : (
              <ListaProdutos produtos={produtosFiltrados} />
            )}
          </>
        )}

        <h2>Fale com a gente</h2>
        <FormularioContato />
      </main>

      <Rodape />
    </>
  );
}

export default App;
