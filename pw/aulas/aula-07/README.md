# GUIA DE ESTUDO: MAP, FILTER, FIND E REDUCE

*Aula invertida: seu grupo estuda uma função e ensina a turma*

**Programação Web — Aula 08 (09/10) · JavaScript Moderno: map, filter, find e reduce**

## 🎯 MISSÃO

Hoje quem ensina é você. Seu grupo vai virar especialista em UMA das quatro funções e apresentá-la para a turma no Bloco 2. Todos fazem a Ficha 00; depois, cada grupo faz só a ficha da sua função. Escreva a PREVISÃO antes de apertar Enter: é ela que mostra o que você ainda não entendeu.

- Abra `laboratorio-js.html` e o console (F12 → Console). A constante `PRODUTOS` (10 itens) já existe.
- Grupos 1 e 5: map (Ficha 01) · Grupos 2 e 6: filter (Ficha 02) · Grupos 3 e 7: find (Ficha 03) · Grupos 4 e 8: reduce (Ficha 04).
- Roteiro da apresentação (6 min): (1) a pergunta que a função responde; (2) o que o callback recebe e devolve; (3) demonstração ao vivo; (4) o que acontece quando nada serve ou a lista está vazia; (5) a armadilha e o seu sintoma; (6) um desafio para a turma.

**⏱️ Tempo:** 35 minutos     **👥 Formato:** grupos de 3 a 5, todos no console

**Nome:** Arthur de Souza Monteiro
**Turma:** pw-2026.2
**Data:** 09/10/2026

> Os slides da apresentação estão em [`apresentacao.html`](apresentacao.html) (abrir no navegador, setas ← → para passar). O laboratório da outra atividade (6 rodadas) está em [`laboratorio.md`](laboratorio.md).

---

## FICHA 00 — Para todos os grupos: callback e arrow function

```js
function ehBarato(p) { return p.preco < 100; }
const ehBarato2 = p => p.preco < 100;   // a mesma, como arrow

ehBarato(PRODUTOS[0])            // true   (mouse custa 89.90)
PRODUTOS.filter(ehBarato)        // 4 itens
PRODUTOS.filter(ehBarato())      // TypeError: Cannot read properties of undefined (reading 'preco')

const comChaves = p => { p.preco < 100 };
comChaves(PRODUTOS[0])           // undefined
```

**Sua análise:**

1. Qual a diferença entre escrever `ehBarato` e `ehBarato()` como argumento? Por que a segunda deu erro?

   `ehBarato` (sem parênteses) entrega a **própria função** pro filter, e o filter chama ela uma vez pra cada produto. `ehBarato()` **executa a função na hora**, sem passar nenhum produto, então `p` fica `undefined` e `undefined.preco` estoura o TypeError — antes mesmo do filter começar.

2. Por que `comChaves` devolve `undefined`? Escreva duas formas de corrigi-la.

   Quando a arrow tem chaves `{ }`, ela vira um bloco de código normal e só devolve algo se tiver `return`. Sem `return`, devolve `undefined`.
   - Forma 1 (tirar as chaves, retorno implícito): `const comChaves = p => p.preco < 100;`
   - Forma 2 (manter as chaves e pôr return): `const comChaves = p => { return p.preco < 100; };`

---

## FICHA 01 — map: transformar cada item (Grupos 1 e 5)

```js
PRODUTOS.length                                        // 10
const nomes = PRODUTOS.map(p => p.nome);
nomes.length                                           // 10
nomes[0]                                               // "Mouse óptico"

PRODUTOS.map(p => p.preco * 2)[0]                      // 179.8
PRODUTOS.map(p => `${p.nome}: R$ ${p.preco.toFixed(2)}`)[2]
  // 'Monitor 24": R$ 899.00'
PRODUTOS.map(p => ({ id: p.id, dobro: p.preco * 2 }))[0]
  // { id: 1, dobro: 179.8 }
PRODUTOS.map(p => p.preco < 100)
  // [true, false, false, false, true, false, false, true, false, true]
PRODUTOS.map(p => { p.nome })                          // [undefined × 10]  <- ARMADILHA
PRODUTOS[0].nome                                       // "Mouse óptico" — não mudou
```

