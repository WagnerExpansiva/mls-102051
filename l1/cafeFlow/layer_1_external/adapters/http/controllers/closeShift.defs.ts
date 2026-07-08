/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/closeShift.defs.ts" enhancement="_blank"/>

export const closeShiftController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "closeShift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "shiftLifecycle",
    "controllerName": "CloseShiftController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowCloseShiftHandler",
        "command": "closeShift",
        "usecaseRef": "closeShift",
        "inputTypeName": "CloseShiftInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "totalApurado",
            "fieldRef": "Shift.totalApurado",
            "required": true,
            "source": "userInput",
            "description": "Valor total apurado no fechamento do turno, informado pelo gerente para conferência."
          },
          {
            "inputId": "notes",
            "fieldRef": "Shift.notes",
            "required": false,
            "source": "userInput",
            "description": "Observações gerais sobre o turno, opcionais."
          },
          {
            "inputId": "shiftId",
            "fieldRef": "Shift.shiftId",
            "required": true,
            "source": "activeLifecycleInstance",
            "description": "Identificador do turno atualmente aberto que será fechado."
          },
          {
            "inputId": "closedBy",
            "fieldRef": "Shift.closedBy",
            "required": true,
            "source": "actorSession",
            "description": "Identificador do gerente que está fechando o turno."
          },
          {
            "inputId": "closedAt",
            "fieldRef": "Shift.closedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora do fechamento do turno, definida automaticamente pelo sistema."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Shift.shiftId",
            "source": "activeLifecycleInstance",
            "originRef": "Shift.shiftId",
            "description": "O backend localiza o único Shift com status 'open' (turno ativo) e utiliza seu shiftId como alvo do fechamento."
          },
          {
            "targetRef": "Shift.closedBy",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "O backend obtém o identificador do gerente autenticado a partir da sessão ativa."
          },
          {
            "targetRef": "Shift.closedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "O backend define a data e hora de fechamento como o timestamp atual no momento da confirmação."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "Shift",
          "keyField": "Shift.shiftId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "Shift.status",
            "Shift.closedAt",
            "Shift.closedBy",
            "Shift.totalApurado",
            "Shift.notes"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.shiftLifecycle.closeShift",
        "handlerName": "cafeFlowCloseShiftHandler"
      }
    ]
  }
} as const;

export default closeShiftController;

export const pipeline = [
  {
    "id": "closeShift__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/closeShift.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/closeShift.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/closeShift.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
