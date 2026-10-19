import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { philosophyPillars } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const STEP_DURATION = 3500; // 3.5 seconds per automated stage

// Crisp inline SVG icons for each engineering pillar
const PillarIcons = {
  BUILD: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  ),
  TEST: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  DEBUG: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
    </svg>
  ),
  SHIP: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  LEARN: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
};

// Rich pillar configurations mapping to the automated engineering lifecycle
const pillarConfig = [
  {
    keyword: "BUILD",
    tag: "// 01 ARCHITECTURE & CRAFT",
    highlight: "Full-Surface Ownership",
    telemetryLog: "Compiling modular architecture & verifying domain contracts...",
    accent: {
      primary: "#6366f1",
      border: "border-indigo-500/25",
      activeBorder: "border-indigo-400",
      activeBg: "bg-indigo-500/10",
      badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      dot: "bg-indigo-400",
      progressGradient: "from-indigo-500 to-cyan-400",
      glowColor: "rgba(99, 102, 241, 0.28)",
      glowText: "text-indigo-400",
      shadow: "shadow-[0_0_35px_rgba(99,102,241,0.3)]",
    },
  },
  {
    keyword: "TEST",
    tag: "// 02 VERIFICATION & CI",
    highlight: "Quality as Default",
    telemetryLog: "Running automated suites & API contract tests: 100% verified...",
    accent: {
      primary: "#10b981",
      border: "border-emerald-500/25",
      activeBorder: "border-emerald-400",
      activeBg: "bg-emerald-500/10",
      badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      dot: "bg-emerald-400",
      progressGradient: "from-emerald-500 to-teal-400",
      glowColor: "rgba(16, 185, 129, 0.28)",
      glowText: "text-emerald-400",
      shadow: "shadow-[0_0_35px_rgba(16,185,129,0.3)]",
    },
  },
  {
    keyword: "DEBUG",
    tag: "// 03 OBSERVABILITY & METRICS",
    highlight: "Systematic Diagnosis",
    telemetryLog: "Tracing runtime telemetry, stack traces & latency anomalies...",
    accent: {
      primary: "#f59e0b",
      border: "border-amber-500/25",
      activeBorder: "border-amber-400",
      activeBg: "bg-amber-500/10",
      badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      dot: "bg-amber-400",
      progressGradient: "from-amber-500 to-rose-400",
      glowColor: "rgba(245, 158, 11, 0.28)",
      glowText: "text-amber-400",
      shadow: "shadow-[0_0_35px_rgba(245,158,11,0.3)]",
    },
  },
  {
    keyword: "SHIP",
    tag: "// 04 DELIVERY & DEPLOYMENT",
    highlight: "Production Ownership",
    telemetryLog: "Initiating canary release & zero-downtime production deployment...",
    accent: {
      primary: "#8b5cf6",
      border: "border-purple-500/25",
      activeBorder: "border-purple-400",
      activeBg: "bg-purple-500/10",
      badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      dot: "bg-purple-400",
      progressGradient: "from-purple-500 to-pink-400",
      glowColor: "rgba(139, 92, 246, 0.28)",
      glowText: "text-purple-400",
      shadow: "shadow-[0_0_35px_rgba(139,92,246,0.3)]",
    },
  },
  {
    keyword: "LEARN",
    tag: "// 05 CONTINUOUS EVOLUTION",
    highlight: "Cross-Domain Synergy",
    telemetryLog: "Synthesizing production insights & feeding telemetry back to Build...",
    accent: {
      primary: "#06b6d4",
      border: "border-cyan-500/25",
      activeBorder: "border-cyan-400",
      activeBg: "bg-cyan-500/10",
      badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      dot: "bg-cyan-400",
      progressGradient: "from-cyan-500 to-blue-400",
      glowColor: "rgba(6, 182, 212, 0.28)",
      glowText: "text-cyan-400",
      shadow: "shadow-[0_0_35px_rgba(6,182,212,0.3)]",
    },
  },
];

/**
 * Individual Automated Pipeline Card
 * Automatically responds to pipeline step transitions,
 * animates a real-time progress bar, and glows autonomously.
 */
