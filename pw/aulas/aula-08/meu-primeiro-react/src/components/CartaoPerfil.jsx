function CartaoPerfil(props) {
  return (
    <div className="cartao">
      <span>{props.emoji}</span>
      <h2>{props.nome}</h2>
      <p>Curso: {props.curso}</p>
    </div>
  );
}

export default CartaoPerfil;
