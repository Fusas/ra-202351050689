# AUDITORIA DE RESPONSIVIDADE E ACESSIBILIDADE

*Testar um site como quem não tem o seu computador, o seu mouse e a sua visão*

**Programação Web — Responsividade e Acessibilidade**

## 🎯 MISSÃO

Auditar sites reais com as ferramentas que já tem no navegador, e aplicar o mesmo protocolo no próprio projeto.

- Rodadas 02, 03, 04 e 06 usam um site real de porte médio.
- Rodadas 01 e 05 usam o arquivo `site-nao-responsivo.html` disponibilizado pelo professor (publicado em: https://claude.ai/artifact/H6x5KKyCSBJF7nMXrKpQNg).
- Ferramentas: modo dispositivo (Ctrl+Shift+M), aba Lighthouse, painel Elements, tecla Tab.
- Na Rodada 5: não ler o comentário no topo do código-fonte do arquivo antes de terminar a caça.

**Nome:** Arthur de Souza Monteiro
**Turma:** pw-2026.2
**Data:** ___/___/2026

---

## RODADA 01 — A linha que falta

> Abrir site-nao-responsivo.html e um site real, ambos no modo dispositivo (Ctrl+Shift+M) em 360px

```text
site-nao-responsivo.html em 360px:
  ha rolagem horizontal?     ( )sim ( )nao
  o texto ficou legivel?     ( )sim ( )nao

site real em 360px:
  ha rolagem horizontal?     ( )sim ( )nao

a linha que existe no <head> do site real e falta no outro:
  <meta name="__________" content="_________________________">
```

**Sua análise:**

1. Sem essa linha, que largura o celular finge ter?

2. Essa linha faz o layout se adaptar sozinho, ou apenas permite que ele se adapte?

3. Ela é CSS ou HTML?

## RODADA 02 — Caça aos breakpoints

> Site real → arrastar a borda da janela DEVAGAR, do máximo até uns 320px, observando o layout

```text
largura (px)   o que mudou na tela
------------   ----------------------------------------
____________   ________________________________________
____________   ________________________________________
____________   ________________________________________

no CSS (Styles), esses numeros aparecem dentro de:
  @media (____________: ______px) { ... }

total de breakpoints encontrados: ______
```

**Sua análise:**

1. As media queries do site usam min-width ou max-width? O que isso diz sobre a estratégia dele?

2. Os breakpoints são números redondos (768, 1024) ou valores incomuns? O que cada escolha sugere?

3. Houve mudança de layout SEM media query? Onde?

## RODADA 03 — O teste do teclado

> Site real → clicar uma vez na barra de endereços, depois só Tab, Shift+Tab e Enter. Sem tocar no mouse.

```text
voce conseguiu:
  chegar ao menu principal?          ( )sim ( )nao
  chegar a um botao de acao?         ( )sim ( )nao
  usar o campo de busca?             ( )sim ( )nao
  saber SEMPRE onde estava o foco?   ( )sim ( )nao

quantos Tab foram necessarios para chegar ao conteudo principal? ______
encontrou algum elemento clicavel INALCANCAVEL pelo Tab? qual?
  ______________________________________________________
```

**Sua análise:**

1. Em algum momento você se perdeu na página? O que faltava para não se perder?

2. Se um site tem 40 links no topo, quantos Tab um usuário de teclado dá antes do conteúdo? Existe solução para isso?

3. Repita o teste no site-nao-responsivo.html: você consegue se inscrever na feira usando só o teclado?

## RODADA 04 — A nota do Lighthouse

> DevTools → aba Lighthouse → marcar apenas "Accessibility" → Analyze page load

```text
site 1: ______________________________  nota: ______ /100
  problema 1: __________________________________________
  problema 2: __________________________________________
  problema 3: __________________________________________

site 2: ______________________________  nota: ______ /100
  problema 1: __________________________________________

site-nao-responsivo.html                nota: ______ /100
```

**Sua análise:**

1. Algum problema apontado aparece nos DOIS sites? Qual? Por que ele é tão comum?

2. Uma nota 100 significa que o site é acessível? Pense no que você descobriu na Rodada 3.

3. Qual problema apontado você saberia corrigir agora?

## RODADA 05 — Caça aos defeitos (sem espiar)

> site-nao-responsivo.html → Elements, Lighthouse, Tab e o olho. NÃO leia o comentário no topo do arquivo.

Este arquivo tem 14 defeitos plantados: 6 de responsividade e 8 de acessibilidade. Encontre o máximo que conseguir e classifique cada um:

```text
#   defeito encontrado                      tipo (R/A)  como voce achou
--  --------------------------------------  ----------  ----------------
 1  ______________________________________  __________  ________________
 2  ______________________________________  __________  ________________
 3  ______________________________________  __________  ________________
 4  ______________________________________  __________  ________________
 5  ______________________________________  __________  ________________
 6  ______________________________________  __________  ________________
 7  ______________________________________  __________  ________________
 8  ______________________________________  __________  ________________

R = responsividade   A = acessibilidade      total: ______ de 14
```

**Sua análise:**

1. Quantos você encontrou com o Lighthouse e quantos só percebeu testando à mão?

2. Qual defeito é o mais grave, na sua opinião? Justifique pensando em quem é afetado.

3. Escolha o defeito que você acha mais fácil de corrigir e escreva a linha de CSS ou HTML que resolve.

## RODADA 06 — Dá para acertar com o dedo?

> Site real → inspecionar um link do menu e um botão → painel Computed → ler width e height

A WCAG 2.2 exige que alvos de toque tenham ao menos 24×24 pixels. Meça três elementos clicáveis:

```text
elemento                largura x altura     passa (>= 24x24)?
---------------------   ------------------   -----------------
link do menu            ______ x ______ px   ( )sim ( )nao
botao principal         ______ x ______ px   ( )sim ( )nao
link do rodape          ______ x ______ px   ( )sim ( )nao

no site-nao-responsivo.html, o link do topo tem font-size ______ px
```

**Sua análise:**

1. Qual propriedade CSS aumenta a área clicável sem mudar o tamanho do texto?

2. Por que links de rodapé costumam ser os piores nesse critério?

3. Você já errou o toque num link pequeno no celular? Isso é falha do usuário ou do site?
