# Guia de Estudo — Fusas's Store

Esse guia explica, com nossas próprias palavras e usando o código real do projeto, tudo que já usamos até agora. A ideia é: sempre que você não lembrar por que uma linha do código existe, procura aqui.

Organizei em 3 partes: **HTML**, **CSS** e **JS** (que ainda não usamos, mas vou explicar por quê).

---

## PARTE 1 — HTML

HTML é o **conteúdo e a estrutura** da página (lembra da Aula 01: "o conteúdo mora no HTML"). Cada tag diz **o que é** aquele pedaço da página.

### 1.1 O esqueleto de toda página HTML

Todo arquivo `.html` do nosso projeto começa igual. Olha o topo do `index.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fusas's Store — Acessórios Gamer</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  ...
</body>
</html>
```

O que cada linha faz:

- `<!DOCTYPE html>` — avisa pro navegador "isso aqui é HTML5". Sempre a primeira linha.
- `<html lang="pt-BR">` — a tag que envolve a página inteira. `lang="pt-BR"` diz que o conteúdo tá em português do Brasil (ajuda leitor de tela a escolher a pronúncia certa, e ajuda o Google a saber o idioma).
- `<head>` — a "parte de trás" da página: coisas que o navegador precisa saber, mas que não aparecem na tela (metadados, título da aba, link do CSS).
  - `<meta charset="UTF-8">` — diz qual codificação de caracteres usar (pra acentos e ç aparecerem certo).
  - `<meta name="viewport" ...>` — essa é a linha que faz o site se comportar direito no celular (lembra da Aula 05, Rodada 01, "a linha que falta"? é exatamente essa).
  - `<title>` — o texto que aparece na aba do navegador.
  - `<link rel="stylesheet" href="css/styles.css">` — conecta o arquivo de CSS na página (por isso o CSS "sabe" estilizar esse HTML).
- `<body>` — a "parte da frente": tudo que aparece na tela vai aqui dentro.

### 1.2 Tags semânticas (Aula 02)

Na Aula 02 vimos a diferença entre "div soup" (tudo em `<div>`) e HTML semântico (tags que dizem o que são). No nosso projeto usamos só semântico. Olha o `index.html`:

```html
<header class="cabecalho">
  ...
</header>

<main>
  <section class="hero container">...</section>
  <section class="destaques container">...</section>
</main>

<footer class="rodape">
  ...
</footer>
```

- `<header>` — cabeçalho da página (logo + menu).
- `<nav>` — dentro do header, o menu de navegação (Início/Catálogo/Contato).
- `<main>` — o conteúdo principal da página. Lembra que na Rodada 02 da Aula 02 a globo.com **não tinha nenhum `<main>`**? A gente já corrige isso desde o início.
- `<section>` — agrupa um bloco de conteúdo relacionado (a seção "hero" é diferente da seção "destaques").
- `<footer>` — rodapé.

No `catalogo.html` também usamos `<article>`, pra cada produto:

```html
<article class="produto-card">
  <h3>Teclado Mecânico RGB Vortex X1</h3>
  <p class="produto-marca">VortexTech</p>
  <p class="produto-preco">R$ 349,90</p>
  <p class="produto-compat">Compatível com: PC</p>
</article>
```

`<article>` é pra um conteúdo que "se basta sozinho" — faz sentido tirar esse card e colar em outro lugar, ele continua fazendo sentido. Por isso cada produto é um `<article>` (é igual ao `<article>` que vimos no exemplo do professor, "pagina-b.html", pra cada post do blog).

### 1.3 Quando é div mesmo (e não teve tag semântica melhor)

Lembra da Rodada 01 da Aula 02: div é a escolha certa quando o elemento só existe por causa do CSS, sem representar um "tipo" de conteúdo. No catálogo, usamos isso aqui:

```html
<div class="grade-produtos">
  <article class="produto-card">...</article>
  <article class="produto-card">...</article>
</div>
```

O `<div class="grade-produtos">` não é "um tipo de conteúdo" — ele só existe pra agrupar os cards e aplicar o Grid do CSS neles (igual o `<div class="conteudo">` do exemplo do professor, que agrupava `<main>` e `<aside>` com Flexbox).

### 1.4 Atributos importantes que já usamos

