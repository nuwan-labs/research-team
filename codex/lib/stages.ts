export const STAGES = [
  { id: 'QUESTION', label: 'Question' },
  { id: 'HYPOTHESES', label: 'Hypotheses' },
  { id: 'LITERATURE', label: 'Literature' },
  { id: 'METHODS', label: 'Methods' },
  { id: 'ANALYSIS', label: 'Analysis' },
  { id: 'RISKS', label: 'Risks' },
  { id: 'COMPLIANCE', label: 'Compliance' },
  { id: 'REPORT', label: 'Report' }
] as const;

export type StageId = (typeof STAGES)[number]['id'];

export const stageLabel = (id: StageId) => {
  const found = STAGES.find((stage) => stage.id === id);
  return found ? found.label : id;
};
