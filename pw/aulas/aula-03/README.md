# PERÍCIA EM FORMULÁRIOS

*Como a web coleta dados — e o que o navegador faz (e não faz) para protegê-los*

**Programação Web — Aula 3 de 20 · Formulários, Tabelas e Validação**

## 🎯 MISSÃO

Você vai testar formulários reais como um usuário desastrado e depois como alguém mal-intencionado. O objetivo é descobrir onde o HTML ajuda, onde ele atrapalha e até onde a proteção do navegador realmente vai.

- Use um formulário de cadastro real de um site à sua escolha.
- Trabalhe com o DevTools aberto (F12): abas Elements e Console.
- Nas rodadas 3 e 5, use o modo dispositivo (Ctrl+Shift+M) — ou o próprio celular.
- Preencha à mão. A Rodada 5 é a mais importante: não pule.

**⏱️ Tempo:** 40 minutos     **👥 Formato:** individual, conferindo cada rodada com o colega ao lado

**Nome:** Arthur de Souza Monteiro
**Turma:** pw-2026.2
**Data:** ___/___/2026

---

## RODADA 01 — Anatomia de um campo

> Formulário real → clicar com o botão direito num campo → Inspecionar

Cada campo de formulário é uma tag input com atributos que decidem tudo. Catalogue três campos do formulário que você escolheu:

```text
campo   type=tel               name=accountId          (gov.br - login CPF)
  1     id=accountId           required? (nao tem esse atributo)

campo   type=password          name=password           (gov.br - senha)
  2     id=password            required? (nao tem esse atributo)

campo   type=password          name=password           (Riot Games - senha)
  3     id=(nao tem id)        required? (nao tem esse atributo)
```

**Sua análise:**

1. Os atributos name e id têm o mesmo valor nos campos que você viu? Eles servem para a mesma coisa?

   Nos campos 1 e 2 sim, name e id eram iguais. Mas no campo 3 (Riot Games) nem tinha id, só name, e o formulário funciona normal. Isso mostra que são coisas diferentes: name é o que vai pro servidor quando envia o formulário, id é só pra usar dentro da própria página (ligar com label, CSS, JS). Só coincidiu de ter o mesmo valor nos dois primeiros.

2. Algum campo usa placeholder em vez de um rótulo visível? Qual o problema disso?

   Sim, os 3 usam placeholder ("Digite seu CPF", "Digite sua senha atual") em vez de label visível. O problema é que o placeholder some assim que você começa a digitar, então se parar no meio ou voltar depois não tem mais nada dizendo o que aquele campo pede.

3. Que tipo de dado cada campo espera receber, só pelo type?

   Campo 1 (type=tel) espera telefone, campo 2 e 3 (type=password) esperam senha. Só que o campo 1 na verdade é usado pra CPF, não telefone, o dev deve ter usado tel só pra abrir teclado numérico no celular.

## RODADA 02 — O teste do label

> Clicar no TEXTO do rótulo (não no campo) do formulário real

Um label corretamente associado faz o clique no texto focar o campo. É um teste de 1 segundo que revela se a marcação está certa:

```text
formulario real          clicar no rotulo focou o campo? ( )sim ( )nao

codigo do que FUNCIONA:
  <label for="__________">Nome</label>
  <input id="__________">
```

**Sua análise:**

1. Qual atributo do label precisa bater com qual atributo do input?

2. Além do clique, quem mais depende dessa associação para saber o nome do campo?

3. Se não estava associado, o que exatamente estava faltando?

## RODADA 03 — O teclado que o celular abre

> DevTools → Ctrl+Shift+M (modo dispositivo) ou abra a página no seu celular

O atributo type muda o teclado que aparece no celular. Teste cada um e descreva o que apareceu:

```text
type="text"      teclado: _______________________________
type="email"     teclado: _______________________________
type="tel"       teclado: _______________________________
type="number"    teclado: _______________________________
type="date"      controle: _____________________________
```

**Sua análise:**

1. Qual type você usaria para CEP? E para um valor em reais? Justifique.

2. Um campo de telefone com type="text" funciona. Então por que usar type="tel"?

3. O type="date" mostrou um calendário? Quem desenhou esse calendário: você ou o navegador?

## RODADA 04 — A validação que vem de graça

> Formulário real → deixar tudo em branco → clicar em enviar

Antes de qualquer JavaScript, o navegador já barra o envio. Anote a mensagem EXATA que apareceu e descubra quem a causou:

```text
mensagem exibida pelo navegador:
  "_______________________________________________"

campo que ele apontou primeiro: ____________________
atributo no HTML que causou isso: __________________

agora digite "batata" num campo type="email" e envie:
  o que aconteceu? ________________________________
```

**Sua análise:**

1. Você escreveu alguma linha de JavaScript para isso funcionar?

2. A mensagem apareceu em português. Quem escolheu esse idioma?

3. Qual atributo você usaria para exigir no mínimo 3 caracteres num campo de nome?

## RODADA 05 — Burlando a validação (a rodada que importa)

> DevTools → Elements → achar um input com required → duplo clique no atributo → apagar → Enter → submeter vazio

Você acabou de remover a proteção do formulário sem instalar nada, em 3 segundos, só com o navegador. Registre o resultado:

```text
antes de apagar o required, o envio vazio era: ( )bloqueado ( )permitido
depois de apagar o required, o envio vazio foi: ( )bloqueado ( )permitido

tempo que você levou para fazer isso: ______ segundos
ferramenta extra que voce precisou instalar: _______________
```

**Sua análise:**

1. Se qualquer pessoa faz isso em 3 segundos, a validação do HTML serve para proteger o SISTEMA ou para ajudar o USUÁRIO?

2. Onde, então, a validação precisa acontecer de novo obrigatoriamente?

3. Escreva em uma frase o que você diria a um colega que afirma "meu formulário está seguro, tem required em tudo".

## RODADA 06 — A tabela é de dados ou de layout?

> Procurar uma tabela real (extrato bancário, tabela de preços, classificação de campeonato) → Inspecionar

Tabela serve para dados tabulares, com cabeçalhos que dizem o que cada coluna significa. Verifique se a que você achou está marcada corretamente:

```text
usa <caption> (titulo da tabela)?     ( )sim ( )nao
usa <thead> e <tbody>?                ( )sim ( )nao
os cabecalhos sao <th> ou <td>?       ( )th  ( )td
os <th> tem scope="col" ou "row"?     ( )sim ( )nao

site investigado: _________________________________
```

**Sua análise:**

1. Se os cabeçalhos são td, como um leitor de tela sabe que "R$ 250,00" pertence à coluna Valor?

2. Para que serve o atributo scope?

3. Você encontrou alguma tabela usada para posicionar elementos na tela em vez de mostrar dados? Por que isso é um problema?
