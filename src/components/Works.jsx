import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const ExternalIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const HackathonCard = ({ project }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0.1, 0.7)}
    className="relative rounded-2xl overflow-hidden border border-amber-500/40 bg-gradient-to-br from-[#1a1200] to-[#0d0d1a] col-span-full"
    aria-label={`Featured project: ${project.name}`}
  >
    {/* Glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-indigo-500/5 pointer-events-none" aria-hidden="true" />

    <div className="relative p-8 md:p-10">
      {/* Badge */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[12px] font-bold font-mono tracking-wider uppercase">
          🏆 Hackathon Winner
        </span>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[12px] font-mono">
          Featured Project
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left */}
        <div>
          <h3 className="text-[28px] md:text-[32px] font-black text-white leading-tight">
            {project.name}
          </h3>
          <p className="text-amber-400 font-mono font-semibold mt-1 mb-4 text-[14px] tracking-wider uppercase">
            {project.tagline}
          </p>
          <p className="text-[#aaa6c3] text-[15px] leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag.name}
                className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[12px] text-[#aaa6c3] font-mono"
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-6">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white text-[13px] font-medium hover:bg-white/[0.05] transition-all duration-200"
                aria-label={`GitHub for ${project.name}`}
              >
                <GitHubIcon />
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Right - 48hr flow */}
        <div className="space-y-4">
          <p className="text-[12px] font-mono text-white/40 uppercase tracking-wider">Build Timeline</p>
          {[
            { step: "00:00", label: "Hackathon Start", color: "text-indigo-400" },
            { step: "12:00", label: "Core Architecture", color: "text-purple-400" },
            { step: "24:00", label: "BSV Integration & Smart Contracts", color: "text-emerald-400" },
            { step: "36:00", label: "UI Polish & Testing", color: "text-amber-400" },
            { step: "48:00", label: "Submission → 1st Place / 64 Teams 🏆", color: "text-amber-300" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className={`text-[12px] font-mono w-12 shrink-0 pt-0.5 ${item.color}`}>
                {item.step}
              </span>
              <div className="flex items-center gap-2.5 flex-1">
                <div className="w-px h-5 bg-white/10" />
                <p className={`text-[14px] font-medium ${item.color}`}>{item.label}</p>
              </div>
            </div>
          ))}

          {/* Stat boxes */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { n: "48", sub: "Hours" },
              { n: "1st", sub: "Place" },
              { n: "64", sub: "Teams" },
            ].map((s) => (
              <div
                key={s.sub}
                className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-center"
              >
                <p className="text-[28px] font-black text-amber-300 leading-none">{s.n}</p>
                <p className="text-[11px] text-amber-500 font-mono mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.6)}
    className="project-card rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-indigo-500/30 p-6 flex flex-col"
    aria-label={`Project: ${project.name}`}
  >
    <div className="flex items-start justify-between gap-3 mb-3">
      <div>
        <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="text-white text-[20px] font-bold mt-1 leading-tight">
          {project.name}
        </h3>
        <p className="text-[#aaa6c3] text-[13px] mt-0.5 font-mono">{project.tagline}</p>
      </div>
      <div className="flex gap-2 shrink-0">
        {project.github_link && (
          <a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-200"
            aria-label={`GitHub for ${project.name}`}
          >
            <GitHubIcon />
          </a>
        )}
        {project.live_link && (
          <a
            href={project.live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200"
            aria-label={`Live demo for ${project.name}`}
          >
            <ExternalIcon />
          </a>
        )}
      </div>
    </div>

    <p className="text-[#aaa6c3] text-[14px] leading-relaxed mb-4 flex-1">
      {project.description}
    </p>

    {/* Highlights */}
    <div className="space-y-1.5 mb-4">
      {project.highlights?.slice(0, 3).map((h, i) => (
        <div key={i} className="flex items-center gap-2 text-[12px] text-[#aaa6c3]">
          <span className="text-indigo-400 font-mono shrink-0">›</span>
          {h}
        </div>
      ))}
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
      {project.tags.slice(0, 4).map((tag) => (
        <span
          key={tag.name}
          className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-[#aaa6c3] font-mono"
        >
          {tag.name}
        </span>
      ))}
    </div>
  </motion.div>
);

const Works = () => {
  const featuredProject = projects.find((p) => p.hackathon);
  const regularProjects = projects.filter((p) => !p.hackathon);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-indigo-400 font-mono`}>
          // what I've built
        </p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[#aaa6c3] text-[17px] max-w-2xl leading-relaxed"
      >
        A selection of production work, blockchain products, and builds. Each project
        reflects real engineering decisions — not just UI.
      </motion.p>

      {/* Featured hackathon project */}
      {featuredProject && (
        <div className="mt-10">
          <HackathonCard project={featuredProject} />
        </div>
      )}

      {/* Regular projects grid */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {regularProjects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
