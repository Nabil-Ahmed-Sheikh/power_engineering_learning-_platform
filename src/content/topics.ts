import type { Topic } from "./types";

export const topics: Topic[] = [
  // ---------- fundamentals ----------
  {
    slug: "ac-circuit-fundamentals-phasors",
    title: "AC Circuit Fundamentals, Phasors & Three-Phase Systems",
    category: "fundamentals",
    description:
      "Sinusoidal steady-state analysis, phasor representation, impedance, and why power systems use balanced three-phase circuits.",
    order: 1,
  },
  {
    slug: "per-unit-system",
    title: "The Per-Unit System",
    category: "fundamentals",
    description:
      "Normalizing voltages, currents, and impedances to simplify analysis of multi-voltage-level power systems.",
    order: 2,
  },
  {
    slug: "real-reactive-apparent-power",
    title: "Real, Reactive & Apparent Power",
    category: "fundamentals",
    description:
      "The power triangle, power factor, and how active and reactive power flow through a network.",
    order: 3,
  },
  {
    slug: "symmetrical-components",
    title: "Symmetrical Components",
    category: "fundamentals",
    description:
      "Decomposing unbalanced three-phase quantities into positive, negative, and zero sequence networks.",
    order: 4,
  },

  // ---------- components ----------
  {
    slug: "synchronous-generators-excitation",
    title: "Synchronous Generators & Excitation Systems",
    category: "components",
    description:
      "Construction, equivalent circuit, reactances, and excitation control of synchronous machines.",
    order: 1,
  },
  {
    slug: "power-transformers",
    title: "Power Transformers",
    category: "components",
    description:
      "Equivalent circuits, vector groups, tap changers, and per-unit modeling of power transformers.",
    order: 2,
  },
  {
    slug: "transmission-line-parameters",
    title: "Transmission Line Parameters & Models",
    category: "components",
    description:
      "Resistance, inductance, capacitance, and the short/medium/long line models used in system studies.",
    order: 3,
  },
  {
    slug: "distribution-systems-equipment",
    title: "Distribution Systems & Equipment",
    category: "components",
    description:
      "Radial and networked distribution topologies, feeders, regulators, capacitor banks, and reclosers.",
    order: 4,
  },
  {
    slug: "circuit-breakers-switchgear",
    title: "Circuit Breakers, Switchgear & Substation Equipment",
    category: "components",
    description:
      "Interruption technologies, ratings, switchgear arrangements, insulation coordination, and substation apparatus.",
    order: 5,
  },

  // ---------- analysis ----------
  {
    slug: "load-flow-studies",
    title: "Load Flow / Power Flow Studies",
    category: "analysis",
    description:
      "Bus classification, the power flow equations, Gauss-Seidel vs Newton-Raphson methods, and N-1 contingency analysis.",
    order: 1,
  },
  {
    slug: "short-circuit-fault-analysis",
    title: "Short-Circuit / Fault Analysis",
    category: "analysis",
    description:
      "Calculating fault currents for three-phase, line-to-ground, line-to-line, and double-line-to-ground faults.",
    order: 2,
  },
  {
    slug: "power-system-stability",
    title: "Power System Stability",
    category: "analysis",
    description:
      "Transient and voltage stability, the swing equation, and the equal area criterion.",
    order: 3,
  },
  {
    slug: "economic-dispatch-unit-commitment",
    title: "Economic Dispatch & Unit Commitment",
    category: "analysis",
    description:
      "Optimizing generation cost subject to system constraints, and scheduling units over time.",
    order: 4,
  },
  {
    slug: "power-quality-harmonics",
    title: "Power Quality & Harmonics",
    category: "analysis",
    description:
      "Voltage sags, flicker, harmonic distortion, and mitigation techniques including IEEE 519 limits.",
    order: 5,
  },

  // ---------- protection ----------
  {
    slug: "protective-relaying-fundamentals",
    title: "Protective Relaying Fundamentals",
    category: "protection",
    description:
      "Protection philosophy, CT/PT basics, ANSI device numbers, and the requirements of a good protection scheme.",
    order: 1,
  },
  {
    slug: "overcurrent-distance-protection",
    title: "Overcurrent & Distance Protection",
    category: "protection",
    description:
      "Time-overcurrent coordination and impedance-based distance relaying for lines and feeders.",
    order: 2,
  },
  {
    slug: "differential-bus-protection",
    title: "Differential & Bus Protection",
    category: "protection",
    description:
      "Unit protection principles applied to transformers, generators, buses, and feeders.",
    order: 3,
  },
  {
    slug: "protection-coordination-arc-flash",
    title: "Protection Coordination & Arc Flash",
    category: "protection",
    description:
      "Time-current coordination studies and arc flash hazard analysis for personnel safety.",
    order: 4,
  },

  // ---------- renewables ----------
  {
    slug: "wind-power-integration",
    title: "Wind Power Integration",
    category: "renewables",
    description:
      "Wind turbine generator types, fault behavior, and grid integration challenges for wind plants.",
    order: 1,
  },
  {
    slug: "solar-pv-integration",
    title: "Solar PV Integration",
    category: "renewables",
    description:
      "Inverter-based resource behavior, PV plant modeling, and interconnection considerations for solar.",
    order: 2,
  },
  {
    slug: "energy-storage-systems",
    title: "Energy Storage Systems",
    category: "renewables",
    description:
      "Battery energy storage system architecture, applications, and grid services.",
    order: 3,
  },
  {
    slug: "grid-codes-interconnection",
    title: "Grid Codes & Interconnection Requirements",
    category: "renewables",
    description:
      "Ride-through requirements, reactive capability, SCADA/PMU visibility, and the standards governing generator interconnection.",
    order: 4,
  },
];
