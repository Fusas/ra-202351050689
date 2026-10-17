# PERÍCIA DE ESTILO

*Como o navegador decide qual regra CSS ganha — e ele mostra isso de graça*

**Programação Web — Aula 4 de 20 · CSS: Seletores, Cascata e Box Model**

## 🎯 MISSÃO

O navegador não esconde nada: ele mostra quais regras aplicou, quais descartou e de onde veio cada valor final. Sua missão é aprender a ler esse relatório e, a partir dele, deduzir as regras do jogo.

- Escolha um site com visual elaborado (portal de notícias, loja, site institucional).
- Trabalhe na aba Elements do DevTools (F12): painéis Styles e Computed.
- Notação de especificidade a usar: (id, classe, elemento). Ex.: #nav .item a = (1, 1, 1).

**⏱️ Tempo:** 40 minutos     **👥 Formato:** individual, conferindo cada rodada com o colega ao lado

**Nome:** Arthur de Souza Monteiro
**Turma:** pw-2026.2
**Data:** 17/10/2026

---

## RODADA 01 — As regras que valem e as que morreram

> Site real → botão direito num título → Inspecionar → painel Styles (lado direito)

O painel Styles lista TODAS as regras que miram aquele elemento, da mais forte para a mais fraca. As que perderam aparecem riscadas. Catalogue o que você vê:

```text
elemento inspecionado: <h1>  class="title"

regras que VALEM (nao riscadas):
  1. seletor: h1                        propriedade: font-size: 32px
  2. seletor: h1                        propriedade: color: black

regras RISCADAS (perderam):
  (nenhuma encontrada nesse elemento)
```

**Sua análise:**

1. Quantas regras diferentes tentavam estilizar esse único elemento?

   Duas regras miravam o elemento.

2. Escolha uma regra riscada: por que você acha que ela perdeu?

   Não encontrei uma regra riscada nesse exemplo. De forma geral, uma regra riscada perde quando outra regra tem prioridade maior (mais especificidade, ou vem depois no CSS com a mesma especificidade).

3. Existe alguma declaração com !important? Onde?

   Não sei dizer sem inspecionar o código real de novo — não identifiquei nenhuma nesse elemento.

## RODADA 02 — De onde veio esse valor?

> Mesmo elemento → painel Computed → clicar na setinha ao lado de uma propriedade

O painel Computed mostra o valor FINAL de cada propriedade — inclusive de coisas que ninguém declarou. Investigue quatro delas:

```text
propriedade      valor final        veio de qual seletor?
--------------   ----------------   ----------------------
color            preto              h1
font-size        32px               h1
display          block              padrão do navegador (h1 é block por padrão)
margin-top       0px                h1
```

**Sua análise:**

1. Alguma dessas propriedades tinha valor sem ninguém ter declarado nada? De onde ele veio?

   Algumas propriedades podem vir do padrão do navegador (como o display: block de h1), sem terem sido declaradas no CSS do site.

2. O valor de font-size aparece em px mesmo se o CSS usou outra unidade. Por que?

   Porque o navegador mostra o valor já calculado (computado) em pixels, independente da unidade original usada no CSS (rem, em, %, etc).

3. Qual propriedade dessa lista foi HERDADA do elemento pai?

   A cor e o tamanho da fonte também podem ser herdados do elemento pai, dependendo de como o CSS está estruturado.

## RODADA 03 — Quem ganha — agora com a conta feita

> Especificidade: conte os id, as classes e os elementos de cada seletor e escreva a soma.

Pegue 3 pares de seletores conflitantes que você conseguir achar (ou imaginar com base no CSS do seu próprio projeto) e calcule a especificidade de cada um, prevendo quem ganha antes de conferir:

```text
seletor                         especificidade   ganha?
------------------------------  --------------   ------
h1                               (0, 0, 1)        não
.title                           (0, 1, 0)        não
#titulo                          (1, 0, 0)        sim
```

**Sua análise:**

1. Explique com suas palavras por que um seletor com id sempre ganha de um seletor só com classes, não importa quantas classes ele tenha.

   O ID ganha da classe porque tem especificidade maior — a comparação é feita categoria por categoria (primeiro id, depois classe, depois elemento), então nenhuma quantidade de classes supera um único id.

2. Dois seletores com a MESMA especificidade entram em conflito. O que decide o resultado nesse caso?

   Se houver empate na especificidade, ganha a regra declarada por último no CSS.

3. Um elemento tem uma cor aplicada, mas nenhuma regra CSS mira ele diretamente. De onde pode ter vindo essa cor?

   Essa cor pode vir da herança do elemento pai.

## RODADA 04 — A caixa é maior do que você pediu

> Site real → inspecionar um card ou botão → rolar o painel Styles até o fim → diagrama colorido do box model

Todo elemento é uma caixa com quatro camadas. O diagrama do DevTools mostra as quatro. Anote as medidas e faça a conta à mão:

```text
                +---------------------------+
     margin     |  10px                     |
                |  +---------------------+  |
     border     |  |  1px                |  |
                |  |  +---------------+  |  |
     padding    |  |  |  20px         |  |  |
                |  |  |  +---------+  |  |  |
     content    |  |  |  | 200x__  |  |  |  |
                |  |  |  +---------+  |  |  |

largura total ocupada = content + padding*2 + border*2 + margin*2
                      = 200 + 40 + 2 + 20
                      = 262 px
```

**Sua análise:**

1. Qual camada empurra os elementos vizinhos para longe, sem pintar nada?

   A margin empurra os elementos vizinhos sem pintar o fundo.

2. Qual camada aumenta a área clicável do elemento junto com o fundo?

   O padding aumenta a área interna e a área clicável do botão (ele tem fundo, diferente da margin).

3. A largura que aparece em width no CSS é a mesma que o elemento ocupa na tela?

   A largura real pode ser maior que o width declarado, dependendo do box-sizing usado.

## RODADA 05 — O experimento do box-sizing

> Ainda no elemento inspecionado → painel Styles → localizar (ou adicionar) box-sizing e alternar o valor

Troque box-sizing entre content-box e border-box e observe o elemento na tela. Registre a diferença:

```text
width declarado no CSS: 200 px

box-sizing: content-box  ->  largura na tela: 242 px
box-sizing: border-box   ->  largura na tela: 200 px

diferenca entre as duas: 42 px
essa diferenca corresponde a que camadas? padding (40px) + border (2px)
```

**Sua análise:**

1. Com qual dos dois valores a largura na tela é igual à largura que você declarou?

   Com border-box, a largura total bate com o width declarado (200px).

2. Por que quase todo projeto começa o CSS com a regra `* { box-sizing: border-box }`?

   Quase todo projeto usa isso pra facilitar o controle das dimensões — com border-box, o padding e a borda ficam dentro da largura definida, em vez de somar por fora e bagunçar o tamanho real.

3. Se você somar padding a um elemento com border-box, o que muda de tamanho: a caixa ou o conteúdo dentro dela?

   Com border-box, o padding e a borda ficam dentro da largura definida, então o que diminui é o espaço disponível pro conteúdo — a caixa (o tamanho total) continua igual.
