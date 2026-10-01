# Template padrão da Aplicação

Layout padrão do site (HTML e CSS) que será utilizado em todas as páginas com a definição de identidade visual, aspectos de responsividade e iconografia.

## Identidade Visual

O projeto adota uma estética **pixel art / retrô**, remetendo a jogos, para deixar o ambiente hospitalar mais lúdico e acolhedor para o público infantil.

### Paleta de cores

| Uso                                   | Cor              | Hex        |
|----------------------------------------|-------------------|-----------|
| Fundo geral da aplicação               | Azul claro        | `#ADCDD8` |
| Texto principal (títulos e parágrafos) | Azul petróleo     | `#2a7895` |
| Fundo de cards e painéis               | Azul bem claro    | `#c9f1ff` |
| Borda de cards e componentes           | Azul médio        | `#328BA9` |
| Sombra (efeito "3D pixelado")          | Azul escuro       | `#115066` |
| Botões principais                      | Azul médio        | `#328BA9` |
| Botão de destaque (ex: recentes)       | Amarelo           | `#ffcf4c` |
| Alertas e mensagens de erro            | Vermelho          | `#cc5555` / `#9b2a2a` |
| Destaques (moeda/conquista)            | Dourado           | `#f0b800` |
| Confirmação de progresso               | Verde             | `#299444` |

### Tipografia

- Fonte customizada: **Pixel_font** (`dogicapixel.ttf`)
- Aplicada globalmente no `body`, reforçando a estética de jogo em todos os textos, botões e formulários.

### Iconografia

- Ícones construídos via CSS (ex: cruz médica feita com pseudo-elementos `::before`/`::after`)
- Uso de emojis temáticos como reforço lúdico (ex: ⭐ estrela de progresso, 🟡 moeda de conquista)
- Ícone de configurações (engrenagem) com animação de escala ao passar o mouse

## Estrutura padrão da página

- **Header (`.topo` / `.header`)**: logo à esquerda, navegação central, ícone de configurações à direita. Fundo na cor de base, com borda inferior de destaque.
- **Fundo**: imagem ilustrativa de hospital (`hospital.png`) aplicada em baixa opacidade (40%) como camada de fundo fixa, sem interferir na leitura do conteúdo.
- **Conteúdo (cards/painéis)**: blocos com cantos bem arredondados (`border-radius: 60px`) e sombra sólida deslocada, simulando um efeito "3D pixelado" característico de jogos.
- **Botões**: padronizados em formato retangular com cantos levemente arredondados, com efeito de escala (`scale`) e mudança de cor ao passar o mouse, reforçando o feedback interativo.
- **Menu de configurações**: painel flutuante (ex: ativar/desativar som) acessível pelo ícone no header, atendendo ao requisito de som opcional (RNF-03).

## Responsividade

Definida por um breakpoint principal em **768px** (tablets e celulares):

- O header passa de layout horizontal para vertical (coluna)
- Cards e seções passam a ocupar ~90% da largura da tela
- Tamanhos de fonte são reduzidos (ex: títulos de 28px para 20px)
- Elementos de navegação quebram linha e se centralizam

## Artefato de referência

- Arquivo: [style.css](https://github.com/ICEI-PUC-Minas-PPC-CC/ppc-cc-2026-1-tai2-noite-software_atendimento_criancas/blob/main/codigo-fonte/src/Backend/htdocs/medikids/css/style.css) — arquivo centralizado de estilos, compartilhado entre todas as páginas do projeto (login, escolha de personagem, vídeos/jogos, perfil do responsável, tela de conclusão).
