# Proposta de Projeto — Programação Web 2026.2

- **Aluno:** Arthur de Souza Monteiro · **Curso/Turma:** pw-2026.2
- **Repositório:** https://github.com/Fusas/ra-202351050689

## 1. Tema e problema

Fusas's Store é uma vitrine online para uma loja local de acessórios e periféricos gamer (teclados, mouses, headsets, cadeiras, mousepads). Hoje esse tipo de loja pequena normalmente só vende presencialmente ou por WhatsApp, sem um catálogo organizado. O site resolve isso mostrando os produtos disponíveis, com preços e características, e permitindo que o cliente entre em contato para comprar ou pedir um orçamento.

## 2. Público-alvo

Jogadores e consumidores de tecnologia da região que quiserem ver o catálogo da loja antes de ir até ela ou de chamar no WhatsApp, e o próprio dono da loja, que precisa de uma vitrine simples para divulgar os produtos.

## 3. Coleção de itens

Catálogo de produtos gamer. Cada item tem pelo menos 4 atributos: **nome**, **categoria** (teclado, mouse, headset, cadeira, mousepad), **marca**, **preço** e **compatibilidade** (PC, console ou ambos). Serão cadastrados pelo menos 8 produtos.

Exemplo de item preenchido:

- **Nome:** Teclado Mecânico RGB Vortex X1
- **Categoria:** Teclado
- **Marca:** VortexTech
- **Preço:** R$ 349,90
- **Compatibilidade:** PC

## 4. Telas previstas

1. **Home** — apresentação da loja e destaques do catálogo.
2. **Catálogo** — listagem de todos os produtos em cards, com filtro por categoria.
3. **Detalhe do produto** — informações completas de um item da coleção.
4. **Contato** — formulário para pedido de orçamento/compra.

## 5. Formulário

Formulário de contato/orçamento, na página Contato, com os campos:

1. Nome completo (obrigatório)
2. E-mail (obrigatório, validado como e-mail)
3. Telefone (obrigatório, com padrão de formato)
4. Produto de interesse (obrigatório, lista das categorias)
5. Forma de contato preferida (WhatsApp, e-mail ou telefone)
6. Mensagem/observações (opcional)

## 6. Filtro/busca

Filtro por categoria de produto (teclado, mouse, headset, cadeira, mousepad) na página de Catálogo.

## 7. Origem dos dados na Fase 2

Mock local: arquivo JSON estático (`produtos.json`) com os dados do catálogo, consumido futuramente via `fetch` + `useEffect` na Fase 2.

## 8. Diferencial pretendido

Carrinho de compras simulado (guardado no navegador), permitindo "adicionar ao carrinho" os produtos do catálogo — funcionalidade a ser implementada quando JavaScript entrar na disciplina.
