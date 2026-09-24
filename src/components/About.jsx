import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const pillars = [
  {
    label: "Full Stack",
    desc: "End-to-end product delivery: frontend, backend, APIs, and mobile.",
    icon: "⬡",
    color: "indigo",
  },
  {
    label: "Blockchain",
    desc: "Blockchain wallets, smart contracts, and decentralized applications.",
    icon: "⬡",
    color: "emerald",
  },
  {
    label: "Production",
    desc: "Debugging live issues, owning features from scoping to deployment.",
    icon: "⬡",
    color: "amber",
  },
  {
    label: "Mobile",
    desc: "Cross-platform React Native apps targeting iOS and Android.",
    icon: "⬡",
    color: "purple",
  },
];

const colorMap = {
  indigo: {
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/5",
    text: "text-indigo-400",
    dot: "bg-indigo-500",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    text: "text-emerald-400",
    dot: "bg-emerald-500",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    text: "text-amber-400",
    dot: "bg-amber-500",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/5",
    text: "text-purple-400",
    dot: "bg-purple-500",
  },
};

const About = () => {
  return (
    <>
      {/* Section header */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-indigo-400 font-mono`}>
          // who I am
        </p>
        <h2 className={`${styles.sectionHeadText}`}>About.</h2>
      </motion.div>

      {/* Summary */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 grid lg:grid-cols-2 gap-10"
      >
        <div className="space-y-5">
          <p className="text-[#aaa6c3] text-[17px] leading-[30px]">
            Full Stack Developer with production experience building web and mobile
            applications using{" "}
            <span className="text-white font-medium">
              React.js, Next.js, Node.js, and TypeScript
            </span>{" "}
            — with hands-on blockchain development experience building{" "}
            <span className="text-indigo-300 font-medium">
              Blockchain wallet systems and smart contracts
            </span>
            .
          </p>
          <p className="text-[#aaa6c3] text-[17px] leading-[30px]">
            I've worked across the full product stack: implementing features,
            integrating production APIs, building cross-platform mobile apps,
            writing automated tests, debugging live issues, and shipping features
            end-to-end. Currently based in India, I build at the intersection
            of modern web engineering and Web3.
          </p>

          {/* Location + Stack line */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-[13px] text-[#aaa6c3] font-mono">
              <span className="text-emerald-400">📍</span>
              India
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-1.5 text-[13px] text-[#aaa6c3] font-mono">
              <span className="text-indigo-400">⚡</span>
              Full Stack · Web3 · Mobile
            </div>
          </div>
        </div>

        {/* Engineering journey quick timeline */}
        <div className="space-y-3">
          <p className="text-[12px] font-mono text-white/40 uppercase tracking-wider mb-4">
            Engineering Journey
          </p>
          {[
            { year: "2020", event: "Started BCA — North Maharashtra University" },
            { year: "2023", event: "Began MCA — Savitribai Phule Pune University" },
            { year: "Jun '24", event: "Joined Timechain Labs (Summer Code Developer)" },
            { year: "Aug '24", event: "Blockchain Developer Intern" },
            { year: "Jun '25", event: "Developer Intern — production feature delivery" },
            { year: "Jan '26", event: "Promoted to Software Developer (Full-time)" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 group">
              <span className="text-[12px] font-mono text-indigo-400 w-14 shrink-0 pt-0.5">
                {item.year}
              </span>
              <div className="flex items-start gap-2.5 flex-1">
                <div className="w-px h-full min-h-[20px] bg-indigo-500/30 shrink-0 mt-1.5" />
                <p className="text-[14px] text-[#aaa6c3] group-hover:text-white transition-colors leading-snug">
                  {item.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pillar cards */}
      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((p, i) => {
          const c = colorMap[p.color];
          return (
            <motion.div
              key={p.label}
              variants={fadeIn("up", "spring", i * 0.15, 0.6)}
              className={`rounded-xl p-5 border ${c.border} ${c.bg} hover:scale-[1.02] transition-all duration-300 cursor-default`}
            >
              <div className={`w-2 h-2 rounded-full ${c.dot} mb-3`} />
              <h3 className={`text-[15px] font-bold ${c.text} mb-1.5`}>
                {p.label}
              </h3>
              <p className="text-[#aaa6c3] text-[13px] leading-snug">{p.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
