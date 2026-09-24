import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { timechain } from "../assets";

const typeColors = {
  "full-time": { label: "Full-time", bg: "bg-indigo-500/15", text: "text-indigo-300", border: "border-indigo-500/30" },
  internship: { label: "Internship", bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30" },
  program: { label: "Program", bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/30" },
  ambassador: { label: "Ambassador", bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-500/30" },
};

const ExperienceCard = ({ experience, index, isActive, onClick }) => {
  const tc = typeColors[experience.type] || typeColors["full-time"];
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.6)}
      className={`relative cursor-pointer rounded-2xl border transition-all duration-400 overflow-hidden ${
        isActive
          ? "border-indigo-500/50 bg-[#151030]/80"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
      }`}
      onClick={onClick}
    >
      {/* Accent bar */}
      <div
        className={`absolute left-0 top-0 h-full w-0.5 transition-all duration-300 ${
          isActive ? "bg-gradient-to-b from-indigo-500 to-emerald-500 opacity-100" : "bg-white/10 opacity-50"
        }`}
      />

      <div className="px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Company logo */}
            <div className="w-10 h-10 rounded-xl bg-[#1a1a2e] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={experience.icon}
                alt={experience.company_name}
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <h3 className="text-white text-[16px] font-semibold leading-tight">
                {experience.title}
              </h3>
              <p className="text-indigo-400 text-[13px] mt-0.5 font-medium">
                {experience.company_name}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${tc.bg} ${tc.text} ${tc.border}`}>
              {tc.label}
            </span>
            {experience.promoted && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                ↑ Promoted
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          <span className="text-[12px] text-[#aaa6c3] font-mono">{experience.date}</span>
          {experience.location && (
            <>
              <span className="text-white/20">·</span>
              <span className="text-[12px] text-[#aaa6c3]">{experience.location}</span>
            </>
          )}
        </div>

        {/* Expand indicator */}
        <div className="flex items-center gap-1 mt-3">
          <span className={`text-[11px] font-mono transition-colors ${isActive ? "text-indigo-400" : "text-white/30"}`}>
            {isActive ? "— collapse" : "+ expand"}
          </span>
        </div>
      </div>

      {/* Expanded points */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-6"
        >
          <div className="border-t border-white/[0.06] pt-4">
            <ul className="space-y-2.5">
              {experience.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-[#aaa6c3] leading-relaxed">
                  <span className="text-indigo-400 mt-1 shrink-0 font-mono">›</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-indigo-400 font-mono`}>
          // where I've worked
        </p>
        <h2 className={styles.sectionHeadText}>Experience.</h2>
      </motion.div>

      {/* Timeline indicator */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 flex items-center gap-2 text-[13px] text-[#aaa6c3]"
      >
        <span className="font-mono text-indigo-400">Timechain Labs</span>
        <span className="text-white/20">·</span>
        <span>June 2024 → April 2026</span>
        <span className="text-white/20">·</span>
        <span className="text-emerald-400 font-mono">Intern → Full-time</span>
      </motion.div>

      <div className="mt-10 space-y-4">
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={i}
            experience={exp}
            index={i}
            isActive={activeIndex === i}
            onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
          />
        ))}
      </div>

      {/* Note */}
      <motion.p
        variants={fadeIn("", "", 0.4, 1)}
        className="mt-6 text-[12px] text-white/30 font-mono"
      >
        // Click any card to expand responsibilities
      </motion.p>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
