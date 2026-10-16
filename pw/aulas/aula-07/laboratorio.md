# LABORATÓRIO DE JAVASCRIPT MODERNO

*Prever, executar, explicar: descobrir a linguagem pelo console*

**Programação Web — JavaScript Moderno**

**Nome:** Arthur de Souza Monteiro
**Turma:** pw-2026.2
**Data:** 09/10/2026

> Tudo executado no console com `laboratorio-js.html` aberto. Depois da Rodada 6 é preciso dar F5, porque o `pop()` tira um item de `PRODUTOS`.

---

## RODADA 01 — const, let e var

```text
const a = 1;  a = 2;              // TypeError: Assignment to constant variable.
let   b = 1;  b = 2;              // ok, b vale 2
const t = [1, 2];  t.push(3);  t; // [1, 2, 3]  (sem erro!)

{ var x = 'dentro'; }  x;         // 'dentro'  (var vazou do bloco)
{ let y = 'dentro'; }  y;         // ReferenceError: y is not defined
```

1. **A linha 3 deu erro? O que const realmente impede?**
   Não deu. `const` impede **trocar o valor da variável** (`t = []` daria erro), mas não impede mexer **dentro** do array/objeto que ela aponta. Ela trava o vínculo nome → valor, não o conteúdo.
2. **Qual respeita as chaves e qual ignora?**
   `let` (e `const`) respeitam o bloco `{ }`: fora dele `y` não existe. `var` ignora o bloco e vaza pra fora.
3. **Qual vou usar por padrão?**
   `const` por padrão. Troco para `let` só quando o valor precisa mudar (contador, soma num laço). `var` não uso.

## RODADA 02 — Tipos e comparação

```text
typeof 42          // "number"
typeof '42'        // "string"
typeof true        // "boolean"
typeof PRODUTOS    // "object"   (surpresa: array é object)
typeof undefined   // "undefined"

'10' ==  10        // true
'10' === 10        // false
0    ==  false     // true
0    === false     // false
```

1. **O que == faz antes de comparar, e que === não faz?**
   `==` **converte os tipos** pra ficarem iguais e só depois compara. `===` compara valor **e** tipo, sem converter.
2. **Como saber se é array?**
   `typeof` diz "object" pra array. O certo é `Array.isArray(PRODUTOS)` → `true`.
3. **Bug da idade com == 18:**
   O formulário devolve `"18"` (texto). Com `==` funciona por sorte, mas com `===` dá `false`, e coisas como `"18" + 1` viram `"181"`. E `"" == 0` é `true`: um campo vazio passaria como idade 0. Tem que converter com `Number(...)` e usar `===`.

## RODADA 03 — map

```text
PRODUTOS.length                                 // 10
PRODUTOS.map(p => p.nome)                       // tamanho 10
PRODUTOS.map(p => `${p.nome}: R$ ${p.preco}`)
  // "Mouse óptico: R$ 89.9"
  // "Teclado mecânico: R$ 349"
PRODUTOS.map(p => { p.nome })                   // [undefined × 10]
```

1. **Sempre o mesmo tamanho?** Sim: um resultado por item, nunca tira nem acrescenta.
2. **O que faltou nas chaves?** O `return`. Com chaves precisa de `return p.nome`, ou tira as chaves.
3. **PRODUTOS mudou?** Não. `map` cria uma lista nova e não altera a original.

## RODADA 04 — filter e find

```text
PRODUTOS.filter(p => p.categoria === 'perifericos')  // 4 itens, TIPO: array
PRODUTOS.filter(p => p.preco < 100)                  // 4 itens
PRODUTOS.find(p => p.id === 3)                       // TIPO: objeto (Monitor 24")
PRODUTOS.find(p => p.id === 999)                     // undefined
PRODUTOS.filter(p => p.id === 999)                   // []
```

1. **Quando nada é encontrado:** `filter` → `[]` (array vazio); `find` → `undefined`.
2. **Só saber SE existe produto em falta:** `PRODUTOS.some(p => !p.disponivel)` → `true`.
3. **Periféricos abaixo de 100, em uma linha:**
   `PRODUTOS.filter(p => p.categoria === 'perifericos' && p.preco < 100)` → só o Mouse óptico.

## RODADA 05 — reduce

```text
// caminho 1 — laço:   soma → 37071
// caminho 2 — reduce: 37071
PRODUTOS.reduce((acc, p) => acc + p.preco)
  // "[object Object]349899229.939.927919979.9179949"
```

1. **Deram o mesmo número?** Sim, 37071. Hoje entendo melhor o laço, mas o reduce é a mesma coisa: `acc` é o `soma`, e o `0` é o `let soma = 0`.
2. **Para que serve o 0?** É o valor inicial do acumulador. Sem ele, o primeiro produto (um objeto) vira o acc e `objeto + número` vira texto: saiu uma string sem sentido, sem erro.
3. **reduce devolvendo objeto no projeto:** no catálogo da loja, agrupar produtos por categoria (`{ perifericos: [...], monitores: [...] }`) pra montar as seções da página, ou calcular um resumo do carrinho `{ itens, total }`.

## RODADA 06 — Destructuring, spread e a armadilha da cópia

```text
const item = PRODUTOS[0];
const { nome, preco } = item;
nome; preco;                      // "Mouse óptico", 89.9

const [primeiro, segundo] = PRODUTOS;
primeiro.nome;                    // "Mouse óptico"

const promo = { ...item, preco: item.preco / 2 };
promo.preco;                      // 44.95
item.preco;                       // 89.9  (não mudou)

const lista2 = PRODUTOS;
lista2.pop();
PRODUTOS.length;                  // 9   (mudou o original!)
```

1. **Diferença entre os dois casos:** `{ ...item }` cria um **objeto novo** com uma cópia dos campos, então mexer em `promo` não afeta `item`. Já `lista2 = PRODUTOS` não copia nada: são **dois nomes pro mesmo array**, então o `pop()` em `lista2` tira o item de `PRODUTOS`.
2. **Cópia de verdade:** `const lista2 = [...PRODUTOS];` (pop na cópia não afeta o original).
3. **Regra:** a função nunca chama métodos que alteram o array recebido (`push`, `pop`, `sort`, `splice`); ela trabalha numa cópia (`[...lista]`) ou usa métodos que devolvem lista nova (`map`, `filter`, `reduce`).

---

## 🏆 DESAFIO BÔNUS

- **Encadear três métodos:**
  ```js
  [...PRODUTOS].filter(p => p.disponivel).sort((a, b) => a.preco - b.preco).slice(0, 3).map(p => p.nome)
  // ["Cabo HDMI 2 m", "Hub USB 4 portas", "Mouse óptico"]
  ```
- **`.sort()` em `[10, 9, 100, 1]`** → `[1, 10, 100, 9]`. Sem função, o sort compara como **texto** ("10" vem antes de "9" porque "1" < "9"). Correto: `.sort((a, b) => a - b)` → `[1, 9, 10, 100]`.
- **`frete || 10` vs `frete ?? 10`** com `frete = 0`: `||` dá `10` (acha que 0 é "vazio"), `??` dá `0` (só troca se for `null`/`undefined`). Bug: cliente com frete grátis (0) seria cobrado R$ 10 se usasse `||`.
- **Média com rest:**
  ```js
  const media = (...nums) => nums.length === 0 ? 0 : nums.reduce((acc, n) => acc + n, 0) / nums.length;
  media(2, 4, 6)  // 4
  media()         // 0  (sem o teste, daria NaN)
  ```