- `class="..."` — dá um "apelido" ao elemento pra estilizar com CSS (pode repetir em vários elementos).
- `id="..."` — identifica um elemento **único** na página (não pode repetir). Usamos pra âncoras, tipo `id="teclados"` no catálogo, que o link `href="#teclados"` pula direto pra lá.
- `href="..."` — o destino de um link (`<a>`).
- `aria-current="page"` — avisa (inclusive pra leitor de tela) que aquele link é da página em que você já está. É por isso que no `index.html` o link "Início" tem esse atributo, e nos outros não.
- `aria-label="..."` — dá um nome pra leitor de tela quando não tem texto visível suficiente. Usamos em `<nav class="filtro" aria-label="Filtrar por categoria">`.

### 1.5 Formulários (Aula 03 — vamos aplicar no Contato)

Na Aula 03 investigamos formulários reais (CPF do gov.br, senha) e achamos vários problemas. Quando formos criar a página Contato, vamos aplicar o que aprendemos:

```html
<!-- ERRADO (o que vimos nos formulários investigados) -->
<input type="tel" placeholder="Digite seu CPF">

<!-- CERTO (o que vamos fazer no nosso formulário) -->
<label for="nome">Nome completo</label>
<input type="text" id="nome" name="nome" required>
```

Por quê:
- `<label for="nome">` ligado ao `id="nome"` do input — assim clicar no texto foca o campo, e o leitor de tela consegue falar o nome do campo (isso é exatamente o que faltava no gov.br, Aula 03 Rodada 02).
- `type="text"` (ou `email`, `tel`, `date`...) — o navegador muda o teclado do celular sozinho, sem JS.
- `required` — validação nativa do navegador. Mas lembra da Rodada 05: dá pra burlar em 3 segundos no DevTools! Então isso ajuda o usuário, não protege o sistema — o servidor tem que validar de novo.

---

## PARTE 2 — CSS

CSS é a **aparência** da página (a "pele", como você mesmo descreveu na Aula 01).

### 2.1 Como o CSS "acha" o que estilizar: seletores

No nosso `css/styles.css`, cada regra começa com um **seletor** — que diz *quais* elementos aquela regra afeta:

```css
* { box-sizing: border-box; margin: 0; padding: 0; }   /* TODO elemento */

body { ... }                          /* a tag <body> */

.container { ... }                    /* qualquer elemento com class="container" */

.cabecalho nav a { ... }              /* um <a> dentro de um <nav> dentro de algo com class="cabecalho" */

.cabecalho nav a[aria-current="page"] { ... }   /* só o <a> que tem esse atributo específico */
```

Quanto mais "específico" o seletor (mistura de tag + classe + atributo), maior a força dele na hora de decidir qual regra vale — isso é a **especificidade** que a Aula 04 explica de verdade (com a conta id/classe/elemento que ainda vamos fazer).

### 2.2 Box model e `box-sizing: border-box` (Aula 04)

Primeira regra do nosso CSS:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

Todo elemento HTML é uma caixa com 4 camadas (de dentro pra fora): **conteúdo → padding → border → margin**. Por padrão, quando você declara `width: 200px`, o navegador soma o padding e a borda **por fora** disso, então a caixa fica maior que 200px de verdade.

`box-sizing: border-box` muda essa regra: o `width` passa a **incluir** padding e borda dentro dele. É basicamente o padrão que todo projeto CSS usa, porque é bem mais previsível.

O `margin: 0; padding: 0;` no `*` zera o espaçamento padrão que cada navegador aplica sozinho em tags como `<h1>`, `<p>`, `<ul>` — assim a gente controla o espaçamento a dedo, sem surpresa.

### 2.3 Variáveis CSS / Custom properties (design tokens)

No topo do nosso CSS:

```css
:root {
  --cor-fundo: #0f1117;
  --cor-primaria: #7c3aed;
  --espaco-medio: 1rem;
  --raio-borda: 8px;
}
```

`:root` é "a raiz da página" (praticamente o `<html>`). Declarar uma variável ali faz ela valer pra página inteira. Usamos assim, em qualquer lugar do CSS:

```css
.botao {
  background: var(--cor-primaria);
  padding: var(--espaco-pequeno) var(--espaco-grande);
  border-radius: var(--raio-borda);
}
```

A vantagem: se eu quiser mudar a cor principal do site inteiro, mudo em **um lugar só** (`--cor-primaria`) e todas as páginas mudam junto. Sem isso, teria que caçar e trocar a cor em cada regra separada.

### 2.4 Flexbox (usado no cabeçalho, destaques e filtro)

Flexbox organiza elementos **numa direção só** (linha ou coluna), e é ótimo pra distribuir espaço entre eles. No cabeçalho:

