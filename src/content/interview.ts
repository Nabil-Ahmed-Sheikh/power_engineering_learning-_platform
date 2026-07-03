import type { InterviewQuestion } from "./types";

export const interviewQuestions: InterviewQuestion[] = [
  // ================= FUNDAMENTALS (25) =================
  {
    id: "int-001",
    category: "fundamentals",
    question: "What is the purpose of the per-unit system, and why is it used almost universally in power system studies?",
    difficulty: "easy",
    answer:
      "The per-unit system normalizes voltages, currents, powers, and impedances to a common base, expressing every quantity as a fraction of that base rather than in absolute engineering units. Its biggest practical benefit is that it eliminates the transformer turns ratio from calculations: if base voltages on either side of a transformer are chosen in the same ratio as its nominal turns ratio, the transformer's per-unit impedance is identical on both sides, so a multi-voltage-level network can be analyzed as one continuous per-unit system without manually reflecting impedances across every transformer. It also gives naturally normalized, easy-to-sanity-check values — transformer impedances typically fall in the 5–15% range and generator subtransient reactances in 15–25%, so a value far outside that range signals a data or base error. Finally, it's the native internal representation used by virtually all commercial software (PSS/E, ETAP, PSCAD), so fluency with base conversion (Z_pu,new = Z_pu,old × (S_base,new/S_base,old) × (V_base,old/V_base,new)²) is a practical daily skill.",
  },
  {
    id: "int-002",
    category: "fundamentals",
    question: "A transformer nameplate lists 8% impedance on its own 30 MVA, 138/13.8 kV base. Convert this to a system study base of 100 MVA at the same voltages.",
    difficulty: "easy",
    answer:
      "Using the base conversion formula Z_pu,new = Z_pu,old × (S_base,new/S_base,old) × (V_base,old/V_base,new)², and since the voltage bases are unchanged, the voltage ratio term is 1. So Z_pu,new = 0.08 × (100/30) = 0.267 p.u., or 26.7%. This illustrates a common trap: the transformer's physical impedance in ohms hasn't changed at all, but its per-unit value grows because it is now expressed as a fraction of a larger system MVA base.",
  },
  {
    id: "int-003",
    category: "fundamentals",
    question: "Why do power systems use three-phase generation and transmission instead of single-phase?",
    difficulty: "easy",
    answer:
      "Three-phase systems deliver constant instantaneous power under balanced conditions, because the sum of three sinusoids 120 degrees apart is constant rather than pulsating at twice line frequency as single-phase power does. Constant power means smoother torque and less vibration on generator and motor shafts. Three-phase transmission is also more efficient per unit of conductor: for a given power delivered, less copper/aluminum is needed than three independent single-phase circuits, and under balanced conditions the neutral current is zero, so the return conductor can be reduced or eliminated on transmission lines. Three-phase machines are also simpler and cheaper to build for a given power rating than an equivalent set of single-phase machines.",
  },
  {
    id: "int-004",
    category: "fundamentals",
    question: "Explain the difference between real power, reactive power, and apparent power, including their units.",
    difficulty: "easy",
    answer:
      "Real (active) power P, in watts or MW, is the power that does actual work — driving motors, producing heat and light — computed as P = V·I·cosθ. Reactive power Q, in vars or MVAR, is power that oscillates between source and load each cycle without net work, associated with energy storage in inductors and capacitors, computed as Q = V·I·sinθ. Apparent power S, in volt-amps or MVA, is the total current-carrying burden on equipment, S = V·I = √(P²+Q²). They form a right triangle (the power triangle) with power factor pf = cosθ = P/S. Lagging power factor (inductive loads, the common case) means the load absorbs reactive power; leading power factor (capacitive loads or overexcited machines) means the load or source supplies it.",
  },
  {
    id: "int-005",
    category: "fundamentals",
    question: "Why is reactive power support best provided locally, near the load, rather than transmitted long distances?",
    difficulty: "medium",
    answer:
      "Voltage drop across a line is approximately ΔV ≈ (P·R + Q·X)/V, and since transmission lines are highly inductive (X >> R), the Q·X term dominates — meaning reactive power flow is the primary driver of voltage drop. Pushing reactive power over an inductive line consumes additional I²X reactive losses in the line itself, so a large fraction of vars sent from far away never actually reaches the load; it's absorbed by the line. This is why utilities install local shunt capacitor banks and reactive compensation devices (SVCs, STATCOMs) close to load centers rather than relying on distant generators to supply reactive power support — it's both more effective and reduces losses.",
  },
  {
    id: "int-006",
    category: "fundamentals",
    question: "What is symmetrical components analysis, and why is it useful?",
    difficulty: "medium",
    answer:
      "Fortescue's theorem states that any unbalanced set of three phasors can be decomposed into three balanced sets: positive sequence (equal magnitude, 120° apart, normal a-b-c rotation), negative sequence (equal magnitude, 120° apart, reversed a-c-b rotation), and zero sequence (equal magnitude, in phase, no rotation). Balanced network elements decouple into three independent single-phase networks under this transformation, which is enormously simpler than solving a fully coupled three-phase network directly. The three sequence networks only interconnect at the point of an unbalanced condition, like a fault, with the interconnection pattern depending on the fault type. This is the mathematical basis for virtually all commercial short-circuit and protection coordination software.",
  },
  {
    id: "int-007",
    category: "fundamentals",
    question: "Why is zero-sequence impedance for a transmission line typically 2 to 3.5 times its positive-sequence impedance?",
    difficulty: "hard",
    answer:
      "Positive and negative sequence currents on a line sum to zero at any point in a balanced three-phase set, so they return entirely through the phase conductors themselves. Zero-sequence current, however, is in phase across all three conductors and does not cancel — it requires a return path through the earth and any shield/ground wires. The earth-return path has a much higher effective resistance and a different flux linkage geometry than the phase-conductor mutual coupling that governs positive-sequence inductance, which raises the effective zero-sequence reactance and resistance well above the positive-sequence values. This is why zero-sequence impedance data must be calculated or measured separately and cannot be assumed equal to positive sequence, unlike for static equipment where Z1 = Z2 always holds.",
  },
  {
    id: "int-008",
    category: "fundamentals",
    question: "What is a wye-delta transformer connection, and how does it affect zero-sequence current flow?",
    difficulty: "medium",
    answer:
      "In a wye-delta transformer, one winding is connected wye (star) and the other delta (mesh). The delta winding provides a closed internal loop that traps circulating zero-sequence current — any zero-sequence voltage induced in the delta winding drives a circulating current confined within the delta, so zero-sequence current never appears on the delta side's external line terminals. This makes wye-delta transformers a common tool for isolating one part of a system's zero-sequence network from another, and it's why they're frequently used at the interface between a solidly grounded system and a system that should not see ground-fault current contribution from the other side.",
  },
  {
    id: "int-009",
    category: "fundamentals",
    question: "Derive or state the fault current formula for a single line-to-ground fault using symmetrical components, and explain physically why the factor of 3 appears.",
    difficulty: "hard",
    answer:
      "For a bolted single line-to-ground fault, the boundary conditions (Ib = Ic = 0, Va = 0 at the fault) force the positive, negative, and zero sequence networks into a series connection, giving sequence current I1 = I2 = I0 = E/(Z1+Z2+Z0). The actual phase-a fault current is Ia = I0+I1+I2 = 3E/(Z1+Z2+Z0). The factor of 3 arises directly from the inverse Fortescue transformation summing three equal sequence currents in phase a. Physically, it reflects that all the fault current in the single faulted phase must be reconstructed from equal contributions of all three sequence networks, each individually only a third of the total.",
  },
  {
    id: "int-010",
    category: "fundamentals",
    question: "What is the difference between line-to-line voltage and line-to-neutral voltage in a wye-connected system, and why does the distinction matter in calculations?",
    difficulty: "easy",
    answer:
      "In a balanced wye connection, line-to-line voltage V_LL is √3 times the line-to-neutral (phase) voltage V_LN, because it's the phasor difference between two phase voltages 120° apart. System nameplate and nominal voltages (e.g., '138 kV') are conventionally quoted line-to-line, while impedance and per-unit calculations sometimes use line-to-neutral quantities internally. Mixing the two without the √3 factor is one of the most common sources of factor-of-√3 errors in hand calculations — always confirm which convention a given voltage value uses before applying a power or fault current formula.",
  },
  {
    id: "int-011",
    category: "fundamentals",
    question: "Explain the physical meaning of impedance angle and why it matters for fault current calculations (X/R ratio).",
    difficulty: "medium",
    answer:
      "Impedance Z = R + jX has magnitude |Z| = √(R²+X²) and angle θ_Z = atan(X/R), representing how much current lags voltage through that impedance. The X/R ratio determines how much DC offset appears in fault current immediately after a fault: a higher X/R ratio (common near large generators and transformers, which are highly inductive) produces a longer time constant τ = X/(ωR) for the DC component to decay, resulting in higher peak asymmetrical current in the first cycle. This is why circuit breaker momentary/close-and-latch ratings (roughly 2.6–2.7 times the symmetrical interrupting rating) exist separately from the symmetrical interrupting rating measured after a few cycles.",
  },
  {
    id: "int-012",
    category: "fundamentals",
    question: "What is power factor correction, and how would you size a capacitor bank to correct a load from 0.8 to 0.95 lagging power factor?",
    difficulty: "medium",
    answer:
      "Power factor correction adds local capacitive reactive power to reduce the amount of lagging reactive power the utility must supply, lowering apparent power (and hence current) for the same real power delivered. For a load of P kW at pf1 = 0.8, initial reactive power Q1 = P·tan(acos(0.8)) = P×0.75. To correct to pf2 = 0.95, target Q2 = P·tan(acos(0.95)) = P×0.329. The required capacitor bank size is Qc = Q1 − Q2 = P×(0.75−0.329) = 0.421×P kVAR. For a 1000 kW load, Qc ≈ 421 kVAR.",
  },
  {
    id: "int-013",
    category: "fundamentals",
    question: "What causes the Ferranti effect, and when is it most significant?",
    difficulty: "medium",
    answer:
      "The Ferranti effect is the rise in receiving-end voltage above sending-end voltage on a lightly loaded or open-ended long transmission line. It occurs because the line's distributed shunt capacitance draws charging current that flows through the line's series inductive reactance; at light load, this capacitive charging current dominates over load current, and the voltage drop across the series reactance actually becomes a voltage rise in the direction of power flow. It is most pronounced on long, lightly loaded EHV lines, which is why utilities install switched shunt reactors to absorb the excess charging vars and control voltage rise under light-load conditions.",
  },
  {
    id: "int-014",
    category: "fundamentals",
    question: "What is Surge Impedance Loading (SIL) and why is it a useful benchmark for transmission planners?",
    difficulty: "hard",
    answer:
      "Surge Impedance Loading is the power a line delivers when terminated in its own surge (characteristic) impedance Zc = √(L/C): SIL = V_LL²/Zc. At this loading, the reactive power the line's shunt capacitance generates exactly balances the reactive power its series inductance absorbs, so the line requires no external reactive support and its voltage profile is essentially flat along its length. Loading below SIL causes the line to behave capacitively (voltage rise, Ferranti effect); loading above SIL causes it to behave inductively (voltage drop). Planners use SIL as a rule-of-thumb benchmark for how heavily a given voltage class/conductor configuration can be efficiently loaded without needing significant reactive compensation.",
  },
  {
    id: "int-015",
    category: "fundamentals",
    question: "What is skin effect, and how does it affect AC resistance of a conductor?",
    difficulty: "easy",
    answer:
      "Skin effect is the tendency of alternating current to crowd toward the outer surface of a conductor rather than distributing uniformly across its cross-section, caused by the conductor's own changing magnetic field inducing eddy currents that oppose current flow more strongly at the center. The effective cross-sectional area carrying current is reduced, so AC resistance is higher than DC resistance for the same conductor, and this effect increases with frequency. It's a modest but real correction applied in accurate line parameter calculations.",
  },
  {
    id: "int-016",
    category: "fundamentals",
    question: "Why is the swing equation second order in rotor angle, and what does the inertia constant H represent?",
    difficulty: "hard",
    answer:
      "The swing equation, (2H/ωs)(d²δ/dt²) = Pm − Pe, is a rotational form of Newton's second law: net accelerating torque (proportional to Pm − Pe) produces angular acceleration, which is the second derivative of angle with respect to time — hence second order. The inertia constant H, in seconds, is defined as the ratio of the rotor's stored kinetic energy at rated (synchronous) speed to the machine's rated MVA; physically it represents how many seconds the machine could supply its own rated power purely from its stored kinetic energy. Typical values for large turbine generators run 2–9 seconds. A higher H means the rotor accelerates more slowly for a given power imbalance, giving the system more time to respond to disturbances — this is the direct link between inertia and frequency/angle stability.",
  },
  {
    id: "int-017",
    category: "fundamentals",
    question: "What is the difference between subtransient, transient, and synchronous reactance of a synchronous generator, and when is each used?",
    difficulty: "hard",
    answer:
      "A generator's effective reactance changes over time after a disturbance because of shielding currents induced in the rotor's damper windings and field winding. Subtransient reactance Xd″ (typically 0.12–0.25 p.u.) applies in the first few cycles, when damper winding currents strongly oppose flux change, and is used for close-in fault current and breaker duty calculations. Transient reactance Xd′ (typically 0.20–0.35 p.u.) applies over the next several hundred milliseconds to a few seconds, once damper currents decay but field winding currents still resist flux change, and is used for transient stability studies. Synchronous reactance Xd (typically 1.0–2.2 p.u.) is the steady-state value after all induced currents decay, used for steady-state load flow and voltage regulation. Because Xd″ < Xd′ < Xd, fault current is highest immediately after a fault and decays toward a lower steady-state value.",
  },
  {
    id: "int-018",
    category: "fundamentals",
    question: "What is a generator capability curve, and what three limits typically define its boundary?",
    difficulty: "medium",
    answer:
      "A generator capability curve (often called a D-curve) plots the safe operating region of real vs. reactive power output. It is bounded by three physical limits: the stator (armature) current limit, a circular arc at radius equal to rated MVA, driven by I²R heating of the stator winding; the rotor (field) current limit, which bounds overexcited/lagging operation and is driven by field winding heating; and the underexcitation limit, which bounds leading-power-factor (underexcited) operation and is driven by stability margin and end-region core heating at low field current. Operating outside this envelope risks either thermal damage or loss of synchronism.",
  },
  {
    id: "int-019",
    category: "fundamentals",
    question: "What does a Power System Stabilizer (PSS) do, and why is it added to a generator's excitation control?",
    difficulty: "medium",
    answer:
      "A Power System Stabilizer is a supplementary control loop on the Automatic Voltage Regulator that injects a small stabilizing signal, typically derived from rotor speed or electrical power deviation, into the excitation reference. Its purpose is to damp low-frequency (roughly 0.2–2 Hz) electromechanical oscillations between generators or between interconnected areas, which a fast-acting AVR alone can actually destabilize under certain conditions by responding too strongly to angle-related voltage changes. Properly tuned PSS units are essential for interconnected systems where inter-area oscillations could otherwise grow rather than decay after a disturbance.",
  },
  {
    id: "int-020",
    category: "fundamentals",
    question: "What is the difference between a round-rotor (cylindrical) and salient-pole synchronous machine?",
    difficulty: "medium",
    answer:
      "A round-rotor machine has a uniform air gap around the circumference, used for high-speed steam and gas turbine generators (2 or 4 poles); its reluctance is essentially uniform, so it has no significant saliency-driven torque component. A salient-pole machine has projecting poles creating a non-uniform air gap, used for slower-speed applications like hydro units (many poles, lower RPM); it has distinct direct-axis (Xd) and quadrature-axis (Xq) reactances because the magnetic reluctance differs along versus between the poles, contributing an additional reluctance torque term beyond the main excitation torque.",
  },
  {
    id: "int-021",
    category: "fundamentals",
    question: "Explain vector group notation for power transformers, using Dyn11 as an example.",
    difficulty: "hard",
    answer:
      "Vector group notation describes winding connections and phase displacement. The first (uppercase) letter is the high-voltage winding connection, the second (lowercase) is the low-voltage winding connection: D/d = delta, Y/y = wye, Z/z = zigzag. 'n' indicates the neutral is brought out (grounded/groundable). The trailing number is clock-hour notation in 30° increments describing how far the low-voltage winding phasor is displaced from the high-voltage reference, read like a clock face with 12 as the HV reference. Dyn11 means delta HV, grounded-wye LV, with the LV voltage leading HV by 11×30° = 330° (equivalently lagging by 30°). This matters practically because paralleling transformers with mismatched vector groups produces large circulating currents even between otherwise identical units.",
  },
  {
    id: "int-022",
    category: "fundamentals",
    question: "What is the difference between an on-load tap changer (OLTC/LTC) and a no-load (de-energized) tap changer, and where is each used?",
    difficulty: "easy",
    answer:
      "A no-load tap changer must be operated with the transformer de-energized and is used for infrequent, coarse adjustments (e.g., seasonal), typically offering only a few discrete steps like ±2×2.5%. An on-load tap changer (LTC) can adjust the effective turns ratio automatically while the transformer remains energized and carrying load, using a motor-driven selector and diverter switch mechanism to move between finer taps (0.625–1.25% steps) over a wider range (commonly ±10%) without interrupting service. LTCs are the standard tool for continuous automatic voltage regulation on distribution and some transmission transformers.",
  },
  {
    id: "int-023",
    category: "fundamentals",
    question: "Why does a shunt capacitor bank raise voltage, and why do utilities need to coordinate capacitor switching with voltage regulators?",
    difficulty: "medium",
    answer:
      "A shunt capacitor bank supplies leading reactive power locally, which reduces the amount of lagging reactive current that must flow from the source through the line's series reactance to serve the load; since voltage drop is dominated by the Q·X term, reducing net Q flow on the line raises the voltage at and downstream of the capacitor. Because both capacitor banks and LTC voltage regulators respond to local voltage/current signals, poorly coordinated controls can 'hunt' — each device reacting to the other's switching action in a way that produces repeated, unnecessary step changes rather than settling to a stable state — so their control setpoints and time delays must be deliberately staggered as part of a coordinated Volt/VAR control scheme.",
  },
  {
    id: "int-024",
    category: "fundamentals",
    question: "What is an autotransformer, and what is its main advantage and disadvantage compared to a two-winding transformer?",
    difficulty: "medium",
    answer:
      "An autotransformer shares a single winding electrically between the high- and low-voltage sides rather than using fully separate windings, with part of the power transferred conductively and part transformed magnetically. Its main advantage is reduced cost, size, and losses for a given rating compared to an equivalent two-winding transformer, because only the 'common' portion of the winding needs to carry the difference current. Its main disadvantage is the lack of galvanic isolation between the high and low sides, which requires careful attention to overvoltage transfer between windings and to grounding design; autotransformers commonly include a delta tertiary winding to provide a path for zero-sequence/third-harmonic circulating current and to supply station auxiliary loads.",
  },
  {
    id: "int-025",
    category: "fundamentals",
    question: "A balanced three-phase load draws 200 A per line at 13.8 kV line-to-line with a lagging power factor of 0.85. Calculate the real, reactive, and apparent power.",
    difficulty: "easy",
    answer:
      "Apparent power S = √3 × V_LL × I_L = √3 × 13,800 × 200 = 4.78 MVA. Real power P = S × pf = 4.78 × 0.85 = 4.06 MW. The power factor angle θ = acos(0.85) = 31.8°, so reactive power Q = S × sinθ = 4.78 × 0.527 = 2.52 MVAR (lagging, since the load is inductive).",
  },

  // ================= ANALYSIS (20) =================
  {
    id: "int-026",
    category: "analysis",
    question: "Explain the difference between Gauss-Seidel and Newton-Raphson methods for solving load flow, and why Newton-Raphson dominates modern software.",
    difficulty: "medium",
    answer:
      "Gauss-Seidel rearranges the power balance equation at each bus to solve directly for that bus's voltage in terms of the others, updating iteratively and using newly computed values immediately within the same iteration. It's simple to implement and cheap per iteration, but converges linearly (slowly), often needing tens to hundreds of iterations, and becomes unreliable on large or heavily loaded systems. Newton-Raphson linearizes the nonlinear power flow equations using a Taylor expansion, builds a Jacobian matrix of partial derivatives, and solves a linear system at each iteration to update voltage and angle. It converges quadratically — typically only 3–5 iterations regardless of system size — though each iteration is more expensive due to Jacobian formation and factorization. Because production networks have tens of thousands of buses, reliable, fast convergence matters more than cheap iterations, which is why Newton-Raphson (and its fast-decoupled variant) is standard in essentially all modern commercial load flow software.",
  },
  {
    id: "int-027",
    category: "analysis",
    question: "What are slack, PV, and PQ buses in a load flow study, and what happens when a PV bus's reactive limit is reached?",
    difficulty: "medium",
    answer:
      "A slack (swing) bus has specified voltage magnitude and angle (angle fixed as reference, usually 0°); its P and Q are unknown and solved for, balancing total system generation against load plus losses which cannot be known in advance. A PV bus has specified real power and voltage magnitude (a generator holding voltage via its AVR); its reactive power and angle are unknown. A PQ (load) bus has specified real and reactive power; its voltage magnitude and angle are unknown. When a PV bus's required reactive power to hold its voltage setpoint would exceed the generator's Q capability limit, the bus is converted to a PQ bus with Q pinned at that limit, and voltage at that bus is then allowed to deviate from its target as the solution proceeds.",
  },
  {
    id: "int-028",
    category: "analysis",
    question: "What is N-1 contingency analysis, and why is it the standard reliability criterion for transmission planning?",
    difficulty: "easy",
    answer:
      "N-1 contingency analysis systematically removes each single element of the network (a line, transformer, or generator) one at a time, simulating an unplanned outage, and re-solves load flow to verify no remaining element exceeds its thermal rating and no bus voltage violates acceptable limits. It's the standard criterion (codified in NERC and most utility planning standards) because it certifies the system can survive any single credible contingency without cascading failures or unacceptable service impact — reflecting the reality that a single equipment failure is a routine, expected occurrence on a large interconnected grid, and the system must be planned to tolerate it without relying on perfect luck.",
  },
  {
    id: "int-029",
    category: "analysis",
    question: "Why is a three-phase fault sometimes not the worst-case fault for a given piece of equipment, even though it's usually treated as the standard breaker duty check?",
    difficulty: "hard",
    answer:
      "A three-phase fault only involves the positive-sequence network (I = E/Z1), but a single line-to-ground fault current is 3E/(Z1+Z2+Z0). On a solidly grounded system close to a source with low zero-sequence impedance (for example, near a grounded-wye transformer or generator neutral), Z0 can be small enough that 3E/(Z1+Z2+Z0) actually exceeds E/Z1, making the SLG fault the more severe case. This is why full short-circuit studies calculate all four standard fault types (three-phase, single line-to-ground, line-to-line, double line-to-ground) at every bus rather than assuming three-phase is always worst.",
  },
  {
    id: "int-030",
    category: "analysis",
    question: "What causes the asymmetrical (DC offset) component of fault current, and why does it matter for breaker ratings?",
    difficulty: "medium",
    answer:
      "Current through an inductive circuit cannot change instantaneously. At the instant a fault occurs, unless it happens to occur exactly at the point where the resulting AC fault current would naturally be zero, a decaying DC component must appear superimposed on the AC component to satisfy the physical continuity of current. This DC offset decays with time constant τ = X/(ωR), so higher X/R ratio circuits (near large generators/transformers) retain significant offset for longer, producing higher peak asymmetrical current in the first cycle. This is why circuit breakers have a momentary/close-and-latch rating (roughly 2.6–2.7 times the symmetrical interrupting rating under ANSI convention) separate from their interrupting rating measured a few cycles later, after the DC component has substantially decayed.",
  },
  {
    id: "int-031",
    category: "analysis",
    question: "State the equal area criterion and explain how it's used to assess transient stability.",
    difficulty: "hard",
    answer:
      "For a single-machine-infinite-bus system, the equal area criterion is a graphical/energy method for assessing first-swing transient stability without numerically integrating the swing equation. During a fault, electrical power Pe drops (often near zero for a solid three-phase fault) while mechanical power Pm stays roughly constant, so the rotor accelerates, and the area between the Pm line and the reduced Pe curve from the pre-fault angle to the fault-clearing angle represents stored 'accelerating energy.' After the fault clears, Pe recovers (though often to a reduced post-fault curve if a line tripped) and, if it exceeds Pm, the rotor decelerates, tracing a 'decelerating energy' area as it swings toward a new equilibrium. The system is stable if a decelerating area at least equal to the accelerating area is available before the rotor angle reaches the maximum allowable angle. This directly explains why faster fault clearing improves stability margin: it reduces the accelerating-energy area by shortening the low-Pe period.",
  },
  {
    id: "int-032",
    category: "analysis",
    question: "What is critical clearing time, and how is it used in protection and stability engineering?",
    difficulty: "medium",
    answer:
      "Critical clearing time is the maximum duration a fault can persist before the system loses transient stability (a generator or group of generators loses synchronism) for a given disturbance and system condition. It's determined from stability simulation (or the equal area criterion for simple systems) and used to verify that installed protection speed provides adequate margin — if a relay/breaker combination's actual clearing time is close to or exceeds the critical clearing time for a credible fault, faster protection (e.g., pilot schemes instead of stepped distance) or other remedial measures are needed.",
  },
  {
    id: "int-033",
    category: "analysis",
    question: "What is voltage stability, and how does it differ from rotor angle (transient) stability?",
    difficulty: "hard",
    answer:
      "Rotor angle (transient) stability concerns whether synchronous machines remain in synchronism with each other after a disturbance, governed by the swing equation and power-angle relationships. Voltage stability concerns whether the system can maintain acceptable voltage at all buses, both immediately after a disturbance (large-disturbance/transient voltage stability) and under slow load growth (long-term/static voltage stability). Voltage instability is associated with the P-V ('nose') curve: as load increases, voltage initially declines gradually, but beyond a critical loading point (the nose of the curve) further load increase causes voltage to collapse rapidly because the system can no longer supply the required reactive power to sustain voltage — this is voltage collapse, a distinct failure mode from a generator simply losing synchronism.",
  },
  {
    id: "int-034",
    category: "analysis",
    question: "Explain the equal incremental cost criterion for economic dispatch, and how transmission losses modify it.",
    difficulty: "hard",
    answer:
      "For unconstrained economic dispatch, minimizing total generation cost subject to meeting total demand yields the condition that every committed, unconstrained unit should operate at the same marginal (incremental) cost: dC1/dP1 = dC2/dP2 = ... = λ, where λ is the system marginal cost of the next MWh of demand (any unit below λ should be dispatched up, any unit above dispatched down, until all converge). When transmission losses are included, the condition becomes dCi/dPi × [1/(1−∂PL/∂Pi)] = λ for every unit, where the penalty factor 1/(1−∂PL/∂Pi) accounts for how much a given unit's output changes system losses. A unit electrically remote from load, whose output causes disproportionately more loss, effectively needs a lower fuel cost to be dispatched to the same degree as a unit near load — this is why remote generation is systematically disadvantaged in loss-inclusive dispatch even at identical fuel cost.",
  },
  {
    id: "int-035",
    category: "analysis",
    question: "What is the difference between economic dispatch and unit commitment?",
    difficulty: "medium",
    answer:
      "Economic dispatch answers a short-horizon question: given a set of units that are already online (committed), how should load be allocated among them to minimize fuel cost, typically via the equal incremental cost criterion? Unit commitment answers a longer-horizon question: which units should be started, kept running, or shut down over a scheduling period (commonly day-ahead), accounting for minimum up/down times, startup costs, and ramp constraints, while ensuring enough capacity and reserves are available at every hour. Unit commitment is a much harder, mixed-integer optimization problem (each unit's on/off state is binary), while economic dispatch, given fixed commitment, is a smooth, continuous optimization.",
  },
  {
    id: "int-036",
    category: "analysis",
    question: "What is Locational Marginal Pricing (LMP), and what are its typical components?",
    difficulty: "hard",
    answer:
      "Locational Marginal Pricing is the market price of energy at a specific location (bus/node) in a security-constrained economic dispatch market, reflecting the true marginal cost of serving one additional MW of load at that exact point given current system and transmission conditions. LMP is typically decomposed into three components: the system marginal energy cost (what it would cost with no transmission constraints anywhere), a congestion component (the additional cost incurred because a binding transmission constraint requires more expensive generation to be dispatched to serve load at that location without violating the limit), and a loss component (reflecting the marginal impact of serving that location on system losses). LMPs can differ significantly by location whenever transmission congestion binds.",
  },
  {
    id: "int-037",
    category: "analysis",
    question: "What operating reserves does a system typically carry, and why?",
    difficulty: "medium",
    answer:
      "Beyond meeting forecast demand, dispatch carries: regulation reserve, fast automatic response (seconds) to minute-to-minute imbalance via AGC; spinning reserve, online synchronized capacity able to respond within about 10 minutes, typically sized to cover loss of the single largest online contingency (the N-1 reserve criterion); and non-spinning/supplemental reserve, offline capacity startable within 10–30 minutes. These reserves exist because demand and generation forecasts are never perfect and equipment can fail unexpectedly; carrying reserves ensures the system can absorb these deviations without frequency or reliability violations, and reserve requirements are increasingly co-optimized with energy dispatch, especially as fast-ramping needs grow with renewable penetration.",
  },
  {
    id: "int-038",
    category: "analysis",
    question: "What is Total Harmonic Distortion (THD), and why are current and voltage THD limits treated differently under IEEE 519?",
    difficulty: "medium",
    answer:
      "THD quantifies the overall distortion of a waveform relative to its fundamental component: THD = √(Σ Ih² for h=2 to ∞) / I1 for current (an analogous formula applies to voltage). IEEE 519 places voltage distortion limits on the utility (since voltage distortion is a shared, system-wide characteristic that the utility is responsible for maintaining within limits, e.g., THDv ≤ 5% below 69 kV) and current distortion limits on individual customers, because it's each customer's nonlinear load that injects harmonic current in the first place. Current limits scale with the customer's short-circuit ratio (ISC/IL) at the point of common coupling, recognizing that a stronger ('stiffer') system can absorb more harmonic current injection from a given customer without excessive resulting voltage distortion.",
  },
  {
    id: "int-039",
    category: "analysis",
    question: "Why do triplen harmonics (3rd, 9th, 15th...) behave differently from other harmonics in a three-phase system?",
    difficulty: "hard",
    answer:
      "Triplen harmonics are zero-sequence in nature — in a balanced three-phase system, the 3rd, 9th, 15th, etc. harmonic components on all three phases are in phase with each other rather than 120° apart. Because they're in phase, they add up arithmetically in the neutral conductor of a wye system rather than canceling, unlike the fundamental and most other harmonic orders. This is why single-phase nonlinear loads (electronic ballasts, switch-mode power supplies), which are rich in third-harmonic content, can severely overload an undersized neutral conductor even when each individual phase current looks acceptable.",
  },
  {
    id: "int-040",
    category: "analysis",
    question: "Explain what causes a voltage sag on an industrial customer's system, and why sags are often more operationally costly than full outages.",
    difficulty: "medium",
    answer:
      "Voltage sags are most commonly caused by a fault elsewhere on the system — the fault creates a voltage divider effect between the fault location and the observation point, momentarily depressing voltage before protection clears the fault — or by starting a large motor, whose high inrush current causes a temporary local voltage drop. Sags are often more costly than full outages for industrial customers because many process control systems, adjustable-speed drives, and PLCs are configured to trip offline (as a protective measure) at a voltage threshold well short of a complete loss of voltage, so a brief, remote fault that a typical customer wouldn't even notice can trip an entire production line and require a lengthy, costly restart.",
  },
  {
    id: "int-041",
    category: "analysis",
    question: "What is harmonic resonance, and why is it a risk when adding power factor correction capacitor banks?",
    difficulty: "hard",
    answer:
      "Harmonic resonance occurs when system capacitance (such as a power factor correction bank) and inductance (transformer/line/source impedance) form a parallel or series LC circuit whose resonant frequency coincides with, or is close to, a harmonic frequency present in the system (commonly the 5th, 7th, or 11th from nearby nonlinear loads). At parallel resonance, the impedance seen by harmonic current sources becomes very high, dramatically amplifying the voltage at that harmonic well beyond what the harmonic source alone would produce; at series resonance, harmonic current can be amplified instead. This is why adding a capacitor bank near known harmonic sources requires checking the resulting resonant frequency against the harmonic spectrum present, and why tuned (detuned) filter reactors are often added in series with capacitor banks specifically to shift the resonant point away from problematic harmonic orders.",
  },
  {
    id: "int-042",
    category: "analysis",
    question: "What reliability indices are commonly used to evaluate distribution system performance?",
    difficulty: "easy",
    answer:
      "Common distribution reliability indices include SAIFI (System Average Interruption Frequency Index — average number of sustained interruptions per customer per year), SAIDI (System Average Interruption Duration Index — average total outage duration per customer per year), and CAIDI (Customer Average Interruption Duration Index — average duration per interruption for customers who experienced one, equal to SAIDI/SAIFI). Utilities track these indices over time, often benchmark against peer utilities, and use them to prioritize reliability investment (automation, tree trimming, equipment replacement) on the worst-performing circuits.",
  },
  {
    id: "int-043",
    category: "analysis",
    question: "Why does Newton-Raphson load flow need a Jacobian matrix, and what do its four sub-blocks represent?",
    difficulty: "hard",
    answer:
      "Newton-Raphson solves the nonlinear power balance equations by linearizing them around the current voltage/angle estimate using a first-order Taylor expansion. The Jacobian matrix contains the partial derivatives of the mismatch equations with respect to the unknowns, structured in four sub-blocks: ∂P/∂δ, ∂P/∂|V|, ∂Q/∂δ, and ∂Q/∂|V|. Physically, ∂P/∂δ and ∂Q/∂|V| are the dominant, strongly coupled terms (real power is most sensitive to angle differences, reactive power to voltage magnitude), while ∂P/∂|V| and ∂Q/∂δ are comparatively weak (this weak coupling is exactly what the fast-decoupled load flow method exploits, dropping the weak cross-terms to solve two smaller, faster decoupled P-δ and Q-V subproblems).",
  },
  {
    id: "int-044",
    category: "analysis",
    question: "What is the difference between a short, medium, and long transmission line model, and what determines which to use?",
    difficulty: "medium",
    answer:
      "The appropriate model depends on physical line length: short lines (under about 80 km/50 mi) neglect shunt capacitance entirely and use a single series impedance Z = R+jX. Medium lines (80–250 km/50–150 mi) include shunt capacitance as two lumped capacitors, giving the nominal-π model (Y/2 at each end, full series Z between). Long lines (over about 250 km/150 mi) require the parameters to be treated as genuinely distributed, using hyperbolic correction factors based on the propagation constant and characteristic impedance to derive an equivalent-π model that exactly reproduces distributed-parameter terminal behavior. Most commercial software applies the long-line correction automatically once a threshold length is exceeded.",
  },
  {
    id: "int-045",
    category: "analysis",
    question: "Why is fault current from inverter-based resources (wind, solar, storage) fundamentally different from synchronous generator fault current, and what challenge does this create for protection?",
    difficulty: "hard",
    answer:
      "A synchronous generator's fault current is governed by its physical subtransient/transient/synchronous reactance sequence, typically several multiples of rated current immediately after a fault. Inverter-based resources are current-limited by their power electronics to protect semiconductor devices, typically to only about 1.1–1.5 times rated current regardless of fault severity, and the fault current's phase angle relative to voltage can also differ from what a low-impedance synchronous source would produce. This is a major and evolving challenge because traditional overcurrent-based protection (and even some distance/directional schemes) assumes fault current several times rated load current to reliably distinguish faults from normal operation and to establish directional sensing — as inverter-based resource penetration grows, protection schemes increasingly need updated coordination philosophies, communication-assisted schemes, or voltage-based (rather than pure overcurrent) detection methods.",
  },

  // ================= PROTECTION (15) =================
  {
    id: "int-046",
    category: "protection",
    question: "What are the four classic requirements of a good protection scheme, and how are they sometimes in tension with each other?",
    difficulty: "medium",
    answer:
      "The four requirements are sensitivity (detecting the smallest/most remote fault within the intended zone with margin above normal load), selectivity (isolating only the faulted element, leaving the rest of the system in service), speed (minimizing fault clearing time to limit equipment damage and preserve stability), and reliability, composed of dependability (operating when it should) and security (not operating when it shouldn't). These are frequently in tension: maximizing speed for every device would sacrifice selectivity/coordination between adjacent zones; maximizing sensitivity risks reduced security (nuisance tripping on load or inrush); and redundancy improves dependability but adds cost and complexity. Good protection engineering is a deliberate balancing of these competing objectives, not a maximization of any single one.",
  },
  {
    id: "int-047",
    category: "protection",
    question: "What is the difference between dependability and security in protective relaying, and how is redundancy used to address them?",
    difficulty: "medium",
    answer:
      "Dependability is the certainty that a relay will operate correctly for faults within its intended zone — a failure to trip when it should is a dependability-type misoperation. Security is the certainty that a relay will not operate for conditions outside its intended zone — an incorrect trip is a security-type misoperation. These two properties often trade off against each other in individual relay settings, but redundancy (primary and backup protection, ideally using different measuring principles or manufacturers) is the standard system-level mitigation for dependability risk, since a single point of failure in primary protection is then covered by an independent backup path.",
  },
  {
    id: "int-048",
    category: "protection",
    question: "Explain the principle of differential (unit) protection and why it can operate instantaneously without needing to coordinate with other relays.",
    difficulty: "medium",
    answer:
      "Differential protection compares current entering a protected zone against current leaving it, using Kirchhoff's current law: under normal conditions or an external (through) fault, current in equals current out; for an internal fault, current is diverted into the fault, producing a measurable differential current the relay uses to trip. Because the protected zone boundary is precisely defined by CT locations rather than a time or impedance reach setting, differential protection only responds to faults strictly within its own zone and is inherently unaffected by conditions elsewhere on the system. This means it doesn't need a coordination time delay to avoid overreaching into an adjacent zone, so it can trip essentially instantaneously — this is why it's called 'unit protection.'",
  },
  {
    id: "int-049",
    category: "protection",
    question: "Why do percentage (biased/restrained) differential relays use a restraint current, rather than tripping on any nonzero differential current?",
    difficulty: "hard",
    answer:
      "CTs on either side of a protected zone are never perfectly identical — different ratios (especially for transformer differential, where primary/secondary rated currents differ), manufacturing tolerances, and differing saturation behavior under heavy through-fault current all produce a small differential current even during normal load or a genuine external fault. Percentage differential relays compare the differential (operating) current against a restraint current (typically the average or sum of the in/out current magnitudes) and require the differential to exceed a percentage of the restraint before tripping, with the percentage slope increasing at higher restraint current specifically because CT error and saturation risk grow with fault magnitude. This makes the relay progressively more tolerant of CT-mismatch-driven differential current exactly when it's most likely (heavy through-faults), while remaining sensitive to genuine internal faults.",
  },
  {
    id: "int-050",
    category: "protection",
    question: "Why must transformer differential protection use second-harmonic restraint, and what causes the phenomenon it's guarding against?",
    difficulty: "hard",
    answer:
      "When a transformer is first energized, it can draw a large, transient magnetizing inrush current (8–12 times rated current, decaying over seconds) as the core briefly saturates before settling into normal steady-state magnetization. This inrush current flows into the transformer but not out the other side, so it looks like an internal fault from a pure differential-current-magnitude standpoint, but it isn't one. Inrush current is characteristically rich in second-harmonic content (often 20-60%+ of the fundamental), while genuine internal fault current is nearly pure fundamental frequency. Second-harmonic restraint/blocking exploits this distinction: the relay blocks or restrains tripping whenever second-harmonic content in the differential current exceeds a set threshold, preventing nuisance trips on normal energization while still tripping promptly for real internal faults.",
  },
  {
    id: "int-051",
    category: "protection",
    question: "Explain the difference between high-impedance and low-impedance bus differential protection schemes.",
    difficulty: "hard",
    answer:
      "Bus differential protection sums current from every circuit connected to a bus and checks whether the vector sum is zero. Because a bus can have many connected circuits, each with its own CT and its own small saturation/ratio error, the sum of many individually small CT errors can become large during a heavy external fault, risking a false trip. High-impedance schemes deliberately use a high relay-circuit impedance so that CT saturation during an external fault drives voltage down (limiting current into the relay circuit) rather than producing a false differential trip signal, but they require dedicated, matched CTs specifically for the bus protection zone. Low-impedance (numerical, percentage-restrained, multi-CT) schemes use digital processing to compare and restrain each circuit's current individually, offering more flexibility for buses with many circuits or changing configurations and the ability to share CTs with other protection functions, at somewhat greater setting complexity.",
  },
  {
    id: "int-052",
    category: "protection",
    question: "What is Coordination Time Interval (CTI), and how is it used in time-overcurrent coordination?",
    difficulty: "easy",
    answer:
      "CTI is the minimum time margin (typically 0.2–0.4 seconds) maintained between the operating time of adjacent protective devices at a given fault current level, ensuring the downstream (closer to the fault) device operates first, with the upstream device only acting as backup if the downstream device or its breaker fails. Devices are plotted on a common time-current coordination (TCC) curve (log-log axes), and CTI is checked across the full range of possible fault currents, not just one value, because fault current magnitude varies with system configuration.",
  },
  {
    id: "int-053",
    category: "protection",
    question: "Why is distance (impedance) protection preferred over simple overcurrent protection for transmission lines?",
    difficulty: "medium",
    answer:
      "Simple overcurrent protection coordinates purely on current magnitude, which becomes unreliable on networks with sources at both ends or varying system configuration, because fault current magnitude can vary substantially depending on generation dispatch and system topology, making a stable, coordinated magnitude-based setting difficult to maintain. Distance protection instead measures apparent impedance Z = V/I at the relay, and because line impedance is proportional to distance for a uniform conductor, this directly indicates how far away a fault is, largely independent of fault current magnitude or source strength. This makes distance protection robust to changing system conditions in a way pure overcurrent protection is not, which is why it's the standard for transmission line protection.",
  },
  {
    id: "int-054",
    category: "protection",
    question: "Explain why distance protection is set in stepped zones (Zone 1, 2, 3) rather than a single reach setting.",
    difficulty: "medium",
    answer:
      "A distance relay cannot perfectly distinguish a fault at the very end of its own protected line from one just beyond it on the next line section, due to inevitable CT/VT and impedance measurement tolerances. Zone 1 is deliberately set to underreach (typically 80–90% of the protected line) and trips instantaneously, avoiding any risk of overreaching into the next line (a security failure). Zone 2 reaches further (120–150%, into the next line section) with a short time delay (0.2–0.3 s) to coordinate with the adjacent line's Zone 1, covering the remaining 10–20% of the local line plus providing remote backup for the start of the next line. Zone 3 reaches further still with a longer delay, providing more extensive remote backup, though it's used cautiously on meshed EHV systems due to load encroachment risk.",
  },
  {
    id: "int-055",
    category: "protection",
    question: "What is load encroachment in distance protection, and why has it made Zone 3 settings more cautious on modern systems?",
    difficulty: "hard",
    answer:
      "Load encroachment occurs when heavy system loading combined with depressed voltage produces an apparent impedance (V/I measured at the relay) that falls within the relay's Zone 3 impedance characteristic on the R-X plane, even though no actual fault exists. Because Zone 3 reaches far and is set with a long time delay for remote backup purposes, it's particularly susceptible to this false operation during stressed system conditions — exactly the conditions where a cascading, wide-area disturbance is already underway and an unwanted Zone 3 trip could make things dramatically worse (Zone 3 misoperations have contributed to real historical cascading blackouts). This has driven modern practice toward more conservative Zone 3 settings, load-encroachment blinders on the relay characteristic, or omitting Zone 3 entirely on heavily meshed transmission in favor of communication-assisted (pilot) schemes for remote backup instead.",
  },
  {
    id: "int-056",
    category: "protection",
    question: "What is a pilot (communication-assisted) protection scheme, and why is it needed in addition to stepped distance protection?",
    difficulty: "medium",
    answer:
      "Stepped distance protection alone has an inherent delay for faults near the far end of a line: the local relay's Zone 1 only covers 80–90% of the line, so a fault in the remaining portion is only cleared instantaneously once the far-end relay's own Zone 1 operates, with the near end waiting for its slower Zone 2. For lines where this delay is too slow for stability or safety, pilot schemes use a communication channel between line terminals so both ends can trip instantaneously for a fault anywhere on the entire line. Common schemes include permissive overreach transfer trip (POTT), permissive underreach transfer trip (PUTT), and directional comparison blocking (DCB), each with different logic and different fail-safe vs. fail-secure behavior if the communication channel is lost.",
  },
  {
    id: "int-057",
    category: "protection",
    question: "What is breaker failure protection (device 50BF), and how does it function?",
    difficulty: "medium",
    answer:
      "Breaker failure protection provides local backup for the case where a breaker receives a valid trip signal but fails to actually interrupt fault current (due to a mechanical or interrupting-medium failure). After a trip signal is issued, a breaker failure relay monitors whether current has actually been interrupted within an expected time window (typically a few cycles beyond normal interrupting time); if current persists, it declares a breaker failure and trips all surrounding breakers necessary to clear the fault from a wider area, since the failed breaker itself can no longer isolate the fault. This is faster and more targeted than relying purely on remote backup protection at a neighboring station, which would clear the fault eventually but by de-energizing a larger portion of the system for longer.",
  },
  {
    id: "int-058",
    category: "protection",
    question: "Why is CT saturation a significant concern in protection design, and how is it typically mitigated?",
    difficulty: "hard",
    answer:
      "A CT that saturates during a heavy fault current no longer accurately reproduces the primary current waveform on its secondary — the output becomes distorted, potentially under-representing the true fault magnitude or introducing harmonics the relay wasn't designed to expect. This can cause a relay to under-measure fault current (risking a dependability failure, not tripping when it should) or, in differential schemes with mismatched CT saturation on either side of a zone, produce a false differential signal (risking a security failure). Mitigation includes properly sizing CTs with adequate accuracy class and saturation voltage (e.g., the ANSI C-class rating) for the specific expected fault duty and burden, and, for percentage differential schemes, using restraint characteristics whose slope increases at higher current specifically to tolerate the increased CT error risk during heavy through-faults.",
  },
  {
    id: "int-059",
    category: "protection",
    question: "What is the difference between fuse-saving and fuse-blowing philosophy in distribution recloser-fuse coordination?",
    difficulty: "medium",
    answer:
      "In fuse-saving philosophy, an upstream recloser operates first on a fast (instantaneous) curve to try to clear a fault before the downstream fuse blows, since the majority of overhead distribution faults are temporary (lightning, tree contact, animals); if the fault clears during the recloser's open interval, service is restored to the whole feeder without any fuse replacement needed, at the cost of a brief system-wide voltage blink for all customers on the feeder. In fuse-blowing philosophy, the fuse is allowed to operate first (the recloser uses only its slower, delayed curve), isolating only the faulted lateral and minimizing the outage footprint for a permanent fault, but sacrificing the possibility of fuse-saving for temporary faults, and requiring a truck roll to replace the blown fuse even for what might have been a self-clearing temporary condition.",
  },
  {
    id: "int-060",
    category: "protection",
    question: "How does incident energy in an arc flash study relate to protective device clearing time, and why is this the most controllable variable in reducing arc flash hazard?",
    difficulty: "hard",
    answer:
      "Arc flash incident energy (per IEEE 1584 methodology) depends on available fault current, arc duration (i.e., protection clearing time), working distance, and equipment configuration. Of these, clearing time is the variable most directly controllable by the engineer, since fault current magnitude and equipment configuration are largely fixed by the system design and cannot easily be changed for a given piece of equipment, while protection settings can often be adjusted. This is the direct link between protection engineering and personnel safety: reducing clearing time (through faster relay settings, maintenance-mode switching that temporarily lowers instantaneous pickup, or zone-selective interlocking) directly and proportionally reduces calculated incident energy and the resulting PPE requirements for workers on that equipment.",
  },

  // ================= TOOLS: PSS/E (~7) =================
  {
    id: "int-061",
    category: "tools",
    tool: "psse",
    question: "What is the difference between a .raw file and a .dyr file in PSS/E, and how are they used together?",
    difficulty: "easy",
    answer:
      "A .raw file contains the power flow case data — every bus, generator, load, branch, transformer, shunt, and switched shunt with its power-flow-relevant parameters. A .dyr file contains dynamics data — the dynamic model records (generator, exciter, governor, stabilizer, and renewable/inverter models) attached to each generator bus for time-domain simulation. To run a dynamic simulation, the engineer first solves the .raw case as a power flow to establish the initial steady-state operating point, then loads the corresponding .dyr file, which must reference generator buses that actually exist and are correctly typed in the .raw case, before running the time-domain dynamic simulation.",
  },
  {
    id: "int-062",
    category: "tools",
    tool: "psse",
    question: "Why would a production engineering team automate PSS/E studies with PSSPY (Python) rather than run them manually through the GUI?",
    difficulty: "medium",
    answer:
      "Real planning studies frequently require running large numbers of similar cases — hundreds of contingency scenarios, sensitivity sweeps across a parameter range, or repeated studies as a base case evolves through a planning cycle — which would be impractical to click through manually in the GUI both for time and for consistency/reproducibility reasons. PSS/E exposes essentially its full functionality through a Python API (PSSPY, and a newer object-oriented API in recent versions), letting engineers script case building, solving, contingency analysis, and report generation as repeatable, version-controllable code. Comfort with this kind of automation is a genuine practical differentiator for planning roles, since manual GUI-only workflows don't scale to real study volumes.",
  },
  {
    id: "int-063",
    category: "tools",
    tool: "psse",
    question: "What is Automated Contingency Analysis (ACCC) in PSS/E, and what would you check for in its output?",
    difficulty: "medium",
    answer:
      "ACCC systematically applies a defined list of contingencies (typically N-1, sometimes N-1-1 or other combinations) to a base case, re-solving power flow for each and reporting any resulting thermal overloads or voltage violations. In reviewing ACCC output, an engineer should triage by severity (how far past the limit a violation is) and distinguish pre-existing (pre-contingency) violations from contingency-caused ones, since a stressed base case can produce thousands of flagged violations and not all are equally actionable or equally severe — effective use of ACCC output requires prioritization, not treating every flagged line as equally urgent.",
  },
  {
    id: "int-064",
    category: "tools",
    tool: "psse",
    question: "What dynamic model would you use to represent a round-rotor synchronous generator in PSS/E dynamic simulation, and how does it differ from the model for a salient-pole hydro unit?",
    difficulty: "hard",
    answer:
      "GENROU is the standard PSS/E dynamic model for round-rotor (cylindrical-rotor) synchronous machines, typical of steam and gas turbine generators, representing the machine's electrical dynamics including subtransient saliency effects appropriately for a uniform-air-gap rotor. GENSAL is the corresponding model for salient-pole machines, typical of hydro units, which explicitly accounts for the distinct direct-axis and quadrature-axis reluctance behavior that a salient-pole rotor produces and that GENROU does not represent. Selecting the wrong model type for a given machine's actual rotor construction produces electrically inaccurate dynamic response, particularly around subtransient and transient reactance behavior.",
  },
  {
    id: "int-065",
    category: "tools",
    tool: "psse",
    question: "A PSS/E power flow case fails to converge. What would you check first?",
    difficulty: "medium",
    answer:
      "First, review the solution diagnostic output to identify which specific bus or region is diverging rather than blindly increasing iteration limits or switching solution methods without diagnosis. Common root causes include a bus with an unrealistic or misconfigured load/generation value (often from a data entry error or unit mismatch), a badly conditioned or radial system missing a return path, generator reactive limits causing PV-to-PQ switching instability, or a genuinely infeasible operating point (demand exceeding available generation/import capability given the modeled constraints). Starting from a known-good, previously converged base case and applying changes incrementally, re-solving after each change, is the standard practical approach to isolate exactly which modification introduced the divergence.",
  },
  {
    id: "int-066",
    category: "tools",
    tool: "psse",
    question: "How would you use PSS/E to support an interconnection study for a new wind or solar plant, and what would you check for?",
    difficulty: "medium",
    answer:
      "The study typically starts from a base case representing the existing system, adding the proposed plant (with its collector system and interconnection facilities) and updating load/generation to reflect the study year's forecast. Power flow is run to check thermal and voltage limits at normal and N-1 contingency conditions, short-circuit analysis checks whether the plant's fault current contribution pushes any nearby breaker's duty above its rating, and dynamic simulation (using standardized WECC generic renewable models, referenced in the .dyr file) checks that the plant rides through defined disturbances per grid code requirements and doesn't destabilize the local or wider system. Any thermal, voltage, breaker duty, or stability violations identified become required system upgrades documented in the interconnection study report.",
  },
  {
    id: "int-067",
    category: "tools",
    tool: "psse",
    question: "Why might a .raw case saved in a newer version of PSS/E fail to open correctly in an older version, and how would you handle this in a multi-organization study?",
    difficulty: "easy",
    answer:
      "PSS/E's .raw and .dyr file formats have evolved over successive versions, particularly with expanded record formats to accommodate newer equipment types like renewable/inverter-based resource models, so a case saved in a newer version's format may include record structures an older version's parser doesn't recognize. In multi-organization studies (common in interconnection-wide or ISO-coordinated planning work), it's standard practice to explicitly confirm and align on the PSS/E version everyone is using for case exchange, or to save/export cases in an older, more broadly compatible format when sharing with organizations known to be on earlier versions.",
  },

  // ================= TOOLS: PSCAD (~7) =================
  {
    id: "int-068",
    category: "tools",
    tool: "pscad",
    question: "What is the fundamental difference between EMT (electromagnetic transient) simulation in PSCAD and RMS/phasor-domain simulation in PSS/E?",
    difficulty: "medium",
    answer:
      "RMS/phasor-domain simulation (as used in PSS/E) assumes the network operates in sinusoidal steady state at fundamental frequency at every instant, representing voltages and currents as slowly-varying phasor magnitudes and angles, with a simulation time step on the order of milliseconds — appropriate for wide-area stability and steady-state studies but unable to represent sub-cycle behavior. EMT simulation (as used in PSCAD/EMTDC) solves the actual instantaneous time-domain circuit equations at a much finer time step, typically tens of microseconds, capturing real switching harmonics, DC offset, traveling wave effects, and power-electronic converter switching behavior that a phasor-domain tool cannot represent at all. The trade-off is computational cost and modeled network size: EMT studies are typically limited to a local area of detailed interest with the wider system represented as a simplified equivalent.",
  },
  {
    id: "int-069",
    category: "tools",
    tool: "pscad",
    question: "Why is PSCAD the preferred tool for HVDC and FACTS studies rather than an RMS tool like PSS/E?",
    difficulty: "medium",
    answer:
      "HVDC converters and FACTS devices (STATCOMs, SVCs) rely fundamentally on power-electronic switching, and phenomena central to their performance — commutation failure in line-commutated HVDC converters, converter control interaction, harmonic generation, and fast transient response — are sub-cycle, switching-level behaviors that an RMS/phasor-domain tool's fundamental-frequency assumption cannot represent at all. PSCAD's EMT solver captures the actual instantaneous switching behavior and detailed converter control logic, making it the only appropriate tool for detailed HVDC/FACTS converter design, control tuning, and disturbance response studies, even though it can only practically model a limited local network extent compared to PSS/E's system-wide scale.",
  },
  {
    id: "int-070",
    category: "tools",
    tool: "pscad",
    question: "How would you represent 'the rest of the system' when building a PSCAD model of a specific converter station or plant interconnection?",
    difficulty: "hard",
    answer:
      "Since a full-detail EMT model of an entire interconnected transmission system is computationally impractical, the standard approach is to model only the local area of interest (the converter station, plant, and its immediate interconnection) in full EMT detail, and represent the remainder of the wider system as a simplified Thevenin equivalent — an equivalent source behind an equivalent impedance representing the short-circuit strength of the grid at that point. This equivalent impedance is often derived from a short-circuit study performed in an RMS tool like PSS/E. Getting the equivalent's strength (short-circuit ratio) right is critical, especially for weak-grid interconnection studies, since reusing a generic strong-grid equivalent for what is actually a weak interconnection point can produce misleadingly benign results.",
  },
  {
    id: "int-071",
    category: "tools",
    tool: "pscad",
    question: "What is a snubber circuit in a PSCAD power electronics model, and why is it needed?",
    difficulty: "hard",
    answer:
      "A snubber circuit is a small RC (or similar) network placed across a power electronic switch, both in real converter hardware and, correspondingly, in its PSCAD model, primarily to aid numerical stability during the switch's transition instants. In simulation, an ideal switch changing state instantaneously can cause the solver's admittance matrix to become singular or produce numerical oscillations ('chatter') at the switching instant; a properly sized snubber provides a well-conditioned path that keeps the numerical solution stable across the transition, mirroring the role snubbers play in real hardware to limit voltage/current stress during switching.",
  },
  {
    id: "int-072",
    category: "tools",
    tool: "pscad",
    question: "Why might a multi-inverter-plant control interaction study specifically require PSCAD rather than an RMS-domain screening study?",
    difficulty: "hard",
    answer:
      "Control interaction between multiple nearby inverter-based plants (or between an inverter-based plant and a weak grid) is fundamentally a fast, sub-cycle-to-few-cycle control-loop phenomenon — the individual plant controllers' response bandwidths and the electrical coupling between them at those frequencies determine whether the interaction is stable or grows into oscillation. An RMS-domain tool's fundamental-frequency phasor assumption cannot resolve these fast control dynamics or represent the detailed (often vendor-proprietary) inverter control logic involved, whereas PSCAD's EMT solver, combined with vendor-supplied detailed converter control models, can directly simulate the interaction and reveal instability that a wide-area RMS screening study would completely miss.",
  },
  {
    id: "int-073",
    category: "tools",
    tool: "pscad",
    question: "Why is simulation time step selection described as a genuine engineering decision in PSCAD rather than a default setting to leave alone?",
    difficulty: "medium",
    answer:
      "The time step must be small enough to resolve the fastest phenomena of interest — for detailed power-electronic switching studies, this typically means tens of microseconds, since a coarser step would simply miss fast switching transitions and their associated transients. But a very small time step also makes long-duration studies (which often need several seconds of simulated time to capture control system settling behavior after a disturbance) computationally expensive and slow to run. Choosing time step therefore requires balancing fidelity to the fastest relevant phenomenon against practical run time for the required simulated duration, and is a deliberate trade-off the engineer must justify for each study rather than a value to set once and forget.",
  },
  {
    id: "int-074",
    category: "tools",
    tool: "pscad",
    question: "What role do vendor-supplied 'black box' converter or wind turbine control models play in PSCAD studies, and what limitation do they introduce?",
    difficulty: "medium",
    answer:
      "For proprietary HVDC, FACTS, or wind/solar inverter products, the manufacturer commonly supplies a PSCAD component model of their actual control system (sometimes encrypted or compiled to protect intellectual property) for use in interconnection and system studies, since a generic or simplified controller model would not accurately capture the real product's specific control behavior — this is standard, expected industry practice for detailed interconnection studies. The limitation is that these black-box models restrict the studying engineer's visibility into the internal control logic, which can complicate troubleshooting when unexpected behavior appears in a study, since the engineer often cannot inspect or modify the internal control structure and must work with the vendor to investigate.",
  },

  // ================= TOOLS: ETAP (~6) =================
  {
    id: "int-075",
    category: "tools",
    tool: "etap",
    question: "What makes ETAP's integrated one-line model approach different from maintaining separate models for load flow, short-circuit, and protection coordination?",
    difficulty: "medium",
    answer:
      "In ETAP, a single one-line diagram and its associated equipment data (ratings, impedances, protective device settings) are shared across every analysis module — load flow, short-circuit, protective device coordination, arc flash, and more — rather than maintaining separate models per study type. This means updating a single piece of equipment data (say, a transformer impedance) automatically flows through to every dependent study, reducing the risk of inconsistency between studies. The trade-off is that a single incorrect piece of base data can silently propagate wrong results across every downstream module, which is why periodic model validation against as-built field data is standard practice on long-lived ETAP models.",
  },
  {
    id: "int-076",
    category: "tools",
    tool: "etap",
    question: "How does an ETAP arc flash study relate to the protective device coordination study on the same facility, and why must the two be kept consistent?",
    difficulty: "hard",
    answer:
      "Arc flash incident energy calculated per IEEE 1584 depends heavily on protection clearing time, which is directly determined by the same protective device settings used in the coordination study. If the coordination study and the arc flash study are built or updated independently, using different assumed relay/breaker settings, the arc flash results (and the PPE labeling requirements derived from them) can be based on stale or incorrect clearing times, understating the real hazard. Because ETAP's integrated model shares device data across both modules, the correct practice is to reconcile both studies against the same, current, as-set protective device settings whenever either is updated, rather than treating them as independent analyses.",
  },
  {
    id: "int-077",
    category: "tools",
    tool: "etap",
    question: "What is the practical difference between running a short-circuit study to the ANSI/IEEE standard versus the IEC standard in ETAP, and why does the choice matter?",
    difficulty: "hard",
    answer:
      "ANSI/IEEE and IEC short-circuit calculation methodologies use materially different calculation approaches and multiplying factors (for example, in how they handle motor contribution decrement, X/R-based asymmetry factors, and voltage factors), so the two methods can produce meaningfully different fault current results for the same system, and neither is simply a translation of the other. Equipment ratings and breaker duty verification must be checked against the calculation standard actually applicable to the project (driven by the region and the applicable equipment standards), so selecting the wrong methodology, especially common on international EPC projects mixing North American and international equipment/standards, is a consequential error that can lead to incorrectly validated (or incorrectly rejected) equipment ratings.",
  },
  {
    id: "int-078",
    category: "tools",
    tool: "etap",
    question: "Why is accurate motor starting data important in an ETAP motor starting study, beyond just steady-state motor ratings?",
    difficulty: "medium",
    answer:
      "A motor's steady-state (running) current and power factor are not representative of its behavior during starting — locked-rotor current is typically 5–8 times rated current, and this large inrush current, combined with the motor's low starting power factor, causes a significant voltage dip on the supplying system while the motor accelerates. Accurately predicting this voltage dip (and its impact on other connected loads, which may themselves be sensitive to undervoltage) requires modeling the motor's actual locked-rotor current and torque-speed starting characteristic, not just its nameplate running rating; using only steady-state data would significantly understate the transient voltage dip during starting.",
  },
  {
    id: "int-079",
    category: "tools",
    tool: "etap",
    question: "What is ETAP's Star (protective device coordination) module typically used for, and why is protective device library accuracy so critical to its results?",
    difficulty: "medium",
    answer:
      "The Star module builds and analyzes time-current coordination (TCC) curves across an entire facility's protection scheme — relays, breakers, fuses, and motor overloads — plotted together on a common log-log curve to verify selective, correctly coordinated operation with adequate margin at every fault current level. Because the analysis is only as good as the input device curves, the TCC curve family and settings entered for each device must accurately match the actual installed or specified device, including any field-modified settings; this is especially important for older electromechanical relays with non-standard curve shapes, where using a generic or default curve instead of the actual device's characteristic can produce a coordination study that looks correct on paper but does not reflect real installed protection behavior.",
  },
  {
    id: "int-080",
    category: "tools",
    tool: "etap",
    question: "In what type of engineering role would you expect to use ETAP daily, versus PSS/E or PSCAD, and why?",
    difficulty: "easy",
    answer:
      "ETAP is most heavily used in industrial, commercial, and EPC facility engineering roles, where the work centers on designing, protecting, and safety-analyzing a specific plant, substation, or building's electrical system end-to-end — load flow, short-circuit, protective device coordination, and arc flash all on one integrated facility model. PSS/E is more central to transmission planning and ISO/utility system-wide roles, focused on wide-area steady-state and dynamic stability studies across large interconnected networks. PSCAD is used in specialized roles focused on HVDC, FACTS, and detailed power-electronic or inverter-based-resource interconnection studies, where sub-cycle electromagnetic transient behavior is the object of study. The tools reflect genuinely different scopes of work, not just different vendors for the same task.",
  },

  // ================= BEHAVIORAL (10) =================
  {
    id: "int-081",
    category: "behavioral",
    question: "Describe a time you had to make a technical decision with incomplete data or conflicting requirements. How did you approach it?",
    difficulty: "medium",
    answer:
      "A strong answer identifies the specific conflict (e.g., cost vs. reliability margin, schedule vs. thorough validation), explains how you gathered the best available data or ran a sensitivity/bounding analysis to understand the range of possible outcomes rather than waiting for perfect information, and describes how you communicated the trade-off and its risks transparently to stakeholders rather than silently picking a side. Emphasize that you documented your assumptions and reasoning so the decision could be revisited if new information emerged, and that you erred toward conservative/safe choices when the downside of being wrong (equipment damage, safety risk) was asymmetric to the upside of being aggressive.",
  },
  {
    id: "int-082",
    category: "behavioral",
    question: "Tell me about a time you identified a safety issue or near-miss. What did you do?",
    difficulty: "medium",
    answer:
      "A strong answer describes recognizing a specific hazard (e.g., an outdated arc flash label, an incorrectly coordinated protective device, an unsafe field practice observed), the immediate action taken to control the risk (stopping work, flagging equipment, escalating urgently rather than deferring), and the follow-up to address the root cause rather than just the immediate symptom (updating the study, correcting the documentation, communicating the lesson to the broader team). It should also convey that raising safety concerns promptly, even when inconvenient or when it might be seen as slowing down a schedule, is treated as non-negotiable.",
  },
  {
    id: "int-083",
    category: "behavioral",
    question: "Describe a project where you had to balance a tight deadline against the risk of cutting corners on engineering rigor.",
    difficulty: "medium",
    answer:
      "A strong answer distinguishes between corners that could safely be cut (deferring a lower-priority sensitivity case, using a conservative bounding assumption instead of a full detailed study where the outcome is unlikely to change the decision) versus corners that could not (skipping validation of a safety-critical result, using stale data for a final deliverable). It should show proactive communication with stakeholders about what trade-offs were being made and why, rather than silently absorbing risk, and ideally an example of negotiating scope or schedule rather than simply accepting an unsafe compromise.",
  },
  {
    id: "int-084",
    category: "behavioral",
    question: "How do you approach learning a new tool, standard, or technical domain you haven't worked with before?",
    difficulty: "easy",
    answer:
      "A strong answer describes a structured approach: starting with the fundamentals/purpose of the tool or standard before diving into features, working through a small representative example end-to-end to build intuition, identifying knowledgeable colleagues or documentation to validate understanding rather than working in isolation, and deliberately seeking feedback on early work products. It's useful to give a concrete example — e.g., ramping up on a specific software package or standard for a new project — and to be honest about the learning curve involved rather than overstating instant mastery.",
  },
  {
    id: "int-085",
    category: "behavioral",
    question: "Tell me about a time you disagreed with a senior colleague's or supervisor's technical decision. How did you handle it?",
    difficulty: "medium",
    answer:
      "A strong answer shows the candidate raised the disagreement respectfully and with supporting technical reasoning (data, calculations, precedent) rather than simply asserting an opinion, sought to understand the other person's reasoning and any context they might not have had, and was willing to be persuaded if the senior colleague had information or experience that changed the picture. It should also acknowledge that ultimately deferring to a final decision (once genuinely heard) while documenting the concern is professionally appropriate, unless the disagreement involves a genuine safety issue, in which case escalation is warranted.",
  },
  {
    id: "int-086",
    category: "behavioral",
    question: "Describe a time you had to explain a complex technical result to a non-technical stakeholder.",
    difficulty: "easy",
    answer:
      "A strong answer describes tailoring the explanation to the audience's actual decision-making need rather than the full technical detail — for example, translating a load flow violation into 'this feeder will overload under peak summer conditions if we don't act,' with a visual (one-line diagram, simple chart) rather than raw numeric output. It should show the candidate checked for understanding and adjusted based on the stakeholder's questions rather than delivering a one-way technical briefing.",
  },
  {
    id: "int-087",
    category: "behavioral",
    question: "Tell me about a mistake you made in a study or design. How did you catch it and what did you learn?",
    difficulty: "medium",
    answer:
      "A strong answer takes ownership of a specific, real mistake (not a disguised humblebrag), explains how it was caught (ideally through the candidate's own diligence or a peer review/QA process, not solely by a downstream failure), what immediate corrective action was taken, and what process change was made afterward to reduce the chance of recurrence (a checklist item, an additional review step, a changed default assumption). This demonstrates both honesty and a systems-thinking approach to quality, rather than treating the mistake as purely a personal lapse.",
  },
  {
    id: "int-088",
    category: "behavioral",
    question: "How do you prioritize when you have multiple competing deadlines from different stakeholders?",
    difficulty: "easy",
    answer:
      "A strong answer describes a clear prioritization framework — considering safety/regulatory urgency first, then business/schedule impact, then effort required — and proactive communication with stakeholders about realistic timelines rather than silently overcommitting. It's valuable to give a specific example where the candidate had to say no or renegotiate a deadline, and to show they communicated the trade-off clearly rather than letting quality silently slip on a deprioritized item.",
  },
  {
    id: "int-089",
    category: "behavioral",
    question: "Describe your experience working with cross-functional teams (e.g., protection engineers, planners, field crews, or project managers) on a single project.",
    difficulty: "easy",
    answer:
      "A strong answer gives a specific example illustrating how the candidate's work depended on or fed into other disciplines' work (e.g., a planning study's assumptions needing validation from a protection engineer, or a design change requiring field crew input on constructability), and shows proactive, early communication with those other functions rather than working in isolation and discovering integration problems late. It should highlight respect for other disciplines' expertise and a collaborative, not purely transactional, working style.",
  },
  {
    id: "int-090",
    category: "behavioral",
    question: "Why are you interested in power systems engineering, and what draws you to this specific role?",
    difficulty: "easy",
    answer:
      "A strong answer connects genuine technical interest (a specific area of power systems the candidate finds compelling, ideally illustrated with a concrete example of something they studied or worked on) to the tangible, real-world impact of the grid (reliability, the energy transition, public safety), and ties that interest specifically to what this particular role or company does, showing the candidate has done real research into the position rather than giving a generic answer that could apply to any employer.",
  },
];
