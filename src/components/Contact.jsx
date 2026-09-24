import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn, textVariant } from "../utils/motion";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/BhavsarShubham",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
    label: "BhavsarShubham",
  },
  {
    name: "Email",
    url: "mailto:shubhambhavsar3311@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "shubhambhavsar3311@gmail.com",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/shubham-bhavsar",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "linkedin.com/in/shubham-bhavsar",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "ee406442-e21f-4105-b4ef-2aedf441acfd",
          ...form,
        }),
      });
      const result = await res.json();
      setLoading(false);
      if (result.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setLoading(false);
      setStatus("error");
    }
  };

  return (
    <>
      {/* Section header */}
      <motion.div variants={textVariant()} className="text-center mb-4">
        <p className={`${styles.sectionSubText} text-indigo-400 font-mono`}>
          // get in touch
        </p>
      </motion.div>

      {/* Big CTA headline */}
      <motion.div variants={fadeIn("up", "", 0.1, 0.8)} className="text-center mb-10">
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-tight">
          Have a product worth
          <br />
          <span className="accent-gradient-text">building?</span>
        </h2>
        <p className="mt-4 text-[18px] text-[#aaa6c3] font-light">
          Let's build something useful.
        </p>
      </motion.div>

      <div className="xl:mt-4 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
        {/* Form */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-white text-[13px] font-medium font-mono">Name</span>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-white/[0.04] border border-white/[0.08] py-3.5 px-5 text-white text-[14px] rounded-xl outline-none placeholder:text-white/30 focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all duration-200"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-white text-[13px] font-medium font-mono">Email</span>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="bg-white/[0.04] border border-white/[0.08] py-3.5 px-5 text-white text-[14px] rounded-xl outline-none placeholder:text-white/30 focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all duration-200"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-white text-[13px] font-medium font-mono">Message</span>
              <textarea
                rows={6}
                name="message"
                id="contact-message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                required
                className="bg-white/[0.04] border border-white/[0.08] py-3.5 px-5 text-white text-[14px] rounded-xl outline-none placeholder:text-white/30 focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all duration-200 resize-none"
              />
            </label>

            <button
              type="submit"
              id="contact-submit"
              disabled={loading}
              className="w-fit px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-[15px] hover:shadow-lg hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-emerald-400 text-[14px] font-mono">
                ✓ Message sent — I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-[14px] font-mono">
                ✗ Something went wrong. Try emailing directly.
              </p>
            )}
          </form>

          {/* Social links */}
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <p className="text-[12px] font-mono text-white/40 uppercase tracking-wider mb-4">
              Connect directly
            </p>
            <div className="space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  id={`contact-${link.name.toLowerCase()}`}
                  className="flex items-center gap-3 text-[#aaa6c3] hover:text-white transition-colors duration-200 group"
                  aria-label={`${link.name}: ${link.label}`}
                >
                  <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-[13px] font-mono">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Earth canvas */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[300px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
