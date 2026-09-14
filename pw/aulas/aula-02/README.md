# PERÍCIA DE ESTRUTURA

*O que o HTML diz sobre uma página quando ninguém está olhando a tela*

**Programação Web — Aula 2 de 20 · HTML5 Semântico**

## 🎯 MISSÃO

Duas páginas podem ser idênticas na tela e completamente diferentes por dentro. Sua missão é abrir sites reais e descobrir o que a marcação revela — ou esconde — sobre a estrutura do conteúdo.

- Escolha um site com bastante conteúdo (portal de notícias, blog, site institucional).
- Use a aba Elements do DevTools (F12) e, quando indicado, o painel Accessibility.
- Preencha à mão. Onde houver retângulo em branco, desenhe.
- Não existe gabarito: o que vale é a justificativa que você escreve.

**⏱️ Tempo:** 40 minutos     **👥 Formato:** individual, conferindo cada rodada com o colega ao lado

**Nome:** Arthur de Souza Monteiro
**Turma:** pw-2026.2
**Data:** ___/___/2026

---

## RODADA 01 — Div soup × semântico

> Arquivos `pagina-a.html` e `pagina-b.html` (material da disciplina)

Os dois trechos abaixo produzem exatamente a mesma tela. Um deles não diz nada sobre o que é cada parte. Para cada div numerada, escreva o elemento semântico que a substituiria.

```text
PAGINA A                              PAGINA B
<div class="topo">      (1) header    <header>
  <div class="menu">    (2) nav         <nav>
<div class="miolo">     (3) main      <main>
  <div class="post">    (4) article     <article>
  <div class="lateral"> (5) aside       <aside>
<div class="rodape">    (6) footer    <footer>
```

**Sua análise:**

1. As duas páginas renderizam igual. O que exatamente a página B tem que a A não tem?

   Resposta: A diferença é que a versão semântica é autoexplicativa — tanto pra quem lê o código quanto pra máquinas (leitor de tela, motor de busca). `<header>`, `<nav>` etc. já dizem o que são, sem precisar adivinhar pelo nome da classe (que na página A podia ser qualquer coisa).

2. Escolha UMA das div acima e explique como você decidiu qual elemento a substitui.

   Resposta: `<div class="menu">` → `<nav>`. Escolhi porque "menu" ali é um menu de navegação (links pra outras partes do site), e `<nav>` é exatamente o elemento HTML feito pra representar "navegação".

3. Sobrou algum caso em que o div é a escolha certa? Quando?

   Resposta: Sim — o `<div class="conteudo">` que envolve o `<main>` e o `<aside>` continua sendo div mesmo na página semântica. Ele existe só por causa do CSS (`display: flex`), pra organizar o layout lado a lado, sem representar nenhum "tipo" de conteúdo. Div é a escolha certa quando o elemento só serve pra layout/estilo, sem significado próprio.

## RODADA 02 — O mapa da página

> Site real → DevTools → aba Elements → colapsar os nós e olhar só o primeiro nível dentro de `<body>`

Desenhe (ou descreva) onde ficam as grandes regiões da página que você escolheu, anotando o nome do elemento que marca cada uma (ou "div" se não houver elemento semântico):

```text
site investigado: www.globo.com
regiões encontradas (de cima pra baixo): header, section (vários, um por área: previsão do tempo, destaque, vídeos, franja, grade de programação, vitrine globoplay...), footer
```

**Sua análise:**

1. Quantas regiões você conseguiu identificar sem abrir os nós filhos?

   Resposta: 3 elementos de topo (header, section, footer), mas o "miolo" da página é feito de vários `<section>` diferentes empilhados, cada um com uma classe descrevendo a área (ex.: área de previsão do tempo, destaque, vídeos).

2. O site usa elementos semânticos ou div com class? Anote dois nomes de class que você viu.

   Resposta: Usa os dois misturados — elementos semânticos (`header`, `section`, `footer`) só que o conteúdo de cada um é organizado por classes, tipo `hui-container` e `area-previsao-do-tempo`.

3. Existe mais de um `<main>` na página? Deveria existir?

   Resposta: Não existe nenhum `<main>` na página inteira (testei com `document.querySelectorAll('main').length`, deu 0). Deveria existir, sim — pra facilitar o usuário, principalmente quem usa leitor de tela: existe um atalho de teclado pra "pular direto pro conteúdo principal", e esse atalho depende de ter um `<main>` marcado no HTML.

## RODADA 03 — A hierarquia dos títulos

> Ainda no mesmo site: no Console, digitar `$$('h1,h2,h3,h4').map(h => h.tagName + ' ' + h.innerText.slice(0,40))`

Esse comando lista os títulos na ordem em que aparecem no código. Anote os primeiros e procure o problema:

```text
ordem   tag    texto do titulo
-----   ----   ------------------------------------
  1     H1     (vazio)
  2     H1     amanhã, 13/9
  3     H1     seg, 14/9
  4     H1     ter, 15/9
  5     H1     qua, 16/9

total de títulos na página: 147 (via $$('h1,h2,h3,h4'))
```

