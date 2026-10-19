
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const typeColors = {
  "full-time": {
    label: "Full-time",
    style: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  },
  internship: {
    label: "Internship",
    style: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  program: {
    label: "Program",
    style: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
  ambassador: {
    label: "Ambassador",
    style: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
};

const ExperienceCard = ({ experience, index, isActive, onClick }) => {
  const type =
    typeColors[experience.type] || typeColors["full-time"];

  return (
    <motion.div
      layout
      variants={fadeIn("up", "tween", index * 0.06, 0.35)}
      className={`relative overflow-hidden rounded-xl border transition-colors duration-300 ${isActive
          ? "border-indigo-500/30 bg-[#151030]/60"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"
        }`}
    >
      {/* Active accent */}
      <div
        className={`absolute inset-y-0 left-0 w-[2px] transition-colors ${isActive ? "bg-indigo-400" : "bg-transparent"
          }`}
      />

      <button
        type="button"
        onClick={onClick}
        aria-expanded={isActive}
        className="w-full px-4 py-4 text-left sm:px-5"
      >
        <div className="flex items-center gap-3">
          {/* Company logo */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#1a1a2e]">
            <img
              src={experience.icon}
              alt={`${experience.company_name} logo`}
              className="h-7 w-7 object-contain"
              loading="lazy"
            />
          </div>

          {/* Role and company */}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold leading-snug text-white sm:text-[15px]">
              {experience.title}
            </h3>

            <p className="mt-1 truncate text-xs text-indigo-300">
              {experience.company_name}
            </p>
          </div>

          {/* Type and expand indicator */}
          <div className="flex shrink-0 flex-col items-end gap-2">
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] ${type.style}`}
            >
              {type.label}
            </span>

            <motion.span
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-xs text-white/40"
            >
              ↓
            </motion.span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 pl-[52px] text-[11px] text-[#aaa6c3]">
          <span className="font-mono">{experience.date}</span>

          {experience.location && (
            <>
              <span className="text-white/20">·</span>
              <span>{experience.location}</span>
            </>
          )}

          {experience.promoted && (
            <span className="text-amber-300">· Promoted</span>
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.28, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <div className="mx-4 border-t border-white/[0.07] px-1 pb-4 pt-3 sm:mx-5">
              <ul className="space-y-2">
                {experience.points.map((point, i) => (
                  <li
                    key={`${experience.company_name}-${i}`}
                    className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#aaa6c3]"
                  >
                    <span className="mt-0.5 text-indigo-400">›</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} font-mono text-indigo-400`}>
          // where I've worked
        </p>
        <h2 className={styles.sectionHeadText}>Experience.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "tween", 0.1, 0.4)}
        className="mt-8 space-y-3"
      >
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={`${exp.company_name}-${exp.title}-${i}`}
            experience={exp}
            index={i}
            isActive={activeIndex === i}
            onClick={() =>
              setActiveIndex((current) => (current === i ? -1 : i))
            }
          />
        ))}
      </motion.div>

      <motion.p
        variants={fadeIn("", "tween", 0.2, 0.4)}
        className="mt-4 text-[11px] text-white/30"
      >
        Select an experience to view responsibilities.
      </motion.p>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
