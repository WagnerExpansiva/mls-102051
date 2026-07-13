/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/openShift.defs.ts" enhancement="_blank"/>

export const openShiftUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "openShift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "openShift",
    "ports": [
      "Shift"
    ],
    "functions": [
      {
        "functionName": "openShift",
        "inputTypeName": "OpenShiftInput",
        "outputTypeName": "OpenShiftOutput",
        "input": [
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "Shift",
            "description": "Observações gerais opcionais sobre o turno, informadas pelo gerente ao abrir."
          }
        ],
        "output": [
          {
            "name": "shiftId",
            "type": "string",
            "required": true,
            "ofEntity": "Shift",
            "description": "Identificador único do turno criado."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Shift",
            "description": "Situação do turno, sempre 'open' após a criação."
          },
          {
            "name": "openedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Shift",
            "description": "Data e hora de abertura do turno."
          },
          {
            "name": "openedBy",
            "type": "string",
            "required": true,
            "ofEntity": "Shift",
            "description": "Identificador do gerente que abriu o turno."
          }
        ],
        "ports": [
          "Shift"
        ],
        "rulesApplied": [
          "singleOpenShift"
        ],
        "transactional": true,
        "steps": [
          "1. Resolve o identificador do gerente autenticado a partir de ctx.sessionContext.actorId (originRef: actorSession.actorId).",
          "2. Gera um novo UUID para shiftId via ctx.idGenerator.",
          "3. Obtém o timestamp atual do servidor via ctx.clock.now() para openedAt, createdAt e updatedAt.",
          "4. Consulta a porta Shift (list/find) para verificar se já existe algum Shift com status igual a 'open'.",
          "5. Aplica a regra singleOpenShift: se existir um Shift com status 'open', lança erro de validação com a regra 'singleOpenShift' impedindo a criação de um novo turno.",
          "6. Se não houver Shift aberto, constrói o novo Shift com shiftId gerado, status='open', openedAt=now, openedBy=actorId, notes (se fornecido), createdAt=now, updatedAt=now, e campos closedAt, closedBy, totalApurado como nulos.",
          "7. Persiste o novo Shift através da porta Shift dentro de uma transação única (ctx.data).",
          "8. Retorna shiftId, status, openedAt e openedBy do turno recém-criado."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default openShiftUsecase;

export const pipeline = [
  {
    "id": "openShift__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/openShift.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/openShift.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shift.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
