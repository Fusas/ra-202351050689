function MensagemErro({ mensagem }) {
  return (
    <div className="erro">
      <p>{mensagem}</p>
      <button type="button" onClick={() => window.location.reload()}>
        Tentar de novo
      </button>
    </div>
  );
}

export default MensagemErro;
