import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const GITHUB_USERNAME = "BhavsarShubham";

const PINNED_REPOS = [
  {
    name: "news-factory",
    description: "Decentralized BSV news portal with smart contract-driven wallet and subscription management.",
    language: "TypeScript",
    html_url: "https://github.com/BhavsarShubham/news-factory",
  },
  {
    name: "ICO_Market",
    description: "Decentralized ICO platform on Ethereum for token sales and fundraising using Solidity smart contracts.",
    language: "Solidity",
    html_url: "https://github.com/BhavsarShubham/ICO_Market",
  },
  {
    name: "SHUBHAM_supply_chain_manage",
    description: "Blockchain-based supply chain management on Ethereum using smart contracts, React.js, and Web3.js.",
    language: "JavaScript",
    html_url: "https://github.com/BhavsarShubham/SHUBHAM_supply_chain_manage",
  },
];

const langColors = {
  TypeScript: "#3b82f6",
  JavaScript: "#f59e0b",
  Solidity: "#8b5cf6",
  Python: "#10b981",
  Rust: "#f97316",
  Go: "#06b6d4",
  default: "#6366f1",
};

const RepoCard = ({ repo, index }) => {
  const color = langColors[repo.language] || langColors.default;

  return (
    <motion.a
      variants={fadeIn("up", "spring", index * 0.1, 0.6)}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card block rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-indigo-500/30 p-6 group"
      aria-label={`GitHub repository: ${repo.name}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <svg className="w-4 h-4 text-white/50 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h3 className="text-white text-[14px] font-semibold font-mono group-hover:text-indigo-300 transition-colors">
            {repo.name}
          </h3>
        </div>
        <svg className="w-3.5 h-3.5 text-white/30 group-hover:text-indigo-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <p className="text-[#aaa6c3] text-[13px] leading-relaxed mb-4">
        {repo.description || "No description available."}
      </p>

      <div className="flex items-center gap-4 text-[12px]">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[#aaa6c3] font-mono">{repo.language}</span>
          </div>
        )}
        {repo.stargazers_count !== undefined && (
          <div className="flex items-center gap-1 text-[#aaa6c3]">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {repo.stargazers_count}
          </div>
        )}
        {repo.forks_count !== undefined && (
          <div className="flex items-center gap-1 text-[#aaa6c3]">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {repo.forks_count}
          </div>
        )}
      </div>
    </motion.a>
  );
};

const GitHubSection = () => {
  const [repos, setRepos] = useState(PINNED_REPOS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=public`
        );
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setRepos(
              data
                .filter((r) => !r.fork)
                .slice(0, 6)
                .map((r) => ({
                  name: r.name,
                  description: r.description,
                  language: r.language,
                  stargazers_count: r.stargazers_count,
                  forks_count: r.forks_count,
                  html_url: r.html_url,
                  updated_at: r.updated_at,
                }))
            );
          }
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-indigo-400 font-mono`}>
          // open source
        </p>
        <h2 className={styles.sectionHeadText}>GitHub.</h2>
      </motion.div>

      {/* Profile card */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/30 to-emerald-500/30 border border-white/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-[15px]">@{GITHUB_USERNAME}</p>
            <p className="text-[#aaa6c3] text-[13px] mt-0.5">github.com/BhavsarShubham</p>
          </div>
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          id="github-profile-link"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-500/40 text-indigo-300 text-[13px] font-medium hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white transition-all duration-300"
          aria-label="View GitHub profile"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          View Profile
        </a>
      </motion.div>

      {/* Repos grid */}
      {loading ? (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} index={i} />
          ))}
        </div>
      )}

      {error && (
        <p className="mt-4 text-[12px] text-white/30 font-mono">
          // Showing curated repositories — GitHub API rate limited
        </p>
      )}
    </>
  );
};

export default SectionWrapper(GitHubSection, "github");