**Sua análise:**

1. A saída do map pode ter menos itens que a entrada? Por quê?

   Não. O map chama o callback uma vez pra cada item e coloca o retorno na mesma posição da lista nova. 10 entram, 10 saem, sempre. Se eu quiser menos itens, a função certa é o filter.

2. O que map devolveu com `p => p.preco < 100`? Por que isso NÃO é filtrar?

   Devolveu 10 booleanos (`true`/`false`), um pra cada produto. Ele transformou cada produto na resposta da pergunta "é barato?", mas não tirou ninguém da lista. Filtrar seria ficar só com os 4 produtos baratos — isso é `filter`.

3. Por que o objeto `{ id, dobro }` precisou de parênteses em volta?

   Porque numa arrow, `{` logo depois do `=>` é lido como **início de bloco de código**, não como objeto. Os parênteses `({ ... })` avisam o JS que aquilo é uma expressão (um objeto) pra ser devolvida.

4. A ARMADILHA devolveu 10 undefined. Qual é o sintoma, a causa e a correção?

   - **Sintoma:** lista do tamanho certo (10), mas cheia de `undefined`, sem erro nenhum.
   - **Causa:** chaves sem `return` — o callback executa `p.nome` e joga o valor fora.
   - **Correção:** `PRODUTOS.map(p => p.nome)` ou `PRODUTOS.map(p => { return p.nome; })`.

**Desafio que o grupo vai propor à turma:**

> Gere uma lista de frases no formato `"Mouse óptico (42 un.)"` para todos os produtos.
>
> Resposta: `` PRODUTOS.map(p => `${p.nome} (${p.quantidade} un.)`) `` → 10 frases.

---

## FICHA 02 — filter: selecionar os que servem (Grupos 2 e 6)

```js
PRODUTOS.filter(p => p.categoria === 'perifericos').length    // 4
PRODUTOS.filter(p => p.preco < 100)                            // 4 itens: mouse, cabo HDMI, hub USB, mousepad
PRODUTOS.filter(p => !p.disponivel).map(p => p.nome)           // ["Webcam Full HD", "Mousepad grande"]
PRODUTOS.filter(p => p.nome.toLowerCase().includes('monitor')) // 2 itens
PRODUTOS.filter(p => p.preco > 5000)                           // []
PRODUTOS.filter(p => p.quantidade).length                      // 8
PRODUTOS.filter(p => { p.preco < 100 })                        // []  <- ARMADILHA
```

**Sua análise:**

1. A saída do filter pode ter de ___ até ___ itens. Por quê?

   De **0 até 10** (o tamanho da entrada). O filter só tira itens, nunca cria nem duplica: cada item entra ou não entra.

2. O que filter devolve quando nenhum item serve? Por que isso é melhor do que devolver undefined?

   Devolve `[]` (array vazio). É melhor porque o resultado continua sendo um array, então dá pra continuar usando `.length`, `.map`, `for...of` etc. sem quebrar. Com `undefined`, qualquer `.length` ou `.map` em seguida daria TypeError.

3. `p => p.quantidade` não devolve true nem false. Por que o resultado deu 8?

   Porque o filter não exige booleano: ele testa se o valor é *truthy* ou *falsy*. `0` é falsy, qualquer outro número é truthy. Dois produtos têm quantidade 0 (Webcam e Mousepad), então sobram 8.

4. A ARMADILHA devolveu lista vazia sem erro nenhum. Qual é o sintoma, a causa e a correção?

   - **Sintoma:** `[]` mesmo existindo produtos baratos, e sem mensagem de erro.
   - **Causa:** chaves sem `return` → callback devolve `undefined` → `undefined` é falsy → ninguém passa.
   - **Correção:** `PRODUTOS.filter(p => p.preco < 100)`.

**Desafio que o grupo vai propor à turma:**

