# Fusas's Store — Vitrine de Acessórios Gamer

- **Aluno:** Arthur de Souza Monteiro
- **Curso/Turma:** pw-2026.2

## Descrição

Fusas's Store é o site de vitrine de uma loja local de acessórios e periféricos gamer (teclados, mouses, headsets, cadeiras, mousepads). O site mostra o catálogo de produtos em cards, permite filtrar por categoria, ver o detalhe de um produto e enviar um pedido de orçamento/contato pelo formulário — tudo isso sem precisar ir até a loja ou chamar no WhatsApp antes.

## Pré-requisitos

Nenhum. É um site estático (HTML + CSS puro), não precisa instalar nada.

## Como rodar

1. Baixe ou clone este repositório.
2. Entre na pasta `pw/trabalhos/projeto-semestral/`.
3. Abra o arquivo `index.html` direto no navegador (duplo clique, ou clique direito → Abrir com → navegador).

## Páginas

| Arquivo | Página |
|---|---|
| `index.html` | Home |
| `catalogo.html` | Catálogo de produtos (com filtro por categoria) |
| `produto.html` | Detalhe de um produto |
| `contato.html` | Formulário de contato/orçamento |

## Tecnologias

- HTML5 semântico (`header`, `nav`, `main`, `article`, `section`, `footer`, `dl`/`dt`/`dd`).
- CSS3 puro, sem framework: custom properties como design tokens, Flexbox (cabeçalho, listas, formulário) e Grid (cards de produto, ficha técnica).
- Mobile-first, com breakpoints em `600px` e `1000px`.
- Sem JavaScript nessa fase (entra mais pra frente na disciplina).

## Acessibilidade e validação

- Lighthouse (categoria Acessibilidade): **100/100** nas 4 páginas.
- Todo campo de formulário tem `<label for="">` associado ao `id` do campo correspondente.
- Foco visível (`:focus-visible`) em links, botões e campos, para navegação por teclado.
- Validador do W3C (https://validator.w3.org/nu/#file): **0 erros e 0 avisos** nas 4 páginas.

## Uso de IA

- **Ferramentas usadas:** Claude (Claude Code).
- **Onde ajudou:** estruturação das pastas e páginas do projeto, sugestões de HTML semântico, organização do CSS com custom properties (design tokens), uso de Flexbox/Grid e das media queries mobile-first, montagem do formulário com validação nativa, e execução do teste de acessibilidade (Lighthouse).
- **O que eu revisei/reescrevi:** defini o tema e os produtos do catálogo, personalizei os textos da loja, testei cada página no navegador antes de cada commit e ajustei o conteúdo pra refletir o que eu queria pro projeto.
