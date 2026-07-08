# E7 — Validation & Closing: cafeFlow

- result: PASSED (0 error(s), 1 warning(s))
- entities: 11 / workflows: 3 / operations: 15 / workspaces: 6
- full machine report: `l4/trace/behavior-health-report.json`

## Warnings (do not block)

- `capability.multiowned` capability 'orderLifecycle' is owned by 2 workspaces (kitchenQueue, posWorkspace)

## Closing artifacts

- `l4/cafeFlow/module.defs.ts` — module block + designContext + ontology index + relationships + approvedArtifacts
- `l5/cafeFlow/todoFrontend.defs.ts` / `l5/cafeFlow/todoBackend.defs.ts` — generation-status source for Stage 2/3
- `l5/cafeFlow/process.defs.ts` — run record + handoff notes

## Next steps

- **Generate frontend experience (@@changeFrontend)** — Materialize l2 pages from the l4 behavior model.
- **Generate backend (@@changeBackend)** — Materialize l1 hexagonal backend from the l4 behavior model.
