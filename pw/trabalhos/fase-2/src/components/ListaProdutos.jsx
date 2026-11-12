import ProdutoCard from "./ProdutoCard";

function ListaProdutos({ produtos }) {
  return (
    <div className="grade-produtos">
      {produtos.map((produto) => (
        <ProdutoCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}

export default ListaProdutos;
