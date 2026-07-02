import type { GlossaryTerm } from "./types";

export const glossary: GlossaryTerm[] = [
  // ---------- fundamentals ----------
  {
    term: "Per-unit (p.u.)",
    definition:
      "A normalized quantity expressed as a fraction of a chosen base value (e.g., voltage, power, impedance), used to simplify multi-voltage-level system calculations and eliminate transformer turns ratios.",
    category: "fundamentals",
  },
  {
    term: "Phasor",
    definition:
      "A complex number representing the magnitude and phase angle of a sinusoidal quantity at a fixed frequency, used to convert time-domain AC circuit analysis into complex algebra.",
    category: "fundamentals",
  },
  {
    term: "Power factor",
    definition:
      "The ratio of real power to apparent power (P/S), equal to cosθ where θ is the angle between voltage and current; indicates how effectively current is converted into useful work.",
    category: "fundamentals",
  },
  {
    term: "kVAR",
    definition:
      "Kilovolt-amperes reactive, a unit of reactive power (Q), representing power that oscillates between source and load to sustain magnetic and electric fields without doing net work.",
    category: "fundamentals",
  },
  {
    term: "Symmetrical components",
    definition:
      "A mathematical technique (Fortescue's theorem) decomposing any unbalanced set of three-phase phasors into positive, negative, and zero sequence balanced sets for simplified analysis.",
    category: "fundamentals",
  },
  {
    term: "Positive sequence",
    definition:
      "The balanced sequence component with normal (a-b-c) phase rotation, representing the standard balanced operating condition of a three-phase system.",
    category: "fundamentals",
  },
  {
    term: "Negative sequence",
    definition:
      "The balanced sequence component with reversed (a-c-b) phase rotation, whose magnitude indicates the degree of unbalance in a three-phase system.",
    category: "fundamentals",
  },
  {
    term: "Zero sequence",
    definition:
      "The sequence component with all three phasors in phase (no rotation); it can only flow if a grounded neutral or earth return path exists.",
    category: "fundamentals",
  },
  {
    term: "Line-to-line voltage",
    definition:
      "The voltage measured between any two phase conductors; for a balanced wye system it equals √3 times the line-to-neutral voltage.",
    category: "fundamentals",
  },
  {
    term: "Impedance (Z)",
    definition:
      "The complex ratio of voltage to current in an AC circuit, Z = R + jX, combining resistance (real power dissipation) and reactance (reactive power exchange).",
    category: "fundamentals",
  },
  {
    term: "X/R ratio",
    definition:
      "The ratio of reactance to resistance in a circuit, which determines the magnitude and decay rate of the DC offset component in fault current following a disturbance.",
    category: "fundamentals",
  },
  {
    term: "Slip",
    definition:
      "The fractional difference between synchronous speed and actual rotor speed in an induction machine, s = (Ns - N)/Ns, which determines the machine's torque and current characteristics.",
    category: "fundamentals",
  },
  {
    term: "Synchronous speed",
    definition:
      "The rotational speed of the magnetic field in an AC machine, given by N = 120f/p, where f is frequency in Hz and p is the number of poles.",
    category: "fundamentals",
  },
  {
    term: "Power triangle",
    definition:
      "A right-triangle representation of complex power with real power (P) and reactive power (Q) as legs and apparent power (S) as the hypotenuse.",
    category: "fundamentals",
  },
  {
    term: "Ferranti effect",
    definition:
      "The rise in receiving-end voltage above sending-end voltage on a lightly loaded or open-ended long transmission line, caused by capacitive charging current dominating over load current.",
    category: "fundamentals",
  },

  // ---------- components ----------
  {
    term: "Vector group",
    definition:
      "Standardized notation (e.g., Dyn11) describing a transformer's winding connections and phase displacement in 30-degree clock-hour increments between high- and low-voltage windings.",
    category: "components",
  },
  {
    term: "Load tap changer (LTC)",
    definition:
      "A motor-driven mechanism that adjusts a transformer's effective turns ratio while it remains energized and carrying load, used for automatic voltage regulation.",
    category: "components",
  },
  {
    term: "Autotransformer",
    definition:
      "A transformer in which the high- and low-voltage windings are electrically connected (sharing part of a winding), reducing cost and losses but lacking galvanic isolation.",
    category: "components",
  },
  {
    term: "Subtransient reactance (Xd\")",
    definition:
      "A synchronous generator's effective reactance in the first few cycles after a disturbance, the lowest of the three characteristic reactances, used for close-in fault duty calculations.",
    category: "components",
  },
  {
    term: "Transient reactance (Xd')",
    definition:
      "A synchronous generator's effective reactance from roughly a few hundred milliseconds to a few seconds after a disturbance, used for transient stability studies.",
    category: "components",
  },
  {
    term: "Synchronous reactance (Xd)",
    definition:
      "A synchronous generator's steady-state effective reactance once all transient induced currents have decayed, used for steady-state load flow and voltage regulation studies.",
    category: "components",
  },
  {
    term: "Generator capability curve",
    definition:
      "A plot (D-curve) of a synchronous generator's safe real/reactive power operating region, bounded by stator current, rotor current, and underexcitation stability limits.",
    category: "components",
  },
  {
    term: "Excitation system",
    definition:
      "The system that supplies and controls DC current to a synchronous generator's rotor field winding, the primary means of controlling terminal voltage and reactive power output.",
    category: "components",
  },
  {
    term: "Power System Stabilizer (PSS)",
    definition:
      "A supplementary excitation control loop that modulates field voltage based on speed or power deviation to damp low-frequency electromechanical oscillations.",
    category: "components",
  },
  {
    term: "Surge impedance loading (SIL)",
    definition:
      "The power a transmission line delivers when terminated in its own characteristic impedance, at which point the line's reactive generation and absorption balance and voltage profile is flat.",
    category: "components",
  },
  {
    term: "Recloser",
    definition:
      "A self-contained overcurrent interrupting device on a distribution feeder that automatically opens on fault current, then recloses after a timed interval to clear temporary faults.",
    category: "components",
  },
  {
    term: "Corona",
    definition:
      "A localized electrical discharge from a high-voltage conductor that ionizes the surrounding air when surface electric field stress exceeds air's breakdown strength, causing audible noise, radio interference, and power loss.",
    category: "components",
  },
  {
    term: "Basic Insulation Level (BIL)",
    definition:
      "The standard impulse withstand voltage that equipment insulation must survive without flashover or damage, used as the reference for insulation coordination.",
    category: "components",
  },
  {
    term: "Surge arrester",
    definition:
      "A protective device (typically metal-oxide varistor) that limits transient overvoltages from lightning or switching to a level safely below protected equipment's BIL.",
    category: "components",
  },
  {
    term: "Breaker-and-a-half",
    definition:
      "A substation bus arrangement using three breakers shared between two adjacent circuits, providing high reliability since any single breaker can be removed for maintenance without an outage.",
    category: "components",
  },
  {
    term: "Current transformer (CT)",
    definition:
      "An instrument transformer that scales primary current down to a standardized secondary level (commonly 5 A or 1 A) for metering and protective relays while providing galvanic isolation.",
    category: "components",
  },
  {
    term: "Voltage transformer (VT/PT)",
    definition:
      "An instrument transformer that scales primary voltage down to a standardized secondary level (commonly 120 V) for metering and protective relays.",
    category: "components",
  },
  {
    term: "Shunt capacitor bank",
    definition:
      "A bank of capacitors connected to a bus or feeder to supply local reactive power, raising voltage and reducing line current and losses.",
    category: "components",
  },

  // ---------- analysis ----------
  {
    term: "Load flow (power flow)",
    definition:
      "A study that solves for steady-state bus voltage magnitudes and angles, and resulting branch power flows, given specified generation and load throughout a network.",
    category: "analysis",
  },
  {
    term: "Slack bus",
    definition:
      "The load flow reference bus with specified voltage magnitude and angle (usually 0°), whose real and reactive power output is solved for to balance total generation against load plus losses.",
    category: "analysis",
  },
  {
    term: "PV bus",
    definition:
      "A generator (voltage-controlled) bus in load flow with specified real power and voltage magnitude; reactive power and angle are unknowns, subject to the generator's reactive limits.",
    category: "analysis",
  },
  {
    term: "PQ bus",
    definition:
      "A load bus in load flow with specified real and reactive power; voltage magnitude and angle are the unknowns solved for.",
    category: "analysis",
  },
  {
    term: "Newton-Raphson method",
    definition:
      "An iterative numerical method that linearizes the nonlinear power flow equations using a Jacobian matrix, converging quadratically in a few iterations for large systems.",
    category: "analysis",
  },
  {
    term: "Gauss-Seidel method",
    definition:
      "An iterative load flow solution method that solves each bus voltage directly in terms of others; simple per iteration but converges slowly (linearly) compared to Newton-Raphson.",
    category: "analysis",
  },
  {
    term: "N-1 contingency",
    definition:
      "A single-element outage (line, transformer, or generator) simulated in a reliability study to verify the remaining system can operate without thermal overloads or voltage violations.",
    category: "analysis",
  },
  {
    term: "Fault current",
    definition:
      "The current that flows through a low-impedance path created when insulation fails, calculated for three-phase, single line-to-ground, line-to-line, and double line-to-ground fault types.",
    category: "analysis",
  },
  {
    term: "DC offset (fault current)",
    definition:
      "A decaying non-sinusoidal component superimposed on fault current immediately after a fault, caused by the inability of current through an inductive circuit to change instantaneously.",
    category: "analysis",
  },
  {
    term: "Swing equation",
    definition:
      "The differential equation (2H/ωs)(d²δ/dt²) = Pm - Pe governing a synchronous machine rotor's angular dynamics following a disturbance.",
    category: "analysis",
  },
  {
    term: "Equal area criterion",
    definition:
      "A graphical/energy method for assessing first-swing transient stability of a single-machine-infinite-bus system by comparing accelerating and decelerating energy areas on the power-angle curve.",
    category: "analysis",
  },
  {
    term: "Voltage collapse",
    definition:
      "A rapid, uncontrolled decline in system voltage occurring beyond a critical loading point on the P-V (nose) curve, when the system can no longer supply sufficient reactive power.",
    category: "analysis",
  },
  {
    term: "Economic dispatch",
    definition:
      "The allocation of load among already-committed generating units to minimize total fuel cost, typically via the equal incremental cost criterion.",
    category: "analysis",
  },
  {
    term: "Unit commitment",
    definition:
      "The scheduling decision of which generating units to start up, keep online, or shut down over a time horizon, accounting for startup costs, minimum up/down times, and ramp constraints.",
    category: "analysis",
  },
  {
    term: "Locational Marginal Pricing (LMP)",
    definition:
      "The market-clearing energy price at a specific bus, composed of system marginal energy cost, a congestion component, and a loss component.",
    category: "analysis",
  },
  {
    term: "Total Harmonic Distortion (THD)",
    definition:
      "A measure of waveform distortion relative to the fundamental component, computed as the RMS sum of harmonic magnitudes divided by the fundamental magnitude.",
    category: "analysis",
  },
  {
    term: "IEEE 519",
    definition:
      "The industry standard reference setting voltage and current harmonic distortion limits at the point of common coupling between a customer and the utility.",
    category: "analysis",
  },
  {
    term: "Voltage sag",
    definition:
      "A short-duration reduction in RMS voltage (0.5 cycle to 1 minute), most commonly caused by a remote fault or the starting of a large motor.",
    category: "analysis",
  },
  {
    term: "Ferroresonance",
    definition:
      "A nonlinear resonance phenomenon involving the saturable magnetizing inductance of a transformer interacting with system or cable capacitance, capable of producing sustained, damaging overvoltages or overcurrents, often triggered by single-phase switching of lightly loaded transformers.",
    category: "analysis",
  },
  {
    term: "SAIDI",
    definition:
      "System Average Interruption Duration Index, a reliability metric measuring the average total outage duration experienced per customer per year.",
    category: "analysis",
  },

  // ---------- protection ----------
  {
    term: "ANSI device number",
    definition:
      "A standardized numeric code (per ANSI/IEEE C37.2) identifying the function of a protective relay or device, such as 51 for time-overcurrent or 87 for differential.",
    category: "protection",
  },
  {
    term: "Overcurrent protection (50/51)",
    definition:
      "Protection that trips based on current magnitude exceeding a pickup threshold, either instantaneously (device 50) or with an inverse-time delay (device 51).",
    category: "protection",
  },
  {
    term: "Distance protection (21)",
    definition:
      "Impedance-based protection that measures apparent impedance (V/I) at the relay to determine distance to a fault, the standard protection scheme for transmission lines.",
    category: "protection",
  },
  {
    term: "Differential protection (87)",
    definition:
      "Unit protection comparing current entering and leaving a strictly bounded zone, tripping on any significant difference indicating an internal fault.",
    category: "protection",
  },
  {
    term: "Coordination Time Interval (CTI)",
    definition:
      "The minimum time margin (typically 0.2-0.4 seconds) maintained between the operating times of adjacent protective devices to ensure selective operation.",
    category: "protection",
  },
  {
    term: "Time-current coordination (TCC) curve",
    definition:
      "A log-log plot of operating time versus current for protective devices, used to visually verify selective coordination across a protection scheme.",
    category: "protection",
  },
  {
    term: "Pickup current",
    definition:
      "The minimum current level at which a protective relay begins to operate or time toward tripping.",
    category: "protection",
  },
  {
    term: "Inrush current",
    definition:
      "A large, transient, harmonic-rich current (8-12x rated) drawn when a transformer is energized, which must not be misinterpreted as an internal fault by differential protection.",
    category: "protection",
  },
  {
    term: "Second-harmonic restraint",
    definition:
      "A technique in transformer differential protection that blocks tripping when second-harmonic content in the differential current exceeds a threshold, distinguishing inrush from real faults.",
    category: "protection",
  },
  {
    term: "Percentage (biased) differential",
    definition:
      "A differential protection scheme that compares operating current to a restraint current with an increasing slope, tolerating CT mismatch error during heavy through-faults.",
    category: "protection",
  },
  {
    term: "Breaker failure protection (50BF)",
    definition:
      "Local backup protection that detects a breaker's failure to interrupt fault current after a trip signal and trips surrounding breakers to clear the fault.",
    category: "protection",
  },
  {
    term: "Pilot protection",
    definition:
      "A communication-assisted protection scheme (e.g., POTT, PUTT, DCB) allowing both ends of a line to trip instantaneously for a fault anywhere on the line.",
    category: "protection",
  },
  {
    term: "Arc flash",
    definition:
      "A rapid release of energy from an electrical arc fault, producing intense heat, pressure, and light, quantified by incident energy per IEEE 1584 methodology.",
    category: "protection",
  },
  {
    term: "Incident energy",
    definition:
      "The thermal energy exposure at a specified working distance from an arc flash event, expressed in cal/cm², used to determine required PPE.",
    category: "protection",
  },
  {
    term: "NFPA 70E",
    definition:
      "The U.S. standard governing electrical safety work practices, including required PPE based on calculated or categorized arc flash incident energy.",
    category: "protection",
  },
  {
    term: "IEEE 1584",
    definition:
      "The industry-recognized standard method for calculating arc flash incident energy and arc flash boundary based on fault current, clearing time, and equipment configuration.",
    category: "protection",
  },
  {
    term: "Fuse-saving",
    definition:
      "A distribution coordination philosophy where a recloser trips fast to try to clear a temporary fault before a downstream fuse blows, at the cost of a brief system-wide voltage blink.",
    category: "protection",
  },
  {
    term: "Directional overcurrent (67)",
    definition:
      "An overcurrent relay that uses a polarizing voltage or current reference to trip only for faults in a specified direction, essential on multi-source networks.",
    category: "protection",
  },

  // ---------- renewables ----------
  {
    term: "Doubly-Fed Induction Generator (DFIG)",
    definition:
      "A Type 3 wind turbine generator with the stator directly grid-connected and a partial-scale power converter on the rotor circuit, giving a wide but limited variable-speed range.",
    category: "renewables",
  },
  {
    term: "Full-converter wind turbine",
    definition:
      "A Type 4 wind turbine generator connected to the grid through a full-scale power converter, completely decoupling generator behavior from grid frequency.",
    category: "renewables",
  },
  {
    term: "Low-Voltage Ride-Through (LVRT)",
    definition:
      "A grid code requirement that generators remain connected and continue operating (often with active reactive support) during a defined voltage sag rather than tripping offline.",
    category: "renewables",
  },
  {
    term: "Crowbar circuit",
    definition:
      "A protective resistor bank that short-circuits a DFIG's rotor windings during severe voltage transients to protect the rotor-side converter from overcurrent.",
    category: "renewables",
  },
  {
    term: "Inverter-based resource (IBR)",
    definition:
      "A generating resource (wind, solar, battery storage) that interfaces with the grid entirely through power electronics rather than a directly coupled rotating machine.",
    category: "renewables",
  },
  {
    term: "Grid-following inverter",
    definition:
      "An inverter control mode that synchronizes to and tracks an externally established grid voltage and frequency reference, the conventional mode for most inverter-based resources.",
    category: "renewables",
  },
  {
    term: "Grid-forming inverter",
    definition:
      "An inverter control mode that establishes its own voltage/frequency reference and provides synthetic inertia-like response, increasingly important as synchronous generation is displaced.",
    category: "renewables",
  },
  {
    term: "Rate of Change of Frequency (RoCoF)",
    definition:
      "The speed at which system frequency changes following a generation-load imbalance, which increases as total system inertia declines with rising inverter-based resource penetration.",
    category: "renewables",
  },
  {
    term: "Battery Management System (BMS)",
    definition:
      "The control system in a battery energy storage system that monitors cell voltage, temperature, and state of charge and enforces safe operating limits.",
    category: "renewables",
  },
  {
    term: "Round-trip efficiency",
    definition:
      "The ratio of energy discharged to energy charged for a full battery energy storage cycle, typically 85-92% for modern lithium-ion systems.",
    category: "renewables",
  },
  {
    term: "Thermal runaway",
    definition:
      "A self-sustaining exothermic reaction within a lithium-ion battery cell that can propagate to adjacent cells, the primary safety hazard in battery energy storage systems.",
    category: "renewables",
  },
  {
    term: "Interconnection study",
    definition:
      "The staged technical evaluation process (feasibility, system impact, facilities study) a new generator undergoes to determine required system upgrades before connecting to the grid.",
    category: "renewables",
  },
  {
    term: "Anti-islanding protection",
    definition:
      "Protection that detects when a distribution-connected generator has become isolated from the main grid and disconnects it to protect utility workers and prevent out-of-sync reclosing.",
    category: "renewables",
  },
  {
    term: "IEEE 1547",
    definition:
      "The standard governing interconnection and interoperability requirements for distributed energy resources connected to distribution systems.",
    category: "renewables",
  },

  // ---------- tools ----------
  {
    term: ".raw file",
    definition:
      "The primary PSS/E power flow case file format, a structured text file listing every bus, generator, load, branch, transformer, and shunt with its power-flow-relevant parameters.",
    category: "tools",
  },
  {
    term: ".dyr file",
    definition:
      "The PSS/E dynamics raw data file listing dynamic model records (generator, exciter, governor, stabilizer models) attached to each generator bus for time-domain simulation.",
    category: "tools",
  },
  {
    term: "PSSPY",
    definition:
      "PSS/E's Python API, used to script and automate power flow, contingency analysis, and dynamic simulation studies rather than manually operating the GUI.",
    category: "tools",
  },
  {
    term: "GENROU",
    definition:
      "The standard PSS/E dynamic model representing a round-rotor synchronous generator, typical of steam and gas turbine units.",
    category: "tools",
  },
  {
    term: "Automated Contingency Analysis (ACCC)",
    definition:
      "PSS/E's functionality for systematically applying a list of contingencies to a base case and reporting resulting thermal overloads or voltage violations.",
    category: "tools",
  },
  {
    term: "EMTDC",
    definition:
      "The electromagnetic transients simulation engine underlying PSCAD, solving the full instantaneous time-domain circuit equations rather than phasor approximations.",
    category: "tools",
  },
  {
    term: "Electromagnetic transient (EMT) simulation",
    definition:
      "Time-domain simulation of instantaneous voltage and current at a fine time step (microseconds), capturing switching, harmonic, and fast transient behavior an RMS tool cannot represent.",
    category: "tools",
  },
  {
    term: "RMS (phasor-domain) simulation",
    definition:
      "Simulation representing voltages and currents as slowly-varying fundamental-frequency phasors, appropriate for wide-area steady-state and stability studies at a millisecond time step.",
    category: "tools",
  },
  {
    term: ".pscx file",
    definition:
      "The current PSCAD project file format (XML-based), containing the circuit schematic, component parameters, and simulation configuration.",
    category: "tools",
  },
  {
    term: "Star (ETAP module)",
    definition:
      "ETAP's protective device coordination module, used to build and analyze time-current coordination curves across a facility's protection scheme.",
    category: "tools",
  },
  {
    term: "ANSI/IEEE short-circuit method",
    definition:
      "The North American short-circuit calculation methodology used in tools like ETAP, distinct from and not directly interchangeable with the IEC methodology.",
    category: "tools",
  },
  {
    term: "IEC short-circuit method",
    definition:
      "The international short-circuit calculation methodology used in tools like ETAP, using different multiplying factors and assumptions than the ANSI/IEEE method.",
    category: "tools",
  },
  {
    term: "WECC generic models",
    definition:
      "Standardized, vendor-neutral dynamic models for wind and solar generation (e.g., WTG Type 3/4) used across PSS/E and other tools for consistent interconnection studies.",
    category: "tools",
  },
  {
    term: "SCADA",
    definition:
      "Supervisory Control and Data Acquisition, the system of remote telemetry, monitoring, and control used by utilities to operate substations and grid equipment in real time.",
    category: "tools",
  },
  {
    term: "PMU (Phasor Measurement Unit)",
    definition:
      "A GPS-time-synchronized device that measures voltage and current phasors at high resolution (typically 30-60 samples/second), enabling wide-area real-time grid monitoring.",
    category: "tools",
  },
];