**Sua análise:**

1. Quantos h1 a página tem? Se tem mais de um, qual seria o problema disso?

   Resposta: Pelo menos 9 h1, todos usados só como nome de dia da semana na previsão do tempo (ex.: "seg, 14/9"). Se a ideia era só deixar o texto grande/destacado, isso é trabalho de CSS, não de h1. O h1 deveria ser o título principal da página (tipo o título de um livro) — ter 9 deles, todos genéricos, atrapalha quem lê só os títulos ou usa leitor de tela, porque não fica claro qual é o assunto principal do site.

2. Algum nível foi pulado (um h2 seguido direto de um h4)? Anote onde.

   Resposta: Não achei nenhum h4 na página inteira (só h1, h2 e h3 apareceram). Mas achei um problema parecido: o h2 "Esporte" (título de uma seção) é seguido de várias notícias que continuam em h2, no mesmo nível — quando deveriam ser h3, um nível abaixo, pra mostrar que estão "dentro" da seção Esporte.

3. Lendo só os títulos, você entende de que a página trata? Se não, o que está faltando?

   Resposta: Não dá pra saber. Só lendo os títulos (dias da semana, depois um monte de manchetes variadas de esporte, política, famosos), não fica claro que é o G1, portal de notícias da Globo. Falta identificar a própria marca/algo característico dela logo no início — um h1 de verdade com o nome/propósito do site.

## RODADA 04 — O alt que ninguém lê (mas alguém ouve)

> No Console: `$$('img').slice(0,3).map(i => i.alt || '(SEM ALT)')`

Um leitor de tela lê o alt em voz alta no lugar da imagem. Anote os três primeiros e classifique cada um:

```text
img 1  alt = (sem atributo alt, mas tem aria-hidden="true" — ícone do menu)
       ( ) descritivo  ( ) inutil  ( ) ausente  (x) vazio proposital

img 2  alt = "logo do usuário"
       ( ) descritivo  (x) inutil  ( ) ausente  ( ) vazio proposital

img 3  alt = (SEM ALT — é a logo do G1)
       ( ) descritivo  ( ) inutil  (x) ausente  ( ) vazio proposital
```

**Sua análise:**

1. Algum alt era só o nome do arquivo ("banner-2024-final.jpg")? Por que isso é inútil?

   Resposta: Não, nenhuma das três era nome de arquivo. Mas seria inútil porque não diz nada sobre o que tem na imagem — quem ouve não entende o conteúdo.

2. Feche os olhos e imagine ouvir a página. O que você perderia com esses alt?

   Resposta: Depende de cada uma. Na imagem 1 (ícone do menu, escondido de propósito) não perderia nada, é só decoração. Na imagem 2 ("logo do usuário") eu saberia que tem algo relacionado a usuário, mas não que é um botão clicável pra ir pra minha conta. Na imagem 3 (sem alt, é a logo do G1) eu não entenderia nada — nem que aquilo é a marca do site.

3. Reescreva o pior dos três de forma que descreva a imagem em menos de 12 palavras.

   Resposta: A pior é a imagem 3 (logo do G1, sem alt nenhum). Reescrevi como: "Logo do G1".

## RODADA 05 — O link fora de contexto

> No Console: `$$('a').slice(0,10).map(a => a.innerText.trim()).filter(t => t)`

Leitores de tela permitem navegar por uma lista só de links, sem o texto ao redor. Anote 3 textos de link e teste se sobrevivem sozinhos:

```text
link 1: "Ir para menu"                    faz sentido sozinho? (x)sim ( )nao
link 2: "Ir para conteúdo principal"      faz sentido sozinho? (x)sim ( )nao
link 3: "Ir para rodapé"                  faz sentido sozinho? (x)sim ( )nao
```

Observação: dos 10 primeiros `<a>` da página, só esses 3 tinham texto visível — os outros são links só com ícone/imagem (como o menu e o usuário que vimos na Rodada 04), sem texto. Esses 3 são "skip links": ficam escondidos visualmente e servem pra quem navega por teclado/leitor de tela pular direto pra uma parte da página.

**Sua análise:**

1. Você encontrou algum "clique aqui", "saiba mais" ou "leia"? Para onde ele levava?

   Resposta: Não encontrei nenhum desses nos 3 primeiros links com texto.

2. Reescreva um desses textos para que ele diga o destino sem depender da frase ao redor.

   Resposta: Não precisou reescrever nenhum — os 3 já são bem descritivos por si só (dizem exatamente pra onde vão, mesmo sem nenhum texto ao redor).

3. Algum link abria em nova aba? Como você descobriu isso olhando o código?

   Resposta: Não. Procurei `target="_blank"` no painel Elements (Ctrl+F) e o resultado foi "0 de 0" — nenhum link da página usa esse atributo.
