import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { styles } from "../styles";

const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    let animId;
    const draw = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - d / 160)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2);
        gradient.addColorStop(0, "rgba(99,102,241,0.8)");
        gradient.addColorStop(1, "rgba(99,102,241,0)");
        ctx.fillStyle = gradient;
        ctx.arc(n.x, n.y, n.r * 2, 0, Math.PI * 2);
        ctx.fill();

        // Move
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      aria-hidden="true"
    />
  );
};

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-28 lg:pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />

      {/* Network animation canvas */}
      <HeroCanvas />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] lg:w-[600px] h-[320px] sm:h-[500px] lg:h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto ${styles.paddingX} w-full`}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-4 sm:mb-6"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-emerald-400 text-[11px] sm:text-[12px] font-mono font-medium tracking-wider">
              Available for opportunities
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-black leading-[1.15] sm:leading-[1.08] tracking-tight text-white break-words">
            Building Products at the{" "}
            <br className="hidden sm:inline" />
            <span className="accent-gradient-text inline">
              Intersection of Full-Stack
            </span>{" "}
            <br className="hidden md:inline" />
            <span className="accent-gradient-text inline">
              Engineering & Blockchain.
            </span>
          </h1>
        </motion.div>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 sm:mt-6 text-sm xs:text-base sm:text-lg lg:text-xl text-[#aaa6c3] max-w-2xl leading-relaxed font-light"
        >
          Full Stack Blockchain Developer focused on building production-ready
          web, mobile, and Web3 applications — from feature implementation through deployment.
        </motion.p>

        {/* Terminal snippet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 sm:mt-8 inline-flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg glass border border-white/[0.08] font-mono text-[11px] xs:text-[12px] sm:text-[13px] max-w-full overflow-x-auto"
        >
          <span className="text-[#f59e0b] select-none">›</span>
          <span className="text-emerald-400">const</span>
          <span className="text-white">dev</span>
          <span className="text-white/50">=</span>
          <span className="text-indigo-300 whitespace-nowrap">{`{ stack: "FullStack + Web3", ship: true }`}</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 items-center"
        >
          <a
            href="#projects"
            id="hero-view-projects"
            className="w-full xs:w-auto text-center magnetic-btn px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-[14px] sm:text-[15px] hover:shadow-lg hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 active:scale-95"
          >
            View Projects
          </a>
          <a
            href="https://github.com/BhavsarShubham"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-github"
            className="w-full xs:w-auto justify-center magnetic-btn px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-white/20 text-white font-semibold text-[14px] sm:text-[15px] hover:border-indigo-400/50 hover:bg-indigo-500/10 transition-all duration-300 flex items-center gap-2 active:scale-95"
          >
            <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
          <a
            href="#contact"
            id="hero-lets-connect"
            className="w-full xs:w-auto justify-center py-2 xs:py-0 text-[#aaa6c3] text-[14px] sm:text-[15px] font-medium hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
          >
            Let's Connect
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 sm:mt-12 flex flex-wrap gap-1.5 sm:gap-2"
          aria-label="Core technologies"
        >
          {["React.js", "Next.js", "TypeScript", "Node.js", "Blockchain", "React Native"].map((tech) => (
            <span
              key={tech}
              className="px-2.5 sm:px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] sm:text-[12px] text-[#aaa6c3] font-mono hover:border-indigo-500/40 hover:text-white transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 hidden xl:flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[11px] text-white/30 font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
