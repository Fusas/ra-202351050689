import { useState } from "react";

function FormularioContato() {
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    telefone: "",
    produto: "",
    contato: "",
    mensagem: "",
  });
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  function atualizar(evento) {
    const { name, value } = evento.target;
    setDados({ ...dados, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();

    if (dados.nome === "") {
      setErro("Informe seu nome completo.");
      return;
    }
    if (dados.email === "") {
      setErro("Informe um e-mail para contato.");
      return;
    }

    setErro("");
    setEnviado(true);
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <div className="campo">
        <label htmlFor="nome">Nome completo</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={dados.nome}
          onChange={atualizar}
        />
      </div>

      <div className="campo">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={dados.email}
          onChange={atualizar}
        />
      </div>

      <div className="campo">
        <label htmlFor="telefone">Telefone</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          placeholder="(11) 91234-5678"
          value={dados.telefone}
          onChange={atualizar}
        />
      </div>

      <div className="campo">
        <label htmlFor="produto">Produto de interesse</label>
        <select
          id="produto"
          name="produto"
          value={dados.produto}
          onChange={atualizar}
        >
          <option value="">Selecione uma categoria</option>
          <option value="Teclado">Teclado</option>
          <option value="Mouse">Mouse</option>
          <option value="Headset">Headset</option>
          <option value="Cadeira">Cadeira</option>
          <option value="Mousepad">Mousepad</option>
        </select>
      </div>

      <fieldset className="campo campo--largura-total">
        <legend>Forma de contato preferida</legend>

        <div className="opcao">
          <input
            type="radio"
            id="contato-whatsapp"
            name="contato"
            value="whatsapp"
            checked={dados.contato === "whatsapp"}
            onChange={atualizar}
          />
          <label htmlFor="contato-whatsapp">WhatsApp</label>
        </div>

        <div className="opcao">
          <input
            type="radio"
            id="contato-email"
            name="contato"
            value="email"
            checked={dados.contato === "email"}
            onChange={atualizar}
          />
          <label htmlFor="contato-email">E-mail</label>
        </div>

        <div className="opcao">
          <input
            type="radio"
            id="contato-telefone"
            name="contato"
            value="telefone"
            checked={dados.contato === "telefone"}
            onChange={atualizar}
          />
          <label htmlFor="contato-telefone">Ligação</label>
        </div>
      </fieldset>

      <div className="campo campo--largura-total">
        <label htmlFor="mensagem">Mensagem (opcional)</label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows="4"
          value={dados.mensagem}
          onChange={atualizar}
        ></textarea>
      </div>

      {erro !== "" && <p className="formulario-erro">{erro}</p>}
      {enviado && (
        <p className="formulario-sucesso">
          Pedido enviado! Em breve entramos em contato.
        </p>
      )}

      <button type="submit" className="botao">
        Enviar pedido
      </button>
    </form>
  );
}

export default FormularioContato;
