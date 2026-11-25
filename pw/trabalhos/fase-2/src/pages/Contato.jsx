import FormularioContato from "../components/FormularioContato";

function Contato() {
  return (
    <main className="container">
      <h1>Contato</h1>
      <p>
        Viu um produto que gostou? Preenche o formulário abaixo que a gente
        entra em contato pra fechar o pedido ou tirar dúvidas.
      </p>
      <FormularioContato />
    </main>
  );
}

export default Contato;
