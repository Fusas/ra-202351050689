# FICHA DE INVESTIGAÇÃO

*O que viaja pela rede entre o seu clique e a página na tela*

**Programação Web — Aula 1 de 20 · Arquitetura das Aplicações Web**

## 🎯 MISSÃO

Você vai abrir as ferramentas de desenvolvedor do navegador e descobrir, por conta própria, o que acontece entre apertar Enter numa URL e ver a página pronta. Ninguém vai explicar antes — as respostas estão na tela.

- Escolha um site à sua livre escolha e mantenha o MESMO site nas 5 rodadas.
- Abra o DevTools: F12 (ou Ctrl+Shift+I) e vá para a aba Network.
- Preencha a ficha à mão, com suas palavras. Não há resposta "de gabarito".
- Errar aqui é esperado e não vale nota: a ficha é material de investigação, não prova.

**⏱️ Tempo:** 40 minutos     **👥 Formato:** individual, conferindo cada rodada com o colega ao lado

**Nome:** Arthur de Souza Monteiro
**Turma:** pw-2026.2
**Data:** 11/09/2026

---

## RODADA 01 — A primeira requisição

> `DevTools → aba Network → marcar "Disable cache" → recarregar a página (F5)`

A lista se enche de linhas. Olhe apenas a PRIMEIRA delas — é o documento que o navegador pediu quando você digitou o endereço.

```text
Name          Status   Type       Size      Time
------------  ------   --------   -------   ------
www.globo.com  200     document   387 kB    513 ms
```

**Sua análise:**

1. Qual é o método HTTP e o status code dessa primeira requisição?

   Método GET, status 200.

2. Qual o tamanho dela em kB? Ela é a maior da lista?

   387 KB. Não é a maior, o player.min.js pesa 1210 kb, bem mais que o documento.

3. Some o total transferido pela página (barra inferior do DevTools). Quantas requisições foram, no total?

   244 requisições e 5.9 MB transferidos no total.

## RODADA 02 — O que vem depois

> `Usar os filtros do topo da aba Network: All · Doc · CSS · JS · Img · Font`

O navegador pediu muito mais do que você digitou. Classifique o que veio depois e conte cada tipo.

```text
Doc  (HTML) .......... 3 requisicoes (229 kB)
CSS  (estilo) ........ 3 requisicoes (234 kB)
JS   (comportamento) . 48 requisicoes (246 kB)
Img  (imagens) ....... 95 requisicoes (252 kB)
Font (tipografia) .... 4 requisicoes (255 kB)
```

**Sua análise:**

1. Ninguém clicou nesses arquivos. Quem, então, pediu por eles?

   O html que eu pedi (a primeira requisição) tem tags de img, link e script apontando pra esses arquivos. O navegador lê isso sozinho e já sai baixando tudo, sem eu precisar clicar em nada.

2. Há requisições para endereços de OUTROS domínios? Anote um deles e arrisque um palpite sobre o que seja.

   Sim, o domínio s2-home-globo.glbimg.com. Acho que é tipo um servidor separado só pra guardar imagem da globo, tipo vi uma foto do Flávio e do Lula vindo de lá.

## RODADA 03 — Anatomia de um pedido e de uma resposta

> `Clicar em qualquer linha da lista → aba Headers → seções General e Response Headers`

Cada linha da lista esconde uma conversa em texto puro. É isso que trafega na rede:

```text
GET /index.html HTTP/1.1          <- o pedido do navegador
Host: www.site.com
User-Agent: Mozilla/5.0 ...

HTTP/1.1 200 OK                   <- a resposta do servidor
Content-Type: text/html; charset=utf-8
Content-Length: 48213
Server: nginx

<!DOCTYPE html> ...               <- o conteudo, finalmente
```

**Sua análise:**

1. Na requisição que você escolheu, qual o valor de Content-Type?

   text/html; charset=UTF-8.

2. Qual servidor respondeu (header Server)? E o status code?

   Não achei o Server, acho que a Globo esconde de propósito. Mas tem um "Via: 2.1 KubeCache". Status 200.

3. Compare o Content-Type de um arquivo CSS com o de uma imagem. O que muda?

   CSS veio como text/css e a imagem como image/webp. No CSS o navegador lê o comando pra poder colocar no site, e a imagem ele só replica na tela.

## RODADA 04 — Quando alguma coisa dá errado

> `Na barra de endereços, acrescentar /pagina-que-nao-existe-123 ao domínio e dar Enter`

Com o DevTools aberto, observe a requisição da página inexistente. O servidor respondeu — só não respondeu o que você queria.

```text
HTTP/1.1 404 Not Found

Compare com a rodada 01:
  rodada 01 -> status 200
  rodada 04 -> status 404
```

**Sua análise:**

1. O servidor está no ar ou fora do ar? Como você sabe?

   Tá respondendo, só que não encontrou a requisição do navegador porque a página não existe.

2. O erro foi de quem pediu ou de quem respondeu? Justifique.

   Foi de quem pediu. É família 4xx, pedi algo que não existe.

3. Se o status fosse 500 em vez do que você anotou, a conclusão seria a mesma? Por quê?

   Mudaria, porque 4xx é culpa do navegador (de quem pede) e 5xx é do servidor.

## RODADA 05 — Quem faz o quê na página

> `DevTools → Ctrl+Shift+P → digitar "Disable CSS" → Enter. Depois recarregue para desfazer.`

Este é o experimento que separa as três tecnologias da web. Observe a página antes e depois:

```text
COM CSS                    SEM CSS
-----------------------    -----------------------
cores, colunas, fontes     sem cor, sem colunas, fonte padrao
menu na horizontal         lista de links, um embaixo do outro
textos e links             continuam aparecendo normalmente
```

**Sua análise:**

1. O texto e as imagens desapareceram junto com o CSS? O que isso diz sobre onde o CONTEÚDO mora?

   Não, continuaram aparecendo, só sem estilo. O conteúdo mora no HTML, não no CSS.

2. Descreva em uma frase o papel do CSS, com base apenas no que você acabou de ver.

   O CSS é tipo a pele do site, cuida da aparência (cor, fonte, layout).

3. Ainda restou algum comportamento (menu que abre, botão que responde)? De qual das três tecnologias ele vem?

   Sim, os links e botões continuaram respondendo ao clique. Isso vem do JS.
