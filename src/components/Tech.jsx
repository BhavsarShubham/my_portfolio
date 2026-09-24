import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { skillCategories } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const colorMap = {
  "#6366f1": { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", tag: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300" },
  "#10b981": { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", tag: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" },
  "#f59e0b": { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", tag: "bg-amber-500/10 border-amber-500/20 text-amber-300" },
  "#ec4899": { bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-400", tag: "bg-pink-500/10 border-pink-500/20 text-pink-300" },
  "#3b82f6": { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", tag: "bg-blue-500/10 border-blue-500/20 text-blue-300" },
  "#8b5cf6": { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", tag: "bg-purple-500/10 border-purple-500/20 text-purple-300" },
};

const Tech = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-indigo-400 font-mono`}>
          // what I work with
        </p>
        <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[#aaa6c3] text-[17px] max-w-2xl leading-relaxed"
      >
        Organized by domain — not just a random badge wall.
        These are technologies I've used in production or built real projects with.
      </motion.p>

      {/* Category tabs */}
      <motion.div
        variants={fadeIn("", "", 0.2, 1)}
        className="mt-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Technology categories"
      >
        <button
          role="tab"
          aria-selected={activeCategory === null}
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 border ${
            activeCategory === null
              ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
              : "border-white/[0.08] text-[#aaa6c3] hover:border-white/20 hover:text-white"
          }`}
        >
          All
        </button>
        {skillCategories.map((cat) => {
          const c = colorMap[cat.color];
          return (
            <button
              key={cat.name}
              role="tab"
              aria-selected={activeCategory === cat.name}
              onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 border ${
                activeCategory === cat.name
                  ? `${c.bg} ${c.border} ${c.text}`
                  : "border-white/[0.08] text-[#aaa6c3] hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </motion.div>

      {/* Skills grid */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillCategories
          .filter((cat) => !activeCategory || cat.name === activeCategory)
          .map((cat, i) => {
            const c = colorMap[cat.color];
            return (
              <motion.div
                key={cat.name}
                variants={fadeIn("up", "spring", i * 0.1, 0.6)}
                className={`rounded-2xl border p-6 ${c.border} ${c.bg} transition-all duration-300`}
                role="region"
                aria-label={`${cat.name} technologies`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: cat.color }} />
                  <h3 className={`text-[15px] font-bold ${c.text} font-mono`}>
                    {cat.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`skill-tag px-2.5 py-1 rounded-lg border text-[12px] font-medium cursor-default ${c.tag}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* Primary tech highlight */}
      <motion.div
        variants={fadeIn("up", "", 0.4, 1)}
        className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
      >
        <p className="text-[12px] font-mono text-white/40 mb-4 uppercase tracking-wider">
          Primary Expertise
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "React.js", level: 90, color: "#6366f1" },
            { name: "TypeScript", level: 85, color: "#3b82f6" },
            { name: "Next.js", level: 80, color: "#6366f1" },
            { name: "Node.js", level: 78, color: "#10b981" },
            { name: "BSV Blockchain", level: 70, color: "#f59e0b" },
            { name: "React Native", level: 72, color: "#8b5cf6" },
          ].map((tech) => (
            <div key={tech.name} className="flex-1 min-w-[140px]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[13px] text-white font-medium">{tech.name}</span>
                <span className="text-[11px] font-mono" style={{ color: tech.color }}>
                  {tech.level}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tech.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
