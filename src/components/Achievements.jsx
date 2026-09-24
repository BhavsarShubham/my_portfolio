import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { achievements, education } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

/* ─────────────────────────────────────────
   Custom SVG icons per certificate type
───────────────────────────────────────── */
const CertIcons = {
  trophy: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4a2 2 0 0 1-2-2V5h4" />
      <path d="M18 9h2a2 2 0 0 0 2-2V5h-4" />
      <path d="M6 2h12v10a6 6 0 0 1-12 0V2Z" />
      <path d="M12 18v4" />
      <path d="M8 22h8" />
    </svg>
  ),
  blockchain: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="6" height="6" rx="1" />
      <rect x="9" y="7" width="6" height="6" rx="1" />
      <rect x="16" y="7" width="6" height="6" rx="1" />
      <path d="M8 10h1M15 10h1" />
      <path d="M5 13v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
      <path d="M12 17v3" />
    </svg>
  ),
  aws: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4" />
      <path d="M12 4v12" />
      <path d="M8 8l4-4 4 4" />
      <path d="M3 12h18" />
    </svg>
  ),
  bootcamp: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  ai: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2Z" />
      <path d="M7.5 14.5s1.5 2 4.5 2 4.5-2 4.5-2" />
      <path d="M8 11h.01M16 11h.01" />
    </svg>
  ),
  bitcoin: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L10.5 19.25m1.267-.161-1.5-8.499m5.433 1.399c3.791.669 4.741-5.31.95-5.978m-.95 5.978L15.5 5.75m-4.733 5.087L9.5 2.75" />
    </svg>
  ),
  java: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 19.5s-1 .5-1 1.5 1.5 1 2.5.5" />
      <path d="M14.5 19.5s1 .5 1 1.5-1.5 1-2.5.5" />
      <path d="M9 12c0-2 .5-3 1.5-4.5S12 5 12 3s.5 3 1.5 4.5S15 10 15 12" />
      <path d="M6 14c2-1 4-1.5 6-1.5s4 .5 6 1.5" />
      <path d="M7 17c1.5-.5 3.5-1 5-1s3.5.5 5 1" />
    </svg>
  ),
  cpp: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4" />
      <path d="M14 8h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4" />
      <path d="M17 10v4M19 10v4" />
    </svg>
  ),
};

/* colour palette per icon key */
const iconStyles = {
  trophy:     { bg: "bg-amber-500/15",  border: "border-amber-500/40",  text: "text-amber-400"  },
  blockchain: { bg: "bg-indigo-500/15", border: "border-indigo-500/40", text: "text-indigo-400" },
  aws:        { bg: "bg-orange-500/15", border: "border-orange-500/40", text: "text-orange-400" },
  bootcamp:   { bg: "bg-purple-500/15", border: "border-purple-500/40", text: "text-purple-400" },
  ai:         { bg: "bg-pink-500/15",   border: "border-pink-500/40",   text: "text-pink-400"   },
  bitcoin:    { bg: "bg-amber-500/15",  border: "border-amber-500/40",  text: "text-amber-400"  },
  java:       { bg: "bg-red-500/15",    border: "border-red-500/40",    text: "text-red-400"    },
  cpp:        { bg: "bg-blue-500/15",   border: "border-blue-500/40",   text: "text-blue-400"   },
};

