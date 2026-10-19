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

          <h1 className="text-[30px] min-[400px]:text-[34px] sm:text-5xl md:text-6xl lg:text-[66px] font-black leading-[1.08] tracking-[-0.04em] text-white">
            Building Products at the{" "}
            <br className="hidden sm:inline" />
            <span className="accent-gradient-text">
              Intersection of Full-Stack
            </span>{" "}
            <br className="hidden md:inline" />
            <span className="accent-gradient-text">
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


        {/* Shared width container */}
        <div className="w-full sm:max-w-[520px] lg:max-w-[560px]">


          {/* Responsive Terminal Snippet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 sm:mt-8 w-full max-w-full sm:max-w-[560px] overflow-hidden rounded-xl border border-indigo-400/20 bg-[#0b0e1c]/90 shadow-lg shadow-indigo-950/20"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.07]">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-red-400/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
              </div>

              <span className="text-[10px] font-mono text-white/35">
                developer.js
              </span>
            </div>

            {/* Code content */}
            <div className="flex items-start gap-2.5 px-3 py-3 sm:px-4 sm:py-3.5 font-mono text-[11px] min-[400px]:text-xs sm:text-[13px] leading-6">
              <span className="text-indigo-400 select-none shrink-0">›</span>

              <code className="min-w-0 flex-1 whitespace-normal break-words">
                <span className="text-emerald-400">const </span>
                <span className="text-white">dev </span>
                <span className="text-white/50">= </span>

                <span className="text-white/80 sm:hidden">
                  {"{"}
                  <br />
                  <span className="pl-3 inline-block">
                    <span className="text-indigo-300">stack</span>
                    <span className="text-white/50">: </span>
                    <span className="text-amber-300">"FullStack + Web3"</span>
                    <span className="text-white/50">,</span>
                  </span>
                  <br />
                  <span className="pl-3 inline-block">
                    <span className="text-indigo-300">ship</span>
                    <span className="text-white/50">: </span>
                    <span className="text-emerald-300">true</span>
                  </span>
                  <br />
                  {"}"}
                </span>

                <span className="hidden sm:inline text-white/80">
                  {"{ "}
                  <span className="text-indigo-300">stack</span>
                  <span className="text-white/50">: </span>
                  <span className="text-amber-300">"FullStack + Web3"</span>
                  <span className="text-white/50">, </span>
                  <span className="text-indigo-300">ship</span>
                  <span className="text-white/50">: </span>
                  <span className="text-emerald-300">true</span>
                  {" }"}
                </span>
              </code>
            </div>
          </motion.div>


          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 sm:mt-5 grid grid-cols-2 gap-3 w-full"
          >
            <a
              href="#projects"
              id="hero-view-projects"
              className="col-span-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
            >
              View Projects <span aria-hidden="true">→</span>
            </a>

            <a
              href="https://github.com/BhavsarShubham"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-github"
              className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-3 py-3 text-sm font-medium text-white/85 transition-colors hover:border-indigo-400/50"
            >
              <svg
                className="!w-5 !h-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>

            <a
              href="#contact"
              id="hero-lets-connect"
              className="flex min-w-0 items-center justify-center gap-1 rounded-xl border border-white/10 px-2 py-3 text-sm font-medium text-[#aaa6c3] transition-colors hover:text-white"
            >
              Let's Connect <span aria-hidden="true">↗</span>
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
