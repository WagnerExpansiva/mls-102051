/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/openShift.defs.ts" enhancement="_blank"/>

export const openShiftController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "openShift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "shiftLifecycle",
    "controllerName": "OpenShiftController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowOpenShiftHandler",
        "command": "openShift",
        "usecaseRef": "openShift",
        "inputTypeName": "OpenShiftInput",
        "kind": "create",
        "inputContract": [
          {
            "inputId": "notes",
            "fieldRef": "Shift.notes",
            "required": false,
            "source": "userInput",
            "description": "Observações gerais opcionais sobre o turno, informadas pelo gerente ao abrir."
          },
          {
            "inputId": "shiftId",
            "fieldRef": "Shift.shiftId",
            "required": true,
            "source": "systemDefault",
            "description": "Identificador único do turno, gerado automaticamente pelo sistema."
          },
          {
            "inputId": "status",
            "fieldRef": "Shift.status",
            "required": true,
            "source": "systemDefault",
            "description": "Situação inicial do turno, definida como 'open' no momento da criação."
          },
          {
            "inputId": "openedAt",
            "fieldRef": "Shift.openedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora de abertura do turno, definida automaticamente como o momento atual."
          },
          {
            "inputId": "openedBy",
            "fieldRef": "Shift.openedBy",
            "required": true,
            "source": "actorSession",
            "description": "Identificador do gerente que abriu o turno, obtido da sessão ativa."
          },
          {
            "inputId": "createdAt",
            "fieldRef": "Shift.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora de criação do registro, definida automaticamente como o momento atual."
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "Shift.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora da última atualização do registro, definida automaticamente como o momento atual."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Shift.shiftId",
            "source": "systemDefault",
            "originRef": "systemDefault.uuid",
            "description": "O backend gera um UUID para o novo turno no momento da criação."
          },
          {
            "targetRef": "Shift.status",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "O backend define o status como 'open' fixamente na criação do turno."
          },
          {
            "targetRef": "Shift.openedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "O backend registra o timestamp atual do servidor como data e hora de abertura do turno."
          },
          {
            "targetRef": "Shift.openedBy",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "O backend obtém o identificador do gerente autenticado a partir da sessão ativa."
          },
          {
            "targetRef": "Shift.createdAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "O backend registra o timestamp atual do servidor como data de criação do registro."
          },
          {
            "targetRef": "Shift.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "O backend registra o timestamp atual do servidor como data da última atualização do registro."
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
            "Shift.shiftId",
            "Shift.status",
            "Shift.openedAt",
            "Shift.openedBy"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.shiftLifecycle.openShift",
        "handlerName": "cafeFlowOpenShiftHandler"
      }
    ]
  }
} as const;

export default openShiftController;

export const pipeline = [
  {
    "id": "openShift__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/openShift.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/openShift.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/openShift.d.ts"
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
