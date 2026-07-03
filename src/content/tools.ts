import type { ToolGuide } from "./types";

export const tools: ToolGuide[] = [
  {
    slug: "psse",
    name: "PSS(R)E",
    tagline: "Siemens PTI's industry-standard tool for large-scale steady-state and dynamic power system analysis.",
    order: 1,
    content: `## What it is

PSS(R)E (Power System Simulator for Engineering, universally referred to as PSS/E) is developed and licensed by Siemens Power Technologies International (Siemens PTI). It has been the dominant tool for transmission-scale planning studies in North America since the 1970s, and remains deeply embedded in the workflows of transmission planning groups at utilities, ISOs/RTOs, and consulting firms doing interconnection and reliability studies. If you interview for a transmission planning or interconnection studies role, there is a very good chance PSS/E experience is either required or strongly preferred.

## Primary use cases

PSS/E's core strength is solving very large networks (tens of thousands of buses is routine for full-scale interconnection or ISO-wide models) efficiently and reliably. Its main functional areas are:

- Power flow (load flow): the base functionality nearly everyone uses first — solving bus voltages, angles, and branch flows using Newton-Raphson or fast-decoupled solution methods, with extensive contingency analysis (ACCC, automated contingency analysis) capability for N-1 and N-1-1 studies.
- Short-circuit analysis: fault current calculation for all standard fault types (3-phase, SLG, LL, DLG) at any bus or across the whole system, used for breaker duty studies and protection coordination support.
- Dynamic simulation: time-domain simulation of system response to disturbances (faults, generator trips, load steps) using the Dynamic Simulation (formerly "PSSE Dynamics") engine, solving the coupled network and machine/controller differential-algebraic equations. This is the tool of choice for transient stability studies, and increasingly for the more detailed dynamic behavior of inverter-based resources using WECC-standardized generic models.
- Optimal power flow (OPF) and network topology processing for larger planning and operational studies.

## Typical workflow

An engineer typically starts from an existing base case (a saved power flow snapshot, often maintained and distributed by a regional reliability coordinator or ISO, updated seasonally) and builds a specific study case by applying a defined set of changes — adding a new generator or line, modifying a load forecast, retiring a unit — then runs power flow, checks for thermal/voltage violations, runs contingency analysis to check N-1 performance, and if dynamic performance matters, exports or converts the case into a dynamics-ready format and runs transient stability simulations against a defined set of disturbance events. Study results (voltage profiles, flow reports, contingency violation summaries, stability plots of rotor angle/frequency/voltage vs time) are then documented in study reports that inform interconnection agreements, transmission expansion plans, or operational limits.

## Key file types and data structures

- .raw files: the primary power flow case format (raw data format), a structured text file listing every bus, generator, load, branch, transformer, shunt, and switched shunt in the system with all its power-flow-relevant parameters. Despite the availability of newer binary/XML-ish formats in recent versions, the .raw format remains the lingua franca for exchanging power flow cases between utilities, ISOs, and consultants.
- .dyr files: dynamics raw data files, listing the dynamic model records (generator, exciter, governor, stabilizer, and renewable/inverter models) attached to each generator bus, each referencing a specific named model (e.g., GENROU for a round-rotor generator, GAST for a gas turbine governor, or WT4G2/REGCA1-family models for inverter-based resources) with its parameter values.
- .sav / .snp files: binary saved case (.sav, a saved power flow case) and snapshot (.snp, a saved dynamics state) files used to checkpoint work.
- PSSPY / Python automation: PSS/E exposes essentially its entire functionality through a Python API (psspy, and in more recent versions a higher-level object-oriented API), which is how most production engineering groups actually run repetitive or large-batch studies — for example, running hundreds of contingency cases, sweeping a parameter across a range of values, or auto-generating study reports — rather than clicking through the GUI for every case. Comfort scripting PSS/E automation in Python is a genuine differentiator in interviews for planning roles.

## Comparison to PSCAD and ETAP

PSS/E is optimized for large networks in RMS (phasor/fundamental-frequency) representation — it is not designed to capture sub-cycle electromagnetic transient behavior the way PSCAD is, and it is not designed as an integrated one-line/protection-coordination/arc-flash design tool for a single facility the way ETAP is. Think of PSS/E as the tool for "how does the whole interconnected transmission grid behave," PSCAD as the tool for "what happens in the first few milliseconds to cycles after a specific switching event or fault at this specific piece of equipment," and ETAP as the tool for "design and protect this specific industrial or utility facility end-to-end." Large interconnection studies for wind/solar/storage plants often use both PSS/E (for the system-wide steady-state and RMS dynamic screening) and PSCAD (for detailed EMT sub-studies at the point of interconnection, especially where weak-grid or control-interaction concerns are flagged by the PSS/E-level screening).

## Practical tips and gotchas

- Bus numbering conventions and area/zone/owner codes in a .raw file carry real meaning in large systems (they drive how contingency analysis, reporting, and interchange calculations are scoped) — do not treat them as arbitrary labels.
- Solution convergence failures are extremely common with real large-scale cases; learn to read the diagnostic output (which bus/iteration is diverging) rather than blindly increasing iteration limits.
- Dynamic model compatibility between the .raw case and the .dyr file is a frequent source of errors — every generator bus referenced in the .dyr file must exist and be correctly typed in the .raw case, and model libraries change between PSS/E versions.
- Always distinguish between machine base MVA and system base MVA when interpreting or entering per-unit dynamic model parameters.
- Automated contingency analysis (ACCC) output can run to thousands of violations on a stressed case; build the habit of triaging by severity and by whether a violation is pre-existing (pre-contingency) versus contingency-caused.
- Version compatibility matters — .raw and .dyr formats have evolved (particularly the shift to newer versions with expanded record formats for renewable-heavy cases), and files saved in a newer version may not open correctly in an older one.

## Interview angle

Interviewers commonly probe whether you can navigate a .raw case file structure, explain the difference between power flow and dynamic simulation studies, and describe how you would investigate a non-converging case or a stability violation. Expect questions about specific dynamic models (e.g., "what does GENROU represent, and when would you use GENSAL instead") and about PSSPY/Python automation experience, since manual GUI-only workflows do not scale to the batch study volumes real transmission planning groups run. Being able to describe a full study workflow — from base case through contingency screening to stability assessment — in your own words is usually more valuable than memorizing individual menu commands.`,
  },
  {
    slug: "pscad",
    name: "PSCAD",
    tagline: "Manitoba Hydro International's electromagnetic transient simulation environment for power electronics, HVDC, and transient studies.",
    order: 2,
    content: `## What it is

PSCAD (Power Systems Computer Aided Design) is developed by Manitoba Hydro International (MHI), a subsidiary of Manitoba Hydro, and is built on top of the EMTDC (Electromagnetic Transients including DC) simulation engine originally developed by Manitoba Hydro's research division. PSCAD provides the graphical schematic-based front end; EMTDC is the underlying time-domain solver. It is the leading tool worldwide for detailed electromagnetic transient (EMT) simulation, particularly for HVDC and FACTS applications, an area where Manitoba Hydro itself has deep practical experience as an early and major HVDC operator.

## Primary use cases

PSCAD solves the full instantaneous time-domain circuit equations (not phasor/RMS approximations), which makes it the tool of choice whenever sub-cycle or sub-millisecond behavior matters:

- Power electronics and converter studies: detailed switching-level (or averaged, depending on study need) simulation of HVDC converters (both classical line-commutated converter, LCC, and voltage-source converter, VSC, technology), STATCOMs, SVCs, and other FACTS devices, capturing actual switching harmonics, converter control interactions, and commutation failure events that an RMS-domain tool like PSS/E cannot represent.
- Lightning and switching transient studies: insulation coordination studies, evaluating overvoltage stress from lightning strikes or breaker switching operations on specific equipment, directly informing surge arrester and BIL selection.
- Wind/solar/storage detailed interconnection studies: increasingly used for detailed sub-cycle control interaction and weak-grid studies at the point of interconnection of inverter-based resources, particularly where multiple nearby inverter-based plants might interact with each other or with a low-short-circuit-ratio ("weak") grid in ways that RMS-domain screening cannot capture.
- Protection and relay testing: because PSCAD produces genuinely realistic instantaneous voltage and current waveforms (including harmonics, DC offset, and fast transients), it is widely used to generate test signals for validating protective relay logic, including hardware-in-the-loop testing with real relays connected to a real-time simulation.
- Subsynchronous resonance (SSR) and subsynchronous control interaction (SSCI) studies: detailed electromechanical/electrical interaction studies, particularly relevant near series-compensated transmission lines interacting with nearby wind plants.

## Typical workflow

Engineers build a circuit on a graphical schematic canvas using PSCAD's component library (sources, transmission line/cable models, transformers, machines, power electronic switches and converter control blocks, protection and measurement blocks, and increasingly a library of standard renewable generator models), wire it together, define simulation parameters (time step — typically tens of microseconds for switching-level power electronics studies, much smaller than the millisecond-scale time step appropriate for an RMS tool), and run a time-domain simulation, then inspect results via built-in plotting of any modeled signal. Because EMT simulations are computationally intensive and results are extremely sensitive to exact switching/control timing, engineers typically build a case incrementally, validating simpler sub-circuits before assembling the full study system, and run multiple sensitivity cases (varying fault timing, fault type, and initial operating point) since a single "worst case" run is rarely sufficient to characterize converter or protection performance across the credible range of conditions.

## Key file types and data structures

- .pscx / .psc project files: the project file format containing the schematic, all component parameters, and simulation configuration (older versions used .psc; current versions use .pscx, an XML-based project container).
- Component library and custom components: PSCAD ships an extensive standard library, and engineers frequently build custom components using its built-in component definition and control-logic editing tools (including embedded Fortran-based custom code blocks for advanced control logic), which is one of the tool's distinguishing strengths — vendor-specific converter control models for a particular HVDC or wind/solar product are commonly delivered by the vendor as a PSCAD component model for interconnection studies.
- Output/plot files: time-domain signal data exported for post-processing, commonly reviewed directly within PSCAD's plotting tools but also exported for analysis in other tools.
- Multiple Run and scripting: PSCAD supports automated multiple-run studies (sweeping a parameter, fault timing, or scenario across many simulation runs) and Python-based automation for large sensitivity study sets, similar in spirit to PSS/E's PSSPY automation but oriented around EMT case sweeps rather than power-flow case building.

## Comparison to PSS/E and ETAP

PSCAD trades network size for time-domain fidelity — a full PSCAD model of an entire interconnected transmission system at the level of detail used for a converter study would be computationally impractical, which is why PSCAD studies typically model only the local area of interest in full detail (a converter station, a wind plant and its immediate interconnection, a specific line section) and represent the remainder of the wider system as a simplified Thevenin equivalent (an equivalent source impedance representing the short-circuit strength of the grid at that point, often itself derived from a PSS/E short-circuit study). This complementary relationship — PSS/E or a similar RMS tool defines the wide-area steady-state and stability context and provides the equivalent source strength, while PSCAD does the detailed local EMT study — is extremely common in real HVDC and large inverter-based resource interconnection projects.

## Practical tips and gotchas

- Simulation time step selection is a genuine engineering decision, not a default to leave alone — too large a time step misses fast switching/transient behavior; too small a time step makes long studies (which often need to run several seconds of simulated time to capture control system settling behavior) computationally very slow.
- Numerical oscillations ("chatter") can appear at switching instants if snubber circuits (small RC networks placed across power electronic switches specifically to aid numerical stability, mirroring physical snubber circuits used for the same purpose in real converters) are not properly configured.
- Representing the "rest of system" as a simplified Thevenin equivalent is standard practice, but the equivalent's strength (short-circuit ratio) critically affects results for weak-grid interconnection studies — do not casually reuse a generic strong-grid equivalent for a weak-grid study.
- Control system model fidelity matters enormously for HVDC/FACTS/inverter studies — a simplified or generic controller model can give qualitatively wrong answers for phenomena that are fundamentally about control interaction (like SSCI or multi-inverter interaction).
- Vendor-supplied "black box" or encrypted converter control models (common for proprietary HVDC/FACTS/wind-turbine controllers) are standard in industry practice but limit visibility into internal control logic during troubleshooting.
- Long EMT simulations (many seconds of simulated time at a microsecond time step) can take substantial wall-clock run time; parallelizing across multiple sensitivity runs (rather than trying to make one run capture everything) is the normal way to manage this.

## Interview angle

Interviewers probe whether you understand when EMT simulation is actually necessary versus when an RMS tool like PSS/E is sufficient — a good answer distinguishes fundamental-frequency phasor-domain phenomena (steady-state flows, first-swing stability) from genuinely sub-cycle or power-electronics-switching phenomena (commutation failure, SSCI, lightning transients, harmonic resonance) that require EMT. Expect questions about how you would represent the "rest of the system" as an equivalent source, how you select time step, and what a snubber circuit is for. Direct HVDC, FACTS, or detailed inverter-based-resource interconnection study experience is a significant differentiator, since PSCAD skills are comparatively rarer in the industry than PSS/E skills.`,
  },
  {
    slug: "etap",
    name: "ETAP",
    tagline: "Operation Technology Inc.'s integrated platform for electrical design, analysis, and protection of industrial and utility power systems.",
    order: 3,
    content: `## What it is

ETAP (Electrical Transient Analyzer Program) is developed by Operation Technology, Inc. (branded as ETAP). Unlike PSS/E (transmission-focused steady-state/dynamic analysis) or PSCAD (detailed EMT simulation), ETAP is built around an integrated one-line diagram as the single model shared across a very wide range of analysis modules — load flow, short-circuit, protective device coordination, arc flash, motor starting, harmonics, reliability, and more — making it especially popular for industrial facilities, commercial buildings, and utility distribution systems where a single facility's electrical design needs to be analyzed comprehensively from one consistent model rather than maintained as separate models in separate tools.

## Primary use cases

- Load flow and voltage drop analysis: standard power flow analysis for industrial and commercial power systems, typically smaller in bus count than transmission-scale PSS/E studies but with much more detailed representation of individual loads, motors, and low-voltage equipment.
- Short-circuit analysis: fault current calculation to both ANSI/IEEE and IEC standards (a notable ETAP strength, since it is used globally and industrial/EPC projects frequently require compliance with a specific regional standard), directly feeding equipment rating verification.
- Protective device coordination: building and analyzing time-current coordination (TCC) curves across an entire facility's protection scheme (relays, breakers, fuses, motor overloads) using ETAP's Star (Star-Protective Device Coordination) module, one of the tool's signature capabilities and a major reason it dominates industrial/EPC protection engineering work.
- Arc flash analysis: calculating incident energy and arc flash boundaries per IEEE 1584 across every bus in a facility model, directly generating the arc flash warning labels required for NFPA 70E compliance — this integrated arc flash capability, tightly linked to the same short-circuit and protective device data used elsewhere in the model, is one of ETAP's most widely used features in industrial engineering practice.
- Motor starting and transient stability: evaluating voltage dip during large motor starts and the resulting impact on other connected loads, plus transient stability analysis for facilities with on-site generation.
- Harmonics analysis and reliability/contingency analysis: assessing harmonic distortion against IEEE 519 limits and running facility-level reliability (outage frequency/duration) studies.

## Typical workflow

Engineers build (or import) a single-line diagram representing the facility's electrical distribution system — utility source, generators, transformers, cables, breakers, motors, and loads — entering equipment nameplate and protective device data once into the shared model, then run whichever analysis modules the project requires against that same model: load flow to verify voltage and loading are acceptable, short-circuit to verify equipment ratings, protective device coordination to verify selective tripping (with results visualized directly on a TCC plot overlaid on the same one-line), and arc flash to generate PPE labeling requirements. Because all modules share the same underlying model and data, updating a piece of equipment (say, a transformer impedance) automatically flows through to every dependent study, which is a major practical advantage over maintaining separate models per study type — though it also means data entry errors propagate across every module, making initial model validation important.

## Key file types and data structures

- One-line diagram (project file): ETAP's native project file contains the complete electrical model — the one-line diagram graphics plus every piece of equipment's engineering data (ratings, impedances, protective device settings, cable/conductor data) — as a single integrated project rather than separate files per study type.
- Equipment libraries: ETAP includes extensive built-in and user-extensible libraries of manufacturer equipment data (cables, transformers, protective devices, motors), and correctly selecting or entering accurate library data is central to getting valid study results, particularly for protective device TCC curves, which must match the actual relay/breaker/fuse curve family and settings installed in the field.
- Revision/configuration management: ETAP supports multiple network configurations (e.g., normal vs. alternate feed, different breaker states) and revisions within a single project, letting engineers study several operating scenarios from the same base model.
- Report and label output: arc flash labels, coordination TCC plots, and study reports are generated directly from the model for field use and regulatory documentation.

## Comparison to PSS/E and PSCAD

ETAP is not designed for transmission-scale steady-state planning studies (tens of thousands of buses) the way PSS/E is, nor for sub-cycle electromagnetic transient simulation the way PSCAD is — its comparative advantage is depth and integration across many analysis types for a single facility or a moderately sized distribution system, especially protective device coordination and arc flash, which are comparatively minor or absent capabilities in PSS/E and PSCAD respectively. In practice, the three tools serve genuinely different roles across a project lifecycle: PSS/E for wide-area transmission planning and interconnection screening, PSCAD for detailed EMT behavior of specific power-electronic equipment, and ETAP for the detailed design, protection, and safety analysis of a specific plant, substation, or industrial facility — an EPC or industrial engineering role is far more likely to lean on ETAP day-to-day, while a transmission planning or ISO role leans on PSS/E, and a specialized HVDC/FACTS/renewable integration studies role leans on PSCAD.

## Practical tips and gotchas

- Protective device library accuracy is everything for coordination studies — always verify the TCC curve family and settings entered in ETAP match the actual installed/specified device, especially for electromechanical relays with non-standard curve shapes or field-modified settings.
- Short-circuit study standard selection (ANSI/IEEE vs. IEC) is not a cosmetic setting — the two methodologies use materially different calculation methods and multiplying factors, and mixing up which standard a given project requires is a common and consequential error, especially on international EPC projects.
- Arc flash results are extremely sensitive to protection clearing time, which in turn depends on correctly modeled and up-to-date protective device settings — a coordination study and an arc flash study on the same facility should always be reconciled against the same, current relay/breaker settings, not built independently.
- Motor starting studies require accurate motor locked-rotor current and starting characteristics, not just steady-state ratings, to correctly predict voltage dip.
- Because all modules share one model, a single incorrect piece of base data (a transformer impedance, a cable length) can silently produce wrong results across every downstream study — periodic model validation/audit against as-built field data is standard practice on long-lived facility models.
- Revision and configuration management features are useful for studying alternate feed/switching configurations but can also lead to confusion about which revision represents "as-built" current field conditions if not disciplined.

## Interview angle

Interviewers in industrial, EPC, or facility engineering roles commonly ask about your experience building coordination studies and interpreting TCC curves, how arc flash incident energy relates to protective device clearing time (see the protection coordination & arc flash lesson), and whether you understand the difference between ANSI/IEEE and IEC short-circuit methodologies. Because ETAP's core value proposition is an integrated model across many study types, interviewers may also probe whether you understand how a change in one part of a facility (say, a new large motor) cascades into needing updated load flow, short-circuit, coordination, and arc flash results — demonstrating that you think about the facility model as one interconnected system rather than isolated, siloed calculations is usually more impressive than familiarity with any single menu or button.`,
  },
];