const AutomatedPipelineCard = ({
  pillar,
  index,
  isActive,
  isPassed,
  isPaused,
  onSelect,
}) => {
  const isLastPillar = index === 4;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            damping: 18,
            stiffness: 120,
            delay: index * 0.08,
          },
        },
      }}
      animate={{
        y: isActive ? -8 : 0,
        scale: isActive ? 1.02 : 1,
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(index)}
      tabIndex={0}
      role="button"
      aria-label={`${pillar.keyword} pipeline stage: ${pillar.highlight}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(index);
        }
      }}
      className={`group relative flex flex-col justify-between rounded-2xl border p-5 md:p-6 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md ${
        isLastPillar ? "sm:col-span-2 lg:col-span-1" : ""
      } ${
        isActive
          ? `${pillar.accent.activeBorder} ${pillar.accent.activeBg} ${pillar.accent.shadow}`
          : isPassed
          ? "border-white/10 bg-white/[0.025]"
          : "border-white/[0.06] bg-white/[0.012] opacity-80 hover:opacity-100"
      }`}
    >
      {/* Automated Ambient Glow Pulse behind active card */}
      <div
        className={`pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-2xl`}
        style={{
          opacity: isActive ? 1 : 0,
          background: `radial-gradient(350px circle at 50% 20%, ${pillar.accent.glowColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Autonomous Scanline sweep when active */}
      {isActive && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "200%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent opacity-60"
          aria-hidden="true"
        />
      )}

      {/* Card Content Top Section */}
      <div className="relative z-10">
        {/* Top Header: Step Indicator & Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border transition-colors duration-300 ${
                isActive
                  ? pillar.accent.badge
                  : isPassed
                  ? "bg-white/10 text-white/80 border-white/20"
                  : "bg-white/[0.03] text-white/40 border-white/[0.06]"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Automation Status Badge */}
            {isActive ? (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ACTIVE</span>
              </span>
            ) : isPassed ? (
              <span className="text-[10px] font-mono text-cyan-300/80 flex items-center gap-0.5">
                <span>✓</span>
                <span className="hidden xs:inline">PASS</span>
              </span>
            ) : (
              <span className="text-[10px] font-mono text-white/30 hidden xs:inline">
                QUEUED
              </span>
            )}
          </div>

          {/* Icon Pill */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              isActive
                ? `${pillar.accent.activeBorder} bg-white/10 text-white shadow-md scale-110`
                : isPassed
                ? "border-white/15 bg-white/[0.04] text-white/80"
                : "border-white/[0.06] bg-white/[0.02] text-white/40"
            }`}
          >
            {PillarIcons[pillar.keyword] || null}
          </div>
        </div>

        {/* Pillar Keyword */}
        <h3
          className={`text-[22px] md:text-[24px] font-black tracking-tight font-mono transition-all duration-300 ${
            isActive ? `${pillar.accent.glowText} drop-shadow-sm` : "text-white"
          }`}
        >
          {pillar.keyword}
        </h3>

        {/* Micro Tag */}
        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1 mb-3">
          {pillar.tag}
        </p>

        {/* Description */}
        <p className="text-[13px] text-[#aaa6c3] leading-relaxed transition-colors duration-300">
          {pillar.description}
        </p>
      </div>

      {/* Card Content Bottom Section */}
      <div className="relative z-10 mt-6 pt-3 border-t border-white/[0.05] flex items-center justify-between">
        <span
          className={`text-[11px] font-mono transition-colors duration-300 ${
            isActive ? "text-white font-semibold" : "text-white/40"
          }`}
        >
          {pillar.highlight}
        </span>

        {/* Active Stage Beacon */}
        <span className="relative flex h-2 w-2">
          {isActive && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pillar.accent.dot}`}
            />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 transition-colors duration-300 ${
              isActive
                ? pillar.accent.dot
                : isPassed
                ? "bg-cyan-400/80"
                : "bg-white/10"
            }`}
          />
        </span>
      </div>

      {/* Automated Real-Time Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.05] overflow-hidden" aria-hidden="true">
        {isActive ? (
          <motion.div
            key={`progress-${index}-${isPaused}`}
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? "100%" : "100%" }}
            transition={{
              duration: isPaused ? 0 : STEP_DURATION / 1000,
              ease: "linear",
            }}
            className={`h-full bg-gradient-to-r ${pillar.accent.progressGradient} relative`}
          >
            {/* Sparkling laser head at leading edge of progress line */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </motion.div>
        ) : isPassed ? (
          <div
            className={`h-full w-full bg-gradient-to-r ${pillar.accent.progressGradient} opacity-50`}
          />
        ) : null}
      </div>
    </motion.div>
  );
};

const Philosophy = () => {
  const [activePillar, setActivePillar] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loopCount, setLoopCount] = useState(1);

  // Combine constant descriptions with enriched metadata
  const pillars = philosophyPillars.map((pillar, i) => ({
    ...pillar,
    ...pillarConfig[i],
    description: pillar.description || pillarConfig[i].description,
  }));

  // Automated process loop timer: cycles through BUILD -> TEST -> DEBUG -> SHIP -> LEARN -> BUILD
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActivePillar((prev) => {
        const next = (prev + 1) % pillars.length;
        if (next === 0) {
          setLoopCount((c) => c + 1);
        }
        return next;
      });
    }, STEP_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, pillars.length]);

  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <p className={`${styles.sectionSubText} text-indigo-400 font-mono tracking-widest uppercase`}>
            // AUTONOMOUS ENGINEERING CYCLE
          </p>
        </div>
        <h2 className={styles.sectionHeadText}>Engineering Philosophy.</h2>
      </motion.div>

      {/* Intro Description */}
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[#aaa6c3] text-[16px] md:text-[17px] max-w-2xl leading-relaxed"
      >
        Five automated, continuous stages of feature development: from full-surface architecture to rigorous automated testing, root-cause diagnosis, production rollout, and continuous feedback loop.
      </motion.p>

      {/* Live Automation Pipeline Status Bar */}
      <motion.div
        variants={fadeIn("up", "spring", 0.15, 0.7)}
        className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md"
      >
        {/* Left: Automation Status Indicator with Pause/Play toggle */}
        <div className="flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              {!isPaused && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isPaused ? "bg-amber-400" : "bg-emerald-500"
                }`}
              />
            </span>
            <span className="text-[12px] font-mono font-bold text-white tracking-wider">
              {isPaused ? "LOOP PAUSED" : "AUTOMATION RUNNING"}
            </span>
          </div>

          <span className="px-2 py-0.5 rounded text-[11px] font-mono text-white/50 border border-white/10 bg-white/[0.03]">
            CYCLE #{loopCount}
          </span>

          {/* User control: Pause or resume the automatic progression */}
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
            title={isPaused ? "Resume auto-loop" : "Pause auto-loop"}
          >
            {isPaused ? "▶ RESUME" : "⏸ PAUSE"}
          </button>
        </div>

        {/* Right: Pipeline Steps Visual Ticker */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
          {pillars.map((item, idx) => (
            <React.Fragment key={item.keyword}>
              <button
                type="button"
                onClick={() => {
                  setActivePillar(idx);
                }}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono transition-all duration-300 ${
                  activePillar === idx
                    ? `${item.accent.badge} font-bold shadow-sm scale-105`
                    : idx < activePillar
                    ? "text-white/70 bg-white/[0.04]"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                <span>{item.keyword}</span>
              </button>
              {idx < pillars.length - 1 && (
                <span
                  className={`text-[11px] font-mono transition-colors duration-300 select-none ${
                    idx < activePillar ? "text-emerald-400" : "text-white/20"
                  }`}
                >
                  →
                </span>
              )}
            </React.Fragment>
          ))}

          {/* Feedback loop arrow */}
          <span
            className={`text-[12px] font-mono ml-1 flex items-center gap-1 transition-colors duration-300 ${
              activePillar === 4 ? "text-cyan-400 animate-spin" : "text-white/30"
            }`}
            title="Looping back to Build"
          >
            ⟳
          </span>
        </div>
      </motion.div>

      {/* Live System Telemetry Terminal Line */}
      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.7)}
        className="mt-3 p-3 rounded-xl border border-white/[0.06] bg-[#070b1e]/80 font-mono text-[12px] flex items-center justify-between gap-3 overflow-hidden backdrop-blur-sm"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-indigo-400 font-bold shrink-0">&gt;_</span>
          <span className="text-white/40 shrink-0 hidden sm:inline">TELEMETRY:</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={activePillar}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-white/90 truncate font-mono"
            >
              <span className="text-indigo-400 mr-2 font-bold">
                [{pillars[activePillar].keyword}]
              </span>
              {pillars[activePillar].telemetryLog}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="hidden sm:flex items-center gap-2 shrink-0 text-[11px] text-white/40">
          <span>{activePillar + 1}/5</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </motion.div>

      {/* Cards Grid:
          - Automatically cycles through cards without user intervention
          - Desktop (lg:): 5 balanced columns in an assembly pipeline
          - Tablet (sm:): 2x2 grid + 5th item spanning 2 columns as the loop banner
          - Mobile: Single-column flow with active glow elevation
      */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {pillars.map((pillar, i) => (
          <AutomatedPipelineCard
            key={pillar.keyword}
            pillar={pillar}
            index={i}
            isActive={activePillar === i}
            isPassed={i < activePillar}
            isPaused={isPaused}
            onSelect={(idx) => {
              setActivePillar(idx);
            }}
          />
        ))}
      </div>

      {/* Bottom Continuous Loop Footer Note */}
      <motion.div
        variants={fadeIn("up", "spring", 0.35, 0.7)}
        className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-white/[0.06] bg-gradient-to-r from-indigo-500/[0.03] via-emerald-500/[0.03] to-cyan-500/[0.03]"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-indigo-400 text-sm font-mono shrink-0">
            ∞
          </div>
          <p className="text-[12px] md:text-[13px] text-[#aaa6c3] leading-snug">
            <span className="text-white font-medium">Autonomous Feedback Loop:</span> Each completed cycle tests, monitors, and feeds telemetry back into architecture, driving continuous quality without manual drag.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-white/40 self-end sm:self-auto shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ZERO-INTERVENTION LIFECYCLE</span>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Philosophy, "philosophy");


