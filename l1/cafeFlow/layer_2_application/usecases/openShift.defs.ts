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
          "1. Query the Shift port for any existing Shift with status 'open' (singleOpenShift rule). If one is found, reject the operation with a validation error referencing rule 'singleOpenShift'.",
          "2. Generate a new UUID for shiftId via ctx.idGenerator.",
          "3. Resolve openedBy from ctx.sessionContext.actorId (actorSession).",
          "4. Set status = 'open', openedAt = ctx.clock.now(), createdAt = ctx.clock.now(), updatedAt = ctx.clock.now().",
          "5. Build the Shift aggregate with the provided notes (optional) and all resolved fields; closedAt, closedBy and totalApurado remain null.",
          "6. Persist the Shift through its port inside a single transaction (ctx.data transaction wrapper).",
          "7. Return shiftId, status, openedAt, openedBy."
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
