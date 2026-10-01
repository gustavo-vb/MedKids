# Especificação do Projeto

## Perfis de Usuários

<table>
<tbody>
<tr align=center>
<th colspan="2">Jorge Nogueira Santos </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Criança de 5 anos que precisa realizar um exame de rotina com coleta de sangue, mas tem medo de agulhas e injeções.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Compreender o exame de forma antecipada e tranquila, reduzindo a ansiedade relacionada ao medo de agulhas na hora da coleta de sangue.</td>
</tr>
</tbody>
</table>

<table>
<tbody>
<tr align=center>
<th colspan="2">Manuella Guillera da Silva </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Criança de 3 anos de idade, autista, tem medo de espaços apertados e barulhos altos.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Manuella precisa realizar uma tomografia por conta da suspeita de pequenos tumores. Por ter sensibilidade sensorial ligada ao TEA, é importante explicar de maneira lúdica e com controle de estímulos (sons e imagens) que a tomografia é um exame seguro e que não vai machucá-la.</td>
</tr>
</tbody>
</table>

<table>
<tbody>
<tr align=center>
<th colspan="2">Fernanda Nogueira Santos </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Mãe de Jorge, 34 anos, acompanha o filho durante o exame de rotina com coleta de sangue.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Sentir-se preparada para ajudar Jorge a compreender o exame, com acesso a um resumo simples do procedimento e a respostas para dúvidas comuns antes da consulta.</td>
</tr>
</tbody>
</table>

<table>
<tbody>
<tr align=center>
<th colspan="2">Clínica Pequenos Passos </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Clínica infantil fictícia especializada em exames de rotina e de imagem para crianças e adolescentes.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Agilizar o atendimento vinculando o conteúdo explicativo ao exame agendado, além de garantir segurança e privacidade dos dados dos pacientes conforme a LGPD.</td>
</tr>
</tbody>
</table>

## Histórias de Usuários

|EU COMO... `QUEM`   | QUERO/PRECISO ... `O QUE` |PARA ... `PORQUE`                 |
|--------------------|---------------------------|----------------------------------|
| Clínica Pequenos Passos | Possibilitar a compreensão dos pacientes em relação aos exames| Facilitar e agilizar o atendimento |
| Paciente (crianças) | Realizar os procedimentos médicos sem sentir medo, ou crises | Verificar sua saúde |
| Fernanda (Responsável) | Tranquilizar os pacientes | Contribuír para a realização dos exames |

## Requisitos do Projeto

### Requisitos Funcionais

|ID    | Descrição                | Origem (Perfil)  | Prioridade |
|-------|---------------------------------|--------------------|----|
| RF-01 | Oferecer recursos visuais (animações, ilustrações ou personagens) para explicar os exames | Jorge / Manuella | Alta |
| RF-02 | Permitir que responsáveis acompanhem ou auxiliem na explicação | Fernanda | Alta |
| RF-03 | Disponibilizar explicações específicas para diferentes tipos de exame | Jorge / Manuella | Média |
| RF-04 | Reduzir o medo da criança por meio de linguagem amigável e interativa | Jorge / Manuella | Alta |
| RF-05 | Possibilitar o uso em dispositivos móveis (tablet/celular) | Fernanda / Clínica Pequenos Passos | Média |
| RF-06 | Exibir explicações simples e lúdicas sobre exames médicos (ex: sangue, tomografia) | Jorge / Manuella | Alta |
| RF-07 | Permitir que o responsável visualize um resumo do preparo do exame e um FAQ simples antes da consulta | Fernanda | Média |
| RF-08 | Integrar o conteúdo lúdico ao agendamento, vinculando a explicação ao exame específico marcado pelo paciente | Clínica Pequenos Passos | Média |

**Prioridade: Alta / Média / Baixa.*

### Requisitos não Funcionais

|ID      | Descrição               | Origem (Perfil) | Prioridade |
|--------|-------------------------|--------------------|----|
| RNF-01 | Interface deve ser intuitiva e fácil de usar para crianças | Jorge / Manuella | Alta |
| RNF-02 | O sistema deve ser acessível (cores suaves, fontes legíveis, sem estímulos agressivos) | Manuella | Alta |
| RNF-03 | Sons e animações devem ser opcionais (principalmente para crianças sensíveis) | Manuella | Média |
| RNF-04 | Garantir segurança e privacidade dos dados dos usuários (LGPD) | Clínica Pequenos Passos | Média |
| RNF-05 | O sistema deve funcionar offline ou com baixa conexão | Clínica Pequenos Passos | Baixa |
| RNF-06 | Compatibilidade com diferentes dispositivos (celular, tablet, computador) | Fernanda / Clínica Pequenos Passos | Média |

**Prioridade: Alta / Média / Baixa.*
