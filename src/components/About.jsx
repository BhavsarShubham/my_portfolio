
import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const pillars = [
  {
    label: "Full Stack",
    desc: "Building web applications, backend APIs, and complete product features from frontend to deployment.",
    color: "indigo",
  },
  {
    label: "Blockchain",
    desc: "Developing blockchain integrations, wallet systems, smart contracts, and Web3 applications.",
    color: "emerald",
  },
  {
    label: "Engineering",
    desc: "Integrating APIs, writing automated tests, debugging production issues, and shipping reliable features.",
    color: "amber",
  },
  {
    label: "Mobile",
    desc: "Building cross-platform React Native applications for iOS and Android.",
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

const journey = [
  {
    year: "2020",
    event: "Started BCA — North Maharashtra University",
  },
  {
    year: "2023",
    event: "Began MCA — Savitribai Phule Pune University",
  },
  {
    year: "Jun '24",
    event: "Joined Timechain Labs as a Summer Code Developer",
  },
  {
    year: "Aug '24",
    event: "Blockchain Developer Intern",
  },
  {
    year: "Jun '25",
    event: "Developer Intern — production feature delivery",
  },
  {
    year: "Jan '26",
    event: "Promoted to Software Developer (Full-time)",
  },
];

const About = () => {
  return (
    <>
      {/* Section heading */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} font-mono text-indigo-400`}>
          // who I am
        </p>
        <h2 className={styles.sectionHeadText}>About.</h2>
      </motion.div>

      {/* Introduction and experience */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12"
      >
        <div className="space-y-5">

          <p className="text-[16px] leading-[1.9] text-[#aaa6c3] sm:text-[17px]">
            I'm a{" "}
            <span className="font-medium text-white">
              Full Stack Developer
            </span>{" "}
            building web and mobile applications, with experience in{" "}
            <span className="font-medium text-indigo-300">
              n8n automation, software testing, and blockchain development
            </span>
            , including wallets and smart contracts.
          </p>

          <p className="text-[16px] leading-[1.9] text-[#aaa6c3] sm:text-[17px]">
            My work spans the full development lifecycle — from implementing
            features and integrating APIs to writing automated tests,
            debugging production issues, and delivering software end to end.
            I enjoy solving practical engineering problems and building
            products that are reliable, maintainable, and useful.
          </p>

          {/* Location and focus */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1">
            <span className="font-mono text-[13px] text-[#aaa6c3]">
              <span className="mr-1.5 text-emerald-400">📍</span>
              India
            </span>

            <span className="text-white/20">·</span>

            <span className="font-mono text-[13px] text-[#aaa6c3]">
              Full Stack · Web3 · Mobile
            </span>
          </div>

          {/* Professional links */}
          <div className="flex flex-wrap gap-3 pt-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg
                bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white
                transition-colors hover:bg-indigo-400
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-indigo-400"
            >
              Explore my work
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg
                border border-white/15 px-4 py-2.5 text-sm
                font-medium text-white transition-colors
                hover:border-indigo-400/50 hover:text-indigo-300
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-indigo-400"
            >
              Discuss a project
            </a>
          </div>
        </div>

        {/* Engineering journey */}
        <div>
          <p className="mb-5 font-mono text-[12px] uppercase tracking-wider text-white/40">
            Engineering Journey
          </p>

          <ol className="space-y-4">
            {journey.map((item, i) => (
              <motion.li
                key={`${item.year}-${item.event}`}
                variants={fadeIn("right", "spring", i * 0.08, 0.45)}
                className="grid grid-cols-[64px_1fr] gap-3"
              >
                <span className="pt-0.5 font-mono text-[12px] text-indigo-400">
                  {item.year}
                </span>

                <div className="border-l border-indigo-500/30 pl-3">
                  <p className="text-[14px] leading-relaxed text-[#aaa6c3] transition-colors hover:text-white">
                    {item.event}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>

      {/* Areas of expertise */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => {
          const c = colorMap[pillar.color];

          return (
            <motion.div
              key={pillar.label}
              variants={fadeIn("up", "spring", i * 0.12, 0.6)}
              className={`rounded-xl border p-5 ${c.border} ${c.bg}
                transition-transform duration-300
                hover:-translate-y-1`}
            >
              <div
                className={`mb-3 h-2 w-2 rounded-full ${c.dot}`}
                aria-hidden="true"
              />

              <h3 className={`mb-2 text-[15px] font-bold ${c.text}`}>
                {pillar.label}
              </h3>

              <p className="text-[13px] leading-relaxed text-[#aaa6c3]">
                {pillar.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
