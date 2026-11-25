# Fusas's Store — Fase 2 (React)

- **Aluno:** Arthur de Souza Monteiro
- **Curso/Turma:** pw-2026.2
- **Aplicação publicada:** https://fusas.github.io/ra-202351050689/

## Descrição

Versão em React da vitrine de acessórios e periféricos gamer da Fase 1 (`pw/trabalhos/projeto-semestral`). Catálogo com filtro por categoria, página de detalhe por produto, carrinho simulado (Context) e formulário de contato controlado.

## Pré-requisitos

Node.js 22+ e npm.

## Como rodar

```bash
cd pw/trabalhos/fase-2
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Páginas / rotas

| Rota | Página |
|---|---|
| `/` | Início — catálogo com filtro por categoria |
| `/produtos/:id` | Detalhe de um produto |
| `/contato` | Formulário de contato/orçamento |
| `/sobre` | Sobre o projeto |
| qualquer outra | Página 404 |

## Tecnologias

- Vite + React 19
- React Router (rotas e navegação)
- `useState` (filtro, formulário controlado, carrinho) e `useEffect` + `fetch` (dados do catálogo, com carregando/erro/vazio/sucesso)
- CSS próprio trazido da Fase 1 (custom properties, Flexbox, Grid, mobile-first)

## Deploy

Publicado via GitHub Pages, a partir da branch `gh-pages` (build gerado com `npm run build`, com `base: '/ra-202351050689/'` no `vite.config.js` e `404.html` igual ao `index.html`, pro React Router funcionar em rotas acessadas direto/recarregadas).

## Context

Criamos um `CarrinhoContext` (`src/contexts/CarrinhoContext.jsx`) pra guardar os itens adicionados ao carrinho.

**Por que Context e não só props?** O botão "Adicionar ao carrinho" fica dentro de `ProdutoCard`, que está dentro de `Inicio` e de `Detalhe` (páginas diferentes); o contador do carrinho fica no `Cabecalho`, que está fora das duas. Sem Context, o carrinho teria que ser criado lá em cima (no `App`) e passado por props através de `Layout` e de cada página só pra chegar no `Cabecalho` e no `ProdutoCard` — componentes que, no meio do caminho, nem usam esse dado. Com Context, os dois componentes que realmente precisam do carrinho (`Cabecalho`, pro contador, e `ProdutoCard`/`Detalhe`, pro botão) leem direto com o hook `useCarrinho()`, sem ninguém no meio repassando o valor.

## Acessibilidade e responsividade

Visual, tokens de cor/espaçamento, Flexbox/Grid e breakpoints mobile-first trazidos da Fase 1 (onde o Lighthouse marcou 100/100 em Acessibilidade nas 4 páginas), incluindo foco visível (`:focus-visible`) em links, botões e campos.

## Uso de IA

- **Ferramentas usadas:** Claude (Claude Code).
- **Onde ajudou:** scaffold do projeto Vite+React, componentização, estrutura das rotas com React Router, o Context do carrinho, e o fetch com os 4 estados (carregando/erro/vazio/sucesso).
- **O que eu revisei/reescrevi:** critério de filtro e textos do catálogo (mantidos da Fase 1), validações do formulário, e testei cada tela no navegador (inclusive simulando erro/vazio) antes de cada commit.
