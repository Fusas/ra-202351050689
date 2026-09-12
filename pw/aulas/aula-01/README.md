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

   Resposta: Método GET, status 200.

2. Qual o tamanho dela em kB? Ela é a maior da lista?

   Resposta: 387 KB. Não é a maior — o arquivo player.min.js pesa 1210 KB, mais de 3x o tamanho do documento.

3. Some o total transferido pela página (barra inferior do DevTools). Quantas requisições foram, no total?

   Resposta: 244 requisições, 5.9 MB transferidos no total.

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

   Resposta: O HTML inicial (Rodada 01) é a única requisição que eu mesmo pedi, ao digitar o endereço. Todo o resto (CSS, JS, imagens, fontes) foi pedido automaticamente pelo próprio navegador, que lê o HTML e, ao encontrar tags como `<img>`, `<link>` e `<script>`, sai buscando cada arquivo referenciado sem eu precisar clicar em nada.

2. Há requisições para endereços de OUTROS domínios? Anote um deles e arrisque um palpite sobre o que seja.

   Resposta: Sim, o domínio s2-home-globo.glbimg.com. Palpite: é um subdomínio/CDN separado que a Globo usa só pra guardar e servir imagens (por exemplo, vi uma foto do Flávio e do Lula vindo desse endereço).

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

   Resposta: text/html; charset=UTF-8.

2. Qual servidor respondeu (header Server)? E o status code?

   Resposta: O header Server não foi informado — a Globo esconde isso de propósito, por segurança, pra não revelar qual tecnologia usa no servidor. Em vez disso, aparece um header "Via: 2.1 KubeCache", que indica que tem um cache/proxy no meio (baseado em Kubernetes). Status code: 200.

3. Compare o Content-Type de um arquivo CSS com o de uma imagem. O que muda?

   Resposta: CSS veio como "text/css; charset=utf-8" e a imagem como "image/webp". O tipo geral muda de text/ pra image/, e isso diz pro navegador como tratar cada arquivo: no CSS, ele lê o conteúdo como texto e interpreta os comandos de estilo para aplicar no site; na imagem, ele não interpreta comando nenhum, só decodifica e replica a imagem na tela.

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

   Resposta: Está no ar e respondendo normalmente. Eu sei porque ele devolveu uma resposta completa (status 404, com uma página de erro cheia de imagens) — ele só não encontrou a página que eu pedi, porque ela não existe.

2. O erro foi de quem pediu ou de quem respondeu? Justifique.

   Resposta: Foi de quem pediu (eu). O status 404 está na família 4xx, que indica erro do lado do cliente — eu pedi algo que não existe no servidor.

3. Se o status fosse 500 em vez do que você anotou, a conclusão seria a mesma? Por quê?

   Resposta: Não, mudaria. O 4xx é erro de quem pediu (o navegador/cliente pediu algo errado), enquanto o 5xx é erro do servidor — ou seja, se fosse 500, a culpa passaria a ser do servidor, que quebrou tentando responder ao meu pedido.

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

   Resposta: Não, o texto e as imagens continuaram aparecendo, só sem estilo. Isso mostra que o CONTEÚDO mora no HTML (o esqueleto), não no CSS — o CSS só cuida da aparência por cima do que já existe.

2. Descreva em uma frase o papel do CSS, com base apenas no que você acabou de ver.

   Resposta: O CSS é a "pele" do site — ele cuida de cores, imagens de fundo, layout e fontes, dando aparência ao esqueleto que o HTML já montou.

3. Ainda restou algum comportamento (menu que abre, botão que responde)? De qual das três tecnologias ele vem?

   Resposta: Sim, os links e botões continuaram respondendo ao clique mesmo sem CSS. Esse comportamento (a parte que se move e reage) vem do JavaScript.
