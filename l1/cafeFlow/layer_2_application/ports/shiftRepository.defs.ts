/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.defs.ts" enhancement="_blank"/>

export const shiftRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "ShiftRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Shift",
    "interfaceName": "IShiftRepository",
    "methods": [
      {
        "name": "getById",
        "returns": "Shift",
        "params": [
          "shiftId: ShiftId"
        ]
      },
      {
        "name": "list",
        "returns": "Shift[]",
        "params": [
          "filter: ShiftFilter"
        ]
      },
      {
        "name": "save",
        "returns": "void",
        "params": [
          "shift: Shift"
        ]
      },
      {
        "name": "findByEmployeeId",
        "returns": "Shift[]",
        "params": [
          "employeeId: EmployeeId"
        ]
      },
      {
        "name": "findByPeriod",
        "returns": "Shift[]",
        "params": [
          "start: Date",
          "end: Date"
        ]
      },
      {
        "name": "findOpenShifts",
        "returns": "Shift[]",
        "params": []
      }
    ]
  }
} as const;

export default shiftRepositoryPort;

export const pipeline = [
  {
    "id": "shiftRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shift.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryPort.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
