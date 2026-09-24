import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { philosophyPillars } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const Philosophy = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-indigo-400 font-mono`}>
          // how I work
        </p>
        <h2 className={styles.sectionHeadText}>Engineering Philosophy.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[#aaa6c3] text-[17px] max-w-2xl leading-relaxed"
      >
        Five principles that guide how I approach every feature, bug, and deployment.
      </motion.p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {philosophyPillars.map((pillar, i) => (
          <motion.div
            key={pillar.keyword}
            variants={fadeIn("up", "spring", i * 0.1, 0.6)}
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all duration-400 cursor-default overflow-hidden"
          >
            {/* Index */}
            <span className="text-[10px] font-mono text-white/20 mb-3 block">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Keyword */}
            <h3 className="text-[22px] font-black text-white group-hover:text-transparent group-hover:accent-gradient-text transition-all duration-300 mb-3 tracking-tight font-mono">
              {pillar.keyword}
            </h3>

            {/* Description */}
            <p className="text-[13px] text-[#aaa6c3] leading-relaxed group-hover:text-white/70 transition-colors duration-300">
              {pillar.description}
            </p>

            {/* Hover accent */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-emerald-500 group-hover:w-full transition-all duration-500" aria-hidden="true" />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Philosophy, "philosophy");
