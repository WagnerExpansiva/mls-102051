# CafeFlow

Module: `cafeFlow`
Language: pt-BR

## Problem
Pequenas cafeterias e lanchonetes precisam de uma ferramenta unificada para atender pedidos com agilidade, coordenar a cozinha em tempo real e controlar o estoque de forma simples, sem a complexidade de sistemas ERP ou PDV enterprise. A ausência de integração entre cardápio, pedidos e estoque gera retrabalho, falta de ingredientes durante o serviço e dificuldade de acompanhar o desempenho do dia.

## Presumed Actors
- Atendente / Caixa (`atendente`): Lança pedidos rapidamente no POS, seleciona mesa ou takeout e acompanha status para entrega ao cliente.
- Cozinheiro (`cozinheiro`): Visualiza pedidos em preparo, atualiza status da cozinha e sinaliza quando o item está pronto.
- Gerente / Proprietário (`gerente`): Cadastra itens do cardápio e estoque, abre e fecha turnos, consulta dashboard e utiliza o assistente IA para análise de vendas.

## Scope In
- Cadastro de itens do cardápio com categoria, preço e vínculo a ingredientes de estoque
- Cadastro de itens de estoque com quantidade atual e alerta de mínimo
- Lançamento de pedidos no POS (mesa ou takeout) com itens do cardápio
- Acompanhamento de status do pedido para coordenação da cozinha
- Dashboard com vendas do dia, itens mais vendidos e alertas de estoque baixo
- Abertura e fechamento de turno diário com relatório de fechamento
- Assistente IA com resumo de vendas do dia e sugestões de promoção baseadas nos últimos 7 dias

## Scope Out
- Integração com maquininhas de cartão ou gateways de pagamento
- Mapa visual de mesas do salão
- Delivery com rastreamento de entregadores
- Emissão fiscal ou integração contábil
- Gestão de funcionários, folha de pagamento ou CRM de clientes
- Compras e gestão de fornecedores

## Open Questions
- [assumed] O estoque é decrementado no lançamento do pedido ou na entrega? Default: No lançamento do pedido, para simplificar o controle e evitar vendas sem estoque.
- [assumed] O fechamento de turno zera o caixa ou apenas registra o valor apurado para conferência? Default: Registra o valor apurado para conferência do gerente, sem conciliação bancária.
- [assumed] Há necessidade de suportar variantes de item (ex: tamanho P, M, G) ou apenas itens simples? Default: Apenas itens simples nesta fase; variantes podem ser cadastradas como itens separados.

## Assumptions
- A plataforma fornece autenticação, autorização, isolamento multi-tenant e proxy LLM; esses recursos não serão recriados.
- O fluxo de status do pedido é: recebido → em preparo → pronto → entregue.
- O alerta de estoque baixo é calculado comparando a quantidade atual ao mínimo configurado por item.
- O assistente IA consome dados agregados de pedidos e estoque disponibilizados pelo domínio.
- O relatório de fechamento de turno consolida pedidos pagos no período do turno.