/* ─────────────────────────────────────────
   Certificate preview popup
───────────────────────────────────────── */
const CertModal = ({ item, onClose }) => {
  if (!item) return null;

  const IconComp = CertIcons[item.icon] || CertIcons.blockchain;
  const style = iconStyles[item.icon] || iconStyles.blockchain;

  // Convert the Google Drive view URL to an embed URL
  const embedUrl = item.certLink
    ? item.certLink.replace("/view", "/preview")
    : null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Certificate: ${item.title}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />

        {/* Modal panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0d0d1f] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`flex items-center gap-4 px-6 py-4 border-b border-white/[0.07] ${style.bg}`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${style.border} ${style.bg}`}>
              <IconComp className={`w-5 h-5 ${style.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] font-mono font-semibold ${style.text} uppercase tracking-wider`}>
                Certificate
              </p>
              <h3 className="text-white font-bold text-[16px] leading-tight truncate">
                {item.title}
              </h3>
              <p className="text-white/40 text-[12px] font-mono">{item.year} · {item.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {/* Open in new tab */}
              <a
                href={item.certLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 text-[12px] font-mono hover:border-indigo-500/40 hover:text-indigo-300 transition-all duration-200"
                aria-label="Open certificate in new tab"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open
              </a>
              {/* Close */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-200"
                aria-label="Close certificate preview"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Google Drive iframe embed */}
          <div className="relative w-full" style={{ height: "min(70vh, 540px)" }}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full h-full border-0 bg-white/5"
                title={`${item.title} certificate`}
                allow="autoplay"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white/40 text-[14px] font-mono">No preview available.</p>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="px-6 py-3 border-t border-white/[0.06] flex justify-between items-center">
            <p className="text-white/30 text-[11px] font-mono">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/50">Esc</kbd> or click outside to close
            </p>
            <a
              href={item.certLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[12px] font-mono font-medium ${style.text} hover:underline`}
            >
              View on Google Drive →
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────
   Main section
───────────────────────────────────────── */
const Achievements = () => {
  const [activeCert, setActiveCert] = useState(null);

  const featured = achievements.find((a) => a.highlight);
  const others = achievements.filter((a) => !a.highlight);

  // Close modal on Escape key
  React.useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setActiveCert(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* Section header */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-indigo-400 font-mono`}>
          // wins &amp; certifications
        </p>
        <h2 className={styles.sectionHeadText}>Achievements.</h2>
      </motion.div>

      {/* ── Featured hackathon achievement ── */}
      {featured && (
        <motion.div
          variants={fadeIn("up", "spring", 0.1, 0.7)}
          className="mt-8 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/5 to-indigo-500/5 p-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div
              className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl shrink-0"
              aria-hidden="true"
            >
              🏆
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                Featured Achievement
              </span>
              <h3 className="text-white text-[24px] font-black leading-tight mt-1">
                {featured.title}
              </h3>
              <p className="text-amber-400 font-semibold text-[16px] mt-0.5">
                {featured.subtitle}
              </p>
              <p className="text-[#aaa6c3] text-[14px] mt-1.5 font-mono">
                {featured.detail}
              </p>
            </div>
            <div className="flex flex-row sm:flex-col gap-3 sm:text-right">
              {[
                { n: "1st", label: "Place" },
                { n: "64",  label: "Teams" },
                { n: "48h", label: "Build" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-[22px] font-black text-amber-300">{s.n}</p>
                  <p className="text-[11px] text-amber-500 font-mono">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Certifications grid ── */}
      <motion.div variants={fadeIn("", "", 0.2, 1)} className="mt-8">
        <p className="text-[12px] font-mono text-white/40 uppercase tracking-wider mb-4">
          Certifications &amp; Training
          <span className="ml-2 normal-case text-indigo-400/60">— click to preview</span>
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {others.map((item, i) => {
            const IconComp = CertIcons[item.icon] || CertIcons.blockchain;
            const style = iconStyles[item.icon] || iconStyles.blockchain;
            const hasCert = !!item.certLink;

            return (
              <motion.button
                key={item.title}
                variants={fadeIn("up", "spring", i * 0.06, 0.5)}
                onClick={() => hasCert && setActiveCert(item)}
                className={`group text-left rounded-xl border p-4 transition-all duration-300 w-full
                  ${hasCert
                    ? "border-white/[0.07] bg-white/[0.02] hover:border-indigo-500/40 hover:bg-indigo-500/[0.05] cursor-pointer"
                    : "border-white/[0.05] bg-white/[0.01] cursor-default"
                  }`}
                aria-label={hasCert ? `View ${item.title} certificate` : item.title}
              >
                <div className="flex items-start gap-3">
                  {/* Custom icon */}
                  <div
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300
                      ${style.bg} ${style.border}
                      ${hasCert ? "group-hover:scale-110" : ""}
                    `}
                  >
                    <IconComp className={`w-4.5 h-4.5 ${style.text}`} style={{ width: "18px", height: "18px" }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-semibold leading-tight transition-colors duration-200 truncate
                      ${hasCert ? `group-hover:${style.text} text-white` : "text-white/60"}`}
                    >
                      {item.title}
                    </p>
                    <p className="text-[#aaa6c3] text-[11px] mt-0.5 truncate">{item.subtitle}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-white/30 text-[10px] font-mono">{item.year}</span>
                      {hasCert && (
                        <span className={`flex items-center gap-1 text-[10px] font-mono ${style.text} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Education ── */}
      <motion.div variants={fadeIn("", "", 0.3, 1)} className="mt-10">
        <p className="text-[12px] font-mono text-white/40 uppercase tracking-wider mb-4">
          Education
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              variants={fadeIn("up", "spring", i * 0.1, 0.6)}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-indigo-500/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-[14px] font-semibold leading-tight">{edu.degree}</p>
                  <p className="text-indigo-400 text-[13px] mt-1">{edu.institution}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[12px] text-[#aaa6c3] font-mono">{edu.duration}</span>
                    <span className="text-white/20">·</span>
                    <span className="text-emerald-400 text-[12px] font-mono font-semibold">
                      CGPA: {edu.cgpa}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Certificate modal ── */}
      {activeCert && (
        <CertModal item={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </>
  );
};

export default SectionWrapper(Achievements, "achievements");
