export const CATEGORY_META: Record<
  string,
  { label: string; description: string }
> = {
  fundamentals: {
    label: "Fundamentals",
    description: "AC circuits, phasors, per-unit, and power basics.",
  },
  components: {
    label: "Components",
    description: "Generators, transformers, lines, and switchgear.",
  },
  analysis: {
    label: "Analysis",
    description: "Load flow, faults, stability, and economic dispatch.",
  },
  protection: {
    label: "Protection",
    description: "Relaying, coordination, and fault clearing.",
  },
  renewables: {
    label: "Renewables & Smart Grid",
    description: "Wind, solar, storage, and grid modernization.",
  },
};

export const CATEGORY_ORDER = [
  "fundamentals",
  "components",
  "analysis",
  "protection",
  "renewables",
];
