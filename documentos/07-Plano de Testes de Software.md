# Plano de Testes de Software

|Caso de Teste    | CT-01 - Teste de Integração |
|:---|:---|
| Requisitos Associados | RNF-01, RNF-02, RNF-03 |
| Objetivo do Teste | Verificar o funcionamento correto das telas |
| Passos | Fazer o caminho completo pelo site, acessando-o, fazendo login, escolhendo o personagem, e o tipo de explicação (vídeo ou jogo) |
| Critérios de êxito | As telas avançarem com facilidade, e sem erros |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

|Caso de Teste    | CT-05 - Exibição correta dos conteúdos |
|:---|:---|
| Requisitos Associados | RF-06; RF-04; RF-01 |
| Objetivo do Teste | Verificar se os elementos visuais aparecem corretamente |
| Passos | 1. Acessar o site; 2. Navegar pelas páginas; 3. Verificar imagens, botões e textos |
| Critérios de êxito | Todos os elementos devem aparecer corretamente, sem sobreposição ou erros visuais |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

|Caso de Teste    | CT-06 - Som Opcional |
|:---|:---|
| Requisitos Associados | RNF-03 |
| Objetivo do Teste | Verificar se o som é realmente desligado ao clicar para desligá-lo |
| Passos | 1. Acessar o site; 2. Clicar no ícone de configurações; 3. Desligar o som; 4. Clicar em qualquer botão, verificando se o som está desligado |
| Critérios de êxito | O som deve ser desativado e ativado com facilidade, e sem erros |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

|Caso de Teste    | CT-07 - Compatibilidade entre dispositivos |
|:---|:---|
| Requisitos Associados | RF-05, RNF-06 |
| Objetivo do Teste | Verificar se o site funciona corretamente em celular, tablet e computador |
| Passos | 1. Acessar o site em celular; 2. Acessar em tablet; 3. Acessar em computador; 4. Comparar exibição e funcionamento em cada um |
| Critérios de êxito | O site deve se adaptar corretamente à tela, sem quebra de layout ou perda de funcionalidade em nenhum dispositivo |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

|Caso de Teste    | CT-08 - Funcionamento offline |
|:---|:---|
| Requisitos Associados | RNF-05 |
| Objetivo do Teste | Verificar se o site permanece utilizável com conexão instável ou sem internet |
| Passos | 1. Acessar o site com conexão normal; 2. Carregar uma explicação (vídeo/jogo); 3. Desativar ou reduzir a conexão; 4. Verificar se o conteúdo já carregado continua acessível |
| Critérios de êxito | O conteúdo básico deve continuar disponível, ou o sistema deve informar claramente a limitação, sem travar |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

|Caso de Teste    | CT-09 - Segurança e privacidade dos dados |
|:---|:---|
| Requisitos Associados | RNF-04 |
| Objetivo do Teste | Verificar se os dados inseridos pelo usuário (ex: nome, exame agendado) são armazenados/transmitidos de forma segura |
| Passos | 1. Preencher dados de cadastro/agendamento; 2. Verificar conexão segura (HTTPS); 3. Verificar se os dados não ficam expostos em logs, URLs ou telas de terceiros |
| Critérios de êxito | Nenhum dado sensível deve ser exposto; conexão deve ser criptografada, conforme LGPD |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

---

# Plano de Testes com o Usuário

|Caso de Teste    | CT-02 - Visualização correta dos vídeos|
|:---|:---|
| Requisitos Associados | RF-01; RF-06 |
| Objetivo do Teste | Verificar se o usuário consegue acessar os vídeos de um exame médico|
| Passos |  1. Acessar o site; 2. Selecionar a categoria "Exames laboratoriais"; 3. Selecionar a categoria "Vídeos Educativos"; 4. Escolher um exame; 5. Clicar para visualizar a explicação (vídeo) |
| Critérios de êxito | O vídeo deve abrir corretamente, exibindo o conteúdo sem erros |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

|Caso de Teste    | CT-03 - Jogos funcionando |
|:---|:---|
| Requisitos Associados | RF-01, RF-06 |
| Objetivo do Teste | Verificar se o usuário consegue acessar os jogos |
| Passos |  1. Acessar o site; 2. Selecionar a categoria "Exames laboratoriais" ; 3. Selecionar a categoria "Jogos Interativos"; 4. Entrar no jogo; |
| Critérios de êxito | O jogo deve abrir e permitir interação sem falhas |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

|Caso de Teste    | CT-04 - Troca de categoria de exame |
|:---|:---|
| Requisitos Associados | RF-03 |
| Objetivo do Teste | Verificar se o usuário consegue trocar entre exames laboratoriais e de imagem |
| Passos | 1. Entrar no site; 2. Acessar "Exames laboratoriais"; 3. Voltar; 4. Acessar "Exames de imagem" |
| Critérios de êxito | As páginas devem abrir corretamente e exibir os conteúdos correspondentes |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

|Caso de Teste    | CT-10 - Acompanhamento do Responsável |
|:---|:---|
| Requisitos Associados | RF-02 |
| Objetivo do Teste | Verificar se o responsável consegue acompanhar/participar da explicação junto à criança |
| Passos | 1. Acessar o site como responsável; 2. Selecionar o exame da criança; 3. Verificar se há opção de visualização conjunta ou modo "acompanhado"; 4. Navegar pela explicação junto com a criança |
| Critérios de êxito | O responsável deve conseguir acompanhar a explicação sem dificuldade, com conteúdo claro para adultos e crianças simultaneamente |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

|Caso de Teste    | CT-11 - Resumo e FAQ para o Responsável |
|:---|:---|
| Requisitos Associados | RF-07 |
| Objetivo do Teste | Verificar se o responsável consegue acessar um resumo do preparo do exame e um FAQ antes da consulta |
| Passos | 1. Acessar o site como responsável; 2. Selecionar o exame agendado; 3. Buscar a seção de resumo/FAQ; 4. Ler as informações disponíveis |
| Critérios de êxito | O resumo e o FAQ devem estar visíveis, completos e de fácil compreensão |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

|Caso de Teste    | CT-12 - Integração com o agendamento |
|:---|:---|
| Requisitos Associados | RF-08 |
| Objetivo do Teste | Verificar se a explicação exibida corresponde ao exame agendado pelo paciente na Clínica Pequenos Passos |
| Passos | 1. Simular um exame agendado (ex: tomografia); 2. Acessar o site vinculado ao agendamento; 3. Verificar se o conteúdo exibido é o correspondente ao exame marcado |
| Critérios de êxito | O sistema deve exibir automaticamente a explicação certa, sem exigir busca manual pelo tipo de exame |
| Responsável por elaborar o caso de Teste | Clara Freitas de Oliveira |

