# ReservaLab — Sistema de Reserva de Laboratórios

Protótipo web desenvolvido para a atividade **Do UML ao Software**, da disciplina Maturidade em Desenvolvimento de Software.

## Objetivo

Permitir que um professor consulte laboratórios, solicite uma reserva e acompanhe as reservas realizadas durante a execução da página.

## Tecnologias

- HTML5 — estrutura e formulário.
- CSS3 — identidade visual, layout e responsividade.
- JavaScript — dados iniciais, validações, confirmação e listagem dinâmica.

## Funcionalidades e requisitos

| Requisito | Implementação |
|---|---|
| RF01 — Consultar laboratórios | Exibe nome, capacidade e situação dos três laboratórios. |
| RF02 — Realizar reserva | Formulário com professor, matrícula, laboratório, data, horário e finalidade. |
| RF03 — Validar reserva | Impede envio com campos obrigatórios vazios e valida disponibilidade, capacidade e data. |
| RF04 — Confirmar reserva | Exibe mensagem de sucesso após a confirmação. |
| RF05 — Listar reservas | Mostra as reservas confirmadas durante a execução da página. |
| RNF01 — Usabilidade | Seções identificadas e formulário organizado. |
| RNF02 — Responsividade | Layout adaptável a computadores e celulares. |

## Regra do requisito adicional

Para aulas regulares, laboratórios com capacidade inferior a 30 alunos não podem ser reservados. A regra está aplicada tanto no seletor quanto na validação JavaScript. Assim, o Laboratório 03 (25 alunos) não pode ser reservado, mesmo aparecendo como disponível no conjunto de dados.

O Laboratório 02 também não pode ser reservado porque está indisponível. No conjunto inicial, somente o Laboratório 01 atende às duas condições.

## Estrutura do projeto

```text
reserva-laboratorios/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Como executar

1. Extraia os arquivos do projeto.
2. Abra a pasta `reserva-laboratorios` no Visual Studio Code.
3. Abra o arquivo `index.html` no navegador. Também é possível usar a extensão Live Server.
4. Preencha os dados do professor e da reserva e clique em **Confirmar solicitação**.

## Arquitetura e limitações

A solução é um front-end estático, executado diretamente no navegador. Os laboratórios estão definidos em um array JavaScript e as reservas ficam em memória durante a execução da página. Não há backend, banco de dados ou autenticação real, conforme as restrições da atividade. Ao recarregar a página, a lista de reservas é reiniciada.

## Mudança de requisito — análise de impacto

- **Requisitos afetados:** RF02 (realizar reserva) e RF03 (validar reserva); RF01 também fornece a capacidade exibida para orientar a escolha.
- **Mudança na interface:** opção de laboratório com capacidade inferior a 30 aparece desabilitada no seletor, com indicação do motivo.
- **Nova validação:** o JavaScript verifica a capacidade mínima de 30 alunos antes de confirmar a reserva.
- **Teste:** tentar reservar o Laboratório 03, com 25 alunos. O sistema deve impedir a confirmação e informar que a capacidade é insuficiente. O Laboratório 01, com 30 alunos e disponível, deve ser aceito.

## Observação

Este projeto é um protótipo acadêmico e não realiza reservas reais em infraestrutura institucional.
