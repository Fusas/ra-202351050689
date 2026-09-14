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

   A página B é autoexplicativa, mais fácil de entender só de olhar o código. `<header>`, `<nav>` etc já dizem o que são, na A é só div com class, tem que adivinhar.

2. Escolha UMA das div acima e explique como você decidiu qual elemento a substitui.

   `<div class="menu">` virou `<nav>`. Escolhi porque menu ali é um menu de navegação (links pra outras páginas), e nav é exatamente isso.

3. Sobrou algum caso em que o div é a escolha certa? Quando?

   Sim, o `<div class="conteudo">` que envolve o main e o aside continua sendo div mesmo na versão semântica. Ele só existe por causa do CSS (display: flex), pra organizar o layout lado a lado, não representa nenhum tipo de conteúdo. Div é a escolha certa quando é só isso, layout/estilo, sem significado próprio.

## RODADA 02 — O mapa da página

> Site real → DevTools → aba Elements → colapsar os nós e olhar só o primeiro nível dentro de `<body>`

Desenhe (ou descreva) onde ficam as grandes regiões da página que você escolheu, anotando o nome do elemento que marca cada uma (ou "div" se não houver elemento semântico):

```text
site investigado: www.globo.com
regiões encontradas (de cima pra baixo): header, section (vários, um por área: previsão do tempo, destaque, vídeos, franja, grade de programação, vitrine globoplay...), footer
```

**Sua análise:**

1. Quantas regiões você conseguiu identificar sem abrir os nós filhos?

   3 no topo (header, section, footer), mas o meio da página é vários section empilhados, um pra cada área (previsão do tempo, destaque, vídeos...).

2. O site usa elementos semânticos ou div com class? Anote dois nomes de class que você viu.

   Usa os dois misturados. Tem header, section, footer, mas o conteúdo de dentro é organizado por classe, tipo hui-container e area-previsao-do-tempo.

3. Existe mais de um `<main>` na página? Deveria existir?

   Não tem nenhum main na página inteira, testei com `document.querySelectorAll('main').length` e deu 0. Deveria ter sim, pra facilitar o usuário, tipo quem usa leitor de tela consegue pular direto pro conteúdo principal.

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

   Pelo menos 9 h1, todos usados só como nome de dia da semana na previsão do tempo. Se era só pra deixar o texto grande era só usar CSS. Não sei explicar direito o que h1 representa, mas atrapalha com certeza — ter 9 títulos "principais" não ajuda ninguém a entender do que o site trata.

2. Algum nível foi pulado (um h2 seguido direto de um h4)? Anote onde.

   Não achei h4 nenhum na página. Mas achei um h2 "Esporte" seguido de várias notícias que também são h2, quando deveria ser h2 pro título da seção e h3 pras notícias de dentro.

3. Lendo só os títulos, você entende de que a página trata? Se não, o que está faltando?

   Não dá pra saber. Só lendo os títulos (dias da semana, depois um monte de manchete de esporte, política, famosos) não dá pra saber que é o G1. Tá faltando identificar a própria marca ou algo característico dela.

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

   Não, nenhuma das três era nome de arquivo. Mas seria inútil porque não quer dizer nada, não fala o que tem na imagem.

2. Feche os olhos e imagine ouvir a página. O que você perderia com esses alt?

   Da imagem 1 não perde nada, é só decoração escondida de propósito. Da imagem 2 (logo do usuário) é só uma imagem genérica de uma pessoinha pra clicar e ir pra parte do usuário, então dava pra entender mais ou menos. Da imagem 3 eu não entenderia nada, nem que aquilo é a logo do G1.

3. Reescreva o pior dos três de forma que descreva a imagem em menos de 12 palavras.

   A pior é a 3, porque não tem nada. Reescrevi como "Logo do G1".

## RODADA 05 — O link fora de contexto

> No Console: `$$('a').slice(0,10).map(a => a.innerText.trim()).filter(t => t)`

Leitores de tela permitem navegar por uma lista só de links, sem o texto ao redor. Anote 3 textos de link e teste se sobrevivem sozinhos:

```text
link 1: "Ir para menu"                    faz sentido sozinho? (x)sim ( )nao
link 2: "Ir para conteúdo principal"      faz sentido sozinho? (x)sim ( )nao
link 3: "Ir para rodapé"                  faz sentido sozinho? (x)sim ( )nao
```

Dos 10 primeiros `<a>` da página, só esses 3 tinham texto visível, os outros são só ícone (tipo o menu e o usuário da rodada 4). Esses 3 são "skip links", ficam escondidos e servem pra quem navega por teclado pular direto pra uma parte da página.

**Sua análise:**

1. Você encontrou algum "clique aqui", "saiba mais" ou "leia"? Para onde ele levava?

   Não encontrei nenhum desses.

2. Reescreva um desses textos para que ele diga o destino sem depender da frase ao redor.

   Não precisei reescrever, os 3 já são bem descritivos sozinhos.

3. Algum link abria em nova aba? Como você descobriu isso olhando o código?

   Não. Procurei `target="_blank"` no Elements (Ctrl+F) e deu 0 de 0.
