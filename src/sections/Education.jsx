import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Shared variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

export default function Education() {
  // Section header
  const headerRef = useRef(null)
  const headerIn = useInView(headerRef, { once: true, margin: '-60px 0px' })

  // 3-col education cards
  const cardsRef = useRef(null)
  const cardsIn = useInView(cardsRef, { once: true, margin: '-80px 0px' })

  // Certs / achievements row
  const certsRef = useRef(null)
  const certsIn = useInView(certsRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="education"
      className="relative w-full max-w-container-max mx-auto px-5 md:px-margin-desktop py-14 md:py-section-gap"
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)', zIndex: -1 }}
      />

      {/* ── Section header ── */}
      <motion.div
        ref={headerRef}
        variants={fadeUp}
        initial="hidden"
        animate={headerIn ? 'visible' : 'hidden'}
        className="mb-12 text-center md:text-left"
      >
        <h2 className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
          Education
        </h2>
      </motion.div>

      {/* ── Primary Education — Asymmetric Grid ── */}
      <motion.div
        ref={cardsRef}
        variants={staggerContainer}
        initial="hidden"
        animate={cardsIn ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-16"
      >
        {/* Card 1: Nirma University (Featured Banner) */}
        <motion.div variants={fadeUp} className="glass-panel p-8 md:p-10 rounded-2xl flex flex-col md:flex-row justify-between min-h-[280px] md:col-span-2 gap-8">
          <div className="glass-content flex flex-col items-start justify-center flex-1">
            <span
              className="inline-block px-4 py-1.5 rounded-full font-label-sm text-[10px] uppercase tracking-widest mb-6"
              style={{ background: 'rgba(59, 130, 246, 0.12)', border: '1px solid var(--accent)', color: '#60a5fa' }}
            >
              Current
            </span>
            <h3 className="font-headline-md text-3xl md:text-4xl text-on-surface mb-4 leading-tight">Nirma University</h3>
            <p className="font-body-lg text-xl text-on-surface-variant opacity-90 mb-2">B.Tech in Computer Science &amp; Engineering</p>
            <p className="font-label-sm text-sm text-on-surface-variant opacity-60 uppercase tracking-widest">Ahmedabad, Gujarat</p>
          </div>
          <div className="glass-content flex flex-col justify-center items-start md:items-end md:text-right border-t md:border-t-0 md:border-l border-[var(--glass-border)] pt-6 md:pt-0 md:pl-10">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display-lg" style={{ color: 'var(--accent-2)', fontSize: 'clamp(2.5rem, 8vw, 3.75rem)' }}>8.31</span>
              <span className="font-body-lg text-on-surface-variant">CGPA</span>
            </div>
            <p className="font-label-sm text-xs text-outline uppercase tracking-widest bg-[rgba(255,255,255,0.05)] px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.05)] mt-2">Class of 2027</p>
          </div>
        </motion.div>

        {/* Card 2: Ashadeep */}
        <motion.div variants={fadeUp} className="glass-panel p-8 rounded-2xl flex flex-col justify-between">
          <div className="glass-content">
            <h3 className="font-headline-md text-2xl text-on-surface mb-2 leading-tight">Ashadeep International School</h3>
            <p className="font-body-lg text-on-surface-variant opacity-80 mb-6">GSEB Higher Secondary (HSC)</p>
          </div>
          <div className="glass-content mt-auto pt-6 border-t border-[var(--glass-border)]">
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg" style={{ color: 'var(--accent)', fontSize: 'clamp(1.75rem, 6vw, 2.5rem)' }}>86.92</span>
              <span className="font-body-lg text-outline">%</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: JEE Mains */}
        <motion.div variants={fadeUp} className="glass-panel p-8 rounded-2xl flex flex-col justify-between">
          <div className="glass-content">
            <h3 className="font-headline-md text-2xl text-on-surface mb-2 leading-tight">JEE Mains</h3>
            <p className="font-body-lg text-on-surface-variant opacity-80 mb-6">National Engineering Entrance</p>
          </div>
          <div className="glass-content mt-auto pt-6 border-t border-[var(--glass-border)]">
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg" style={{ color: 'var(--accent)', fontSize: 'clamp(1.75rem, 6vw, 2.5rem)' }}>98.15</span>
              <span className="font-body-lg text-outline">Percentile</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Certifications & Achievements — staggered row ── */}
      <motion.div
        ref={certsRef}
        variants={staggerContainer}
        initial="hidden"
        animate={certsIn ? 'visible' : 'hidden'}
        className="flex flex-col md:flex-row gap-gutter"
      >
        {/* Course & Certifications Block */}
        <motion.div variants={fadeUp} className="glass-panel p-8 rounded-xl flex-[1.3] flex flex-col justify-between">
          <div className="glass-content w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[var(--accent)] text-3xl">workspace_premium</span>
                <h4 className="font-display-lg-mobile text-xl text-white font-bold">Courses &amp; Certifications</h4>
              </div>
              <p className="font-label-sm text-[10px] text-on-surface-variant opacity-80 uppercase tracking-widest text-left xl:text-right leading-relaxed">
                AWS Academy &amp; Coursera Specializations
              </p>
            </div>

            {/* Course Rows */}
            <div className="flex flex-col flex-1 justify-end">
              {/* Row 1: AWS Academy */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-[var(--glass-border)] gap-4">
                <div className="flex items-center gap-4">
                  <img src="/aws-logo.png" alt="AWS Logo" className="w-8 h-8 object-contain rounded-md" />
                  <div>
                    <span className="font-body-lg text-white font-medium block">AWS Academy Graduate - Cloud Foundations</span>
                    <span className="font-label-sm text-[10px] text-on-surface-variant opacity-60 uppercase tracking-widest">Amazon Web Services (AWS)</span>
                  </div>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.credly.com/badges/f3091777-d151-41f0-911c-8e27d6f5ecc7/linked_in_profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button px-4 py-2 rounded-full font-label-sm text-[10px] text-white uppercase tracking-widest hover:text-[var(--accent)] whitespace-nowrap text-center transition-colors self-start sm:self-center"
                >
                  View Badge &rarr;
                </motion.a>
              </div>

              {/* Row 2: Coursera ML 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-[var(--glass-border)] gap-4">
                <div className="flex items-center gap-4">
                  <img src="/coursera-logo.png" alt="Coursera Logo" className="w-8 h-8 object-contain rounded-md" />
                  <div>
                    <span className="font-body-lg text-white font-medium block">Supervised Machine Learning: Regression &amp; Classification</span>
                    <span className="font-label-sm text-[10px] text-on-surface-variant opacity-60 uppercase tracking-widest font-normal">Stanford · DeepLearning.AI</span>
                  </div>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.coursera.org/account/accomplishments/verify/Q0NM1Z6QCAYS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button px-4 py-2 rounded-full font-label-sm text-[10px] text-white uppercase tracking-widest hover:text-[var(--accent)] whitespace-nowrap text-center transition-colors self-start sm:self-center"
                >
                  View Certificate &rarr;
                </motion.a>
              </div>

              {/* Row 3: Coursera ML 2 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-[var(--glass-border)] gap-4">
                <div className="flex items-center gap-4">
                  <img src="/coursera-logo.png" alt="Coursera Logo" className="w-8 h-8 object-contain rounded-md" />
                  <div>
                    <span className="font-body-lg text-white font-medium block">Advanced Learning Algorithms</span>
                    <span className="font-label-sm text-[10px] text-on-surface-variant opacity-60 uppercase tracking-widest font-normal">Stanford · DeepLearning.AI</span>
                  </div>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.coursera.org/account/accomplishments/verify/CABQGJYODLPK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button px-4 py-2 rounded-full font-label-sm text-[10px] text-white uppercase tracking-widest hover:text-[var(--accent)] whitespace-nowrap text-center transition-colors self-start sm:self-center"
                >
                  View Certificate &rarr;
                </motion.a>
              </div>

              {/* Row 4: Coursera ML 3 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4">
                <div className="flex items-center gap-4">
                  <img src="/coursera-logo.png" alt="Coursera Logo" className="w-8 h-8 object-contain rounded-md" />
                  <div>
                    <span className="font-body-lg text-white font-medium block">Unsupervised Learning, Recommenders, &amp; Reinforcement Learning</span>
                    <span className="font-label-sm text-[10px] text-on-surface-variant opacity-60 uppercase tracking-widest font-normal">Stanford · DeepLearning.AI</span>
                  </div>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.coursera.org/account/accomplishments/verify/93N4X9BYS9LM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button px-4 py-2 rounded-full font-label-sm text-[10px] text-white uppercase tracking-widest hover:text-[var(--accent)] whitespace-nowrap text-center transition-colors self-start sm:self-center"
                >
                  View Certificate &rarr;
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LeetCode Block */}
        <motion.div variants={fadeUp} className="glass-panel p-8 rounded-xl flex-1 flex flex-col justify-between">
          <div className="glass-content w-full h-full flex flex-col">

            {/* Header */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 mb-10">
              <div className="flex items-center gap-4">
                <img src="/leetcode-logo.jpg" alt="LeetCode Logo" className="w-10 h-10 object-contain rounded-lg" />
                <h4 className="font-display-lg-mobile text-xl text-white font-bold">LeetCode</h4>
              </div>
              <p className="font-mono text-[11px] text-on-surface-variant opacity-60 text-left xl:text-right">@adityathakar_25</p>
            </div>

            {/* Stats 2x2 Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 md:mb-10">
              <div>
                <span className="font-display-lg-mobile text-xl md:text-3xl text-white font-bold block mb-1">207</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest">Problems Solved</span>
              </div>
              <div>
                <span className="font-display-lg-mobile text-xl md:text-3xl text-white font-bold block mb-1">1,524</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest">Contest Rating</span>
              </div>
              <div>
                <span className="font-display-lg-mobile text-2xl md:text-3xl text-white font-bold block mb-1">37.79%</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest">Top</span>
              </div>
              <div>
                <span className="font-display-lg-mobile text-2xl md:text-3xl text-white font-bold block mb-1">35</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest">Max Streak</span>
              </div>
            </div>

            {/* Problem Breakdown */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[rgba(34,197,94,0.1)] text-green-400 border border-[rgba(34,197,94,0.2)]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Easy 98
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[rgba(245,158,11,0.1)] text-amber-400 border border-[rgba(245,158,11,0.2)]">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Medium 96
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[rgba(239,68,68,0.1)] text-red-400 border border-[rgba(239,68,68,0.2)]">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Hard 13
              </span>
            </div>

            {/* View Profile */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://leetcode.com/u/adityathakar_25"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-label-sm text-[11px] text-white uppercase tracking-widest hover:text-[var(--accent)] mt-auto transition-colors"
            >
              View Profile &rarr;
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
