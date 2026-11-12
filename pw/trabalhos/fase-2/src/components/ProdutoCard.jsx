function ProdutoCard({ produto }) {
  return (
    <article className="produto-card">
      <h3>{produto.nome}</h3>
      <p className="produto-marca">{produto.marca}</p>
      <p className="produto-preco">{produto.preco}</p>
      <p className="produto-compat">Compatível com: {produto.compatibilidade}</p>
    </article>
  );
}

export default ProdutoCard;