> Quais produtos disponíveis custam entre R$ 100 e R$ 300?
>
> Resposta: `PRODUTOS.filter(p => p.disponivel && p.preco >= 100 && p.preco <= 300).map(p => p.nome)` → `["Headset com microfone", "SSD 480 GB"]` (a Webcam custa 199 mas está indisponível).

---

## FICHA 03 — find: achar um item (Grupos 3 e 7)

```js
PRODUTOS.find(p => p.id === 3)                    // TIPO: objeto  { id: 3, nome: 'Monitor 24"', ... }
PRODUTOS.find(p => p.id === 3).nome               // 'Monitor 24"'

PRODUTOS.find(p => p.categoria === 'monitores')   // o Monitor 24" (o primeiro)
PRODUTOS.filter(p => p.categoria === 'monitores') // [Monitor 24", Monitor 27" 144 Hz]

PRODUTOS.find(p => p.id === 999)                  // undefined
PRODUTOS.find(p => p.id === 999).nome             // TypeError: Cannot read properties of undefined (reading 'nome')  <- ARMADILHA
PRODUTOS.find(p => p.id === 999)?.nome            // undefined (sem erro)

PRODUTOS.find(p => p.id === '3')                  // undefined
```

**Sua análise:**

1. Com o mesmo critério, o que find devolve e o que filter devolve? Desenhe a diferença.

   ```text
   find   → { Monitor 24" }                      (o ITEM, sem colchetes)
   filter → [ { Monitor 24" }, { Monitor 27" } ] (uma LISTA com todos)

   nada encontrado:  find → undefined     filter → []
   ```

2. Havia dois monitores. Qual find devolveu, e por que ele não devolveu os dois?

   Devolveu o **Monitor 24"** (id 3), que vem primeiro na lista. O find para no primeiro item em que o callback dá verdadeiro — ele nem olha o resto. Serve pra "achar um", não "achar todos".

3. A ARMADILHA lançou um erro. Leia a mensagem: o que ela diz? Como se proteger dela (duas formas)?

   "Cannot read properties of undefined (reading 'nome')": o find não achou nada, devolveu `undefined`, e eu tentei ler `.nome` de `undefined`.
   - Forma 1 — optional chaining: `PRODUTOS.find(p => p.id === 999)?.nome` → `undefined` sem erro.
   - Forma 2 — testar antes:
     ```js
     const prod = PRODUTOS.find(p => p.id === 999);
     if (prod) { console.log(prod.nome); } else { console.log('Produto não encontrado'); }
     ```

4. Por que o id `'3'` não foi encontrado? Onde isso acontece num site real?

   Porque `===` compara valor **e tipo**: `3 === '3'` é `false` (número vs. texto). Num site real isso acontece direto: tudo que vem de formulário (`input.value`) e da URL (`?id=3`, `URLSearchParams`) chega como **texto**. Precisa converter: `PRODUTOS.find(p => p.id === Number(idDaUrl))`.

**Desafio que o grupo vai propor à turma:**

> Ache o primeiro produto da categoria "cabos" e mostre só o preço, sem dar erro se não existir.
>
> Resposta: `PRODUTOS.find(p => p.categoria === 'cabos')?.preco` → `39.9` (Cabo HDMI).

---

## FICHA 04 — reduce: colapsar a lista em um valor (Grupos 4 e 8)

```js
let soma = 0;                                                    // caminho 1: laço
for (const p of PRODUTOS) { soma += p.preco * p.quantidade; }
soma                                                             // 37071

PRODUTOS.reduce((acc, p) => acc + p.preco * p.quantidade, 0)     // caminho 2: 37071
PRODUTOS.reduce((acc, p) => acc + p.quantidade, 0)               // 230
PRODUTOS.reduce((maior, p) => p.preco > maior.preco ? p : maior).nome
                                                                 // 'Monitor 27" 144 Hz'
PRODUTOS.reduce((acc, p) => {
  acc[p.categoria] = (acc[p.categoria] || 0) + 1;
  return acc;
}, {})
  // { perifericos: 4, monitores: 2, cabos: 2, armazenamento: 1, acessorios: 1 }

PRODUTOS.reduce((acc, p) => acc + p.preco)    // "[object Object]349899229.939.927919979.9179949"  <- ARMADILHA
[].reduce((acc, p) => acc + p.preco)          // TypeError: Reduce of empty array with no initial value
```

