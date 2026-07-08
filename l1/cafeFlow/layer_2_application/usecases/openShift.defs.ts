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
            "description": "Observações gerais opcionais sobre o turno, informadas pelo gerente ao abrir.",
            "ofEntity": "Shift"
          }
        ],
        "output": [
          {
            "name": "shiftId",
            "type": "string",
            "required": true,
            "description": "Identificador único do turno criado.",
            "ofEntity": "Shift"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "description": "Situação do turno após abertura ('open').",
            "ofEntity": "Shift"
          },
          {
            "name": "openedAt",
            "type": "string",
            "required": true,
            "description": "Data e hora de abertura do turno.",
            "ofEntity": "Shift"
          },
          {
            "name": "openedBy",
            "type": "string",
            "required": true,
            "description": "Identificador do gerente que abriu o turno.",
            "ofEntity": "Shift"
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
          "1. Resolve system defaults: generate shiftId via ctx.idGenerator, set status='open', openedAt=ctx.clock.now(), createdAt=ctx.clock.now(), updatedAt=ctx.clock.now().",
          "2. Resolve openedBy from ctx.sessionContext.actorId (the authenticated manager).",
          "3. Apply rule singleOpenShift: query the Shift port for any existing Shift with status='open'. If one exists, reject the operation with a validation error referencing rule 'singleOpenShift'.",
          "4. Build the Shift aggregate with shiftId, status='open', openedAt, openedBy, notes (if provided), createdAt, updatedAt; leave closedAt, closedBy and totalApurado null.",
          "5. Persist the Shift via the Shift port inside a single transaction (ctx.data transaction wrapper).",
          "6. Return shiftId, status, openedAt, openedBy."
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