```css
.cabecalho__conteudo {
  display: flex;
  justify-content: space-between;  /* empurra os filhos pras pontas */
  align-items: center;             /* centraliza verticalmente */
  flex-wrap: wrap;                 /* quebra linha se não couber */
  gap: var(--espaco-medio);        /* espaço entre os filhos */
}
```

```html
<div class="container cabecalho__conteudo">
  <p class="logo">Fusas's Store</p>
  <nav>...</nav>
</div>
```

O `<p class="logo">` e o `<nav>` são os dois "filhos diretos" desse container. Com `display: flex` + `justify-content: space-between`, eles ficam um em cada ponta, com o espaço vazio entre os dois — é exatamente pra isso que o Flexbox existe.

Usamos de novo nos cards de "Por que comprar" (`.destaques__lista`) e nos links de filtro do catálogo (`.filtro`) — em ambos os casos, é uma fileira de coisas que quebra linha sozinha em tela pequena.

### 2.5 Grid (usado na grade de produtos)

Grid organiza em **linhas E colunas ao mesmo tempo** — diferente do Flexbox, que só pensa numa direção. Usamos nos cards de produto:

```css
.grade-produtos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--espaco-medio);
}
```

Traduzindo `repeat(auto-fill, minmax(220px, 1fr))`: "repete colunas automaticamente (`auto-fill`), cada uma com no mínimo 220px e no máximo 1 fração igual do espaço (`1fr`)". Ou seja, o navegador calcula sozinho quantos cards cabem lado a lado, e todos ficam do mesmo tamanho — sem eu precisar dizer "3 colunas" ou "4 colunas" na mão.

**Por que Flexbox no cabeçalho e Grid nos produtos?** Regra prática: quando é só uma fileira (uma direção), Flexbox. Quando é uma grade de itens parecidos que precisa se ajustar em várias colunas, Grid.

### 2.6 Foco visível (acessibilidade, prepara pra Aula 05)

```css
a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 3px solid var(--cor-destaque);
  outline-offset: 2px;
}
```

Lembra da Rodada 03 da Aula 05 (teste do teclado): navegar só com Tab precisa mostrar **onde** o foco está. Esse CSS garante que qualquer link, botão ou campo de formulário ganhe um contorno visível quando você navega até ele pelo teclado.

### 2.7 O que ainda vem por aí (Aula 05 — Responsividade)

Ainda não fizemos: **media queries** (regras de CSS que só valem numa certa largura de tela) e testar em vários tamanhos (mobile-first). Isso é o próximo passo grande do projeto, quando formos ajustar pra celular de verdade.

---

## PARTE 3 — JavaScript

Ainda **não usamos nenhuma linha de JavaScript** no projeto, e isso é de propósito: essa disciplina ensina JS mais pra frente (calendário do professor: "09/10 – 23/10 · JavaScript aplicado ao site da Fase 1"). A Fase 1 inteira (esse site) é só HTML + CSS.

Onde o JS vai entrar, quando chegar a hora:
- O "carrinho de compras" (nosso diferencial, que já registramos na proposta) — guardar produtos escolhidos.
- Interações que HTML/CSS sozinhos não conseguem fazer de verdade, tipo filtrar produto sem recarregar a página.

Por enquanto, tudo que "parece interativo" no site (os links de filtro do catálogo, por exemplo) é feito só com HTML (âncoras `#id`) e CSS — sem JavaScript nenhum.

---

## Glossário rápido

| Termo | O que é |
|---|---|
| Tag / elemento | Uma peça de HTML, tipo `<header>`, `<p>`, `<input>` |
| Atributo | Uma informação extra dentro da tag, tipo `class="..."` ou `href="..."` |
| Seletor (CSS) | O que decide *quais* elementos uma regra CSS afeta |
| `:root` | Seletor especial que representa a página inteira, usado pra declarar variáveis CSS |
| Custom property / variável CSS | Um valor reutilizável, tipo `--cor-primaria`, usado com `var(--cor-primaria)` |
| Box model | As 4 camadas de todo elemento: conteúdo, padding, border, margin |
| Flexbox | Layout numa direção só (linha ou coluna) |
| Grid | Layout em linhas E colunas ao mesmo tempo |
| Semântico | Tag que diz o que o conteúdo *é* (`<nav>`, `<article>`) em vez de só `<div>` |
| `label`/`for`/`id` | O jeito certo de ligar um rótulo a um campo de formulário |
| Acessibilidade | Fazer o site funcionar bem pra quem usa teclado, leitor de tela, etc. |