**Sua análise:**

1. Quanto vale acc na 1ª volta, na 2ª e na última?

   Testei com `console.log(acc)` dentro do callback:
   - 1ª volta: `0` (o valor inicial)
   - 2ª volta: `3775.8` (89.90 × 42 do mouse)
   - última volta (10ª): `37071` — já é o total, porque o último item (Mousepad) tem quantidade 0 e soma 0.

   O que o callback devolve numa volta vira o `acc` da volta seguinte.

2. O que o 0 no final faz? O que saiu sem ele, e por que um resultado errado é pior do que um erro?

   O `0` é o **valor inicial do acumulador**. Sem ele, o reduce usa o **primeiro item** (um objeto) como acc. Aí `objeto + número` vira texto: `"[object Object]349..."`, e todo o resto vai sendo concatenado como string. É pior que um erro porque **não aparece nada vermelho no console**: o valor errado segue pro resto do código (vai parar no total do carrinho, por exemplo) e ninguém percebe até um cliente reclamar.

3. reduce devolveu um número, um produto e um objeto. O que decide o tipo do resultado?

   O **valor inicial** e o que o callback devolve. Começou com `0` e devolve número → número. Começou com `{}` e devolve o objeto → objeto. Sem valor inicial e devolvendo um produto → produto. O tipo do `acc` é o tipo do resultado.

4. O que acontece com lista vazia sem valor inicial? E com valor inicial?

   Sem valor inicial: **TypeError** "Reduce of empty array with no initial value" (não tem nem o primeiro item pra usar como acc). Com valor inicial: devolve o próprio valor inicial, ex. `[].reduce((acc, p) => acc + p.preco, 0)` → `0`. Por isso a regra é: **sempre passar o valor inicial**.

**Desafio que o grupo vai propor à turma:**

> Quantas unidades existem em estoque só de periféricos?
>
> Resposta: `PRODUTOS.reduce((acc, p) => p.categoria === 'perifericos' ? acc + p.quantidade : acc, 0)` → `85` (42 + 18 + 25 + 0).

---

## 🏆 DESAFIO BÔNUS

1. **Nomes dos periféricos disponíveis (filter + map):**
   ```js
   PRODUTOS.filter(p => p.disponivel && p.categoria === 'perifericos').map(p => p.nome)
   // ["Mouse óptico", "Teclado mecânico", "Headset com microfone"]
   ```

2. **Valor em estoque só dos disponíveis (filter + reduce):**
   ```js
   PRODUTOS.filter(p => p.disponivel).reduce((acc, p) => acc + p.preco * p.quantidade, 0)
   // 37071
   ```
   Deu o mesmo número do total porque os dois indisponíveis têm quantidade 0.

3. **map e filter usando só reduce:**
   ```js
   PRODUTOS.reduce((acc, p) => [...acc, p.nome], [])                      // = map(p => p.nome)
   PRODUTOS.reduce((acc, p) => p.disponivel ? [...acc, p] : acc, [])      // = filter(p => p.disponivel) → 8 itens
   ```
   Isso mostra que reduce é o "mais genérico" dos quatro: dá pra fazer os outros com ele (mas fica menos legível).

4. **Média de preço com reduce, sem divisão por zero:**
   ```js
   const mediaPreco = lista =>
     lista.length === 0 ? 0 : lista.reduce((acc, p) => acc + p.preco, 0) / lista.length;

   mediaPreco(PRODUTOS)   // 401.36
   mediaPreco([])         // 0
   ```
   Sem o teste do `length`, a lista vazia dá `0 / 0` = `NaN`.
