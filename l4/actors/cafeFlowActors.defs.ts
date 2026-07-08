/// <mls fileReference="_102051_/l4/actors/cafeFlowActors.defs.ts" enhancement="_blank"/>

export const cafeFlowActors = {
  "moduleName": "cafeFlow",
  "actors": [
    {
      "actorId": "atendente",
      "title": "Atendente / Caixa",
      "description": "Lança pedidos rapidamente no POS, seleciona mesa ou takeout e acompanha status para entrega ao cliente.",
      "roleScope": "cafeFlow:atendente"
    },
    {
      "actorId": "cozinheiro",
      "title": "Cozinheiro",
      "description": "Visualiza pedidos em preparo, atualiza status da cozinha e sinaliza quando o item está pronto.",
      "roleScope": "cafeFlow:cozinheiro"
    },
    {
      "actorId": "gerente",
      "title": "Gerente / Proprietário",
      "description": "Cadastra itens do cardápio e estoque, abre e fecha turnos, consulta dashboard e utiliza o assistente IA para análise de vendas.",
      "roleScope": "cafeFlow:gerente"
    }
  ]
} as const;

export default cafeFlowActors;
