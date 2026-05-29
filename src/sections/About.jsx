import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = {
  languages: { accentClass: 'accent-languages', glowColor: '#60a5fa', items: ['C++', 'JavaScript', 'Java', 'Python'] },
  web: { accentClass: 'accent-web', glowColor: 'var(--accent)', items: ['React.js', 'Tailwind CSS', 'Node.js', 'Bootstrap'] },
  tools: { accentClass: 'accent-tools', glowColor: '#38bdf8', items: ['Git', 'MySQL', 'Linux', 'Oracle SQL'] },
  cs: { accentClass: 'accent-cs', glowColor: '#fb923c', items: ['DSA', 'OOP', 'ML', 'OS', 'DBMS', 'CN'] },
}

// ─── Shared variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Stagger container — each child animates with a delay offset
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export default function About() {
  // Left column
  const leftRef = useRef(null)
  const leftIn = useInView(leftRef, { once: true, margin: '-80px 0px' })

  // Right column (skills stagger parent)
  const rightRef = useRef(null)
  const rightIn = useInView(rightRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="about"
      className="relative w-full max-w-container-max mx-auto px-6 md:px-margin-desktop py-section-gap"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter lg:gap-20 w-full">

        {/* ── Left Column: Bio ── */}
        <motion.div
          ref={leftRef}
          variants={staggerContainer}
          initial="hidden"
          animate={leftIn ? 'visible' : 'hidden'}
          className="flex flex-col justify-center"
        >
          <motion.p variants={fadeUp} className="font-label-sm text-label-sm uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
            About Me
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md text-on-surface mb-8 leading-tight">
            Building things that think.
          </motion.h2>

          <motion.p variants={fadeUp} className="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed max-w-xl">
            I'm a CSE student at Nirma University focused on Machine Learning, Web Development, and DSA.
            I build ML models from scratch, ship React apps, and solve algorithmic problems.
            My recent work includes from-scratch ML models, an IPL win predictor, and practical
            academic projects that combine clean implementation with measurable results.
          </motion.p>

          <motion.div variants={fadeUp} className="inline-flex items-center px-5 py-3 rounded-full glass-pill w-max" style={{ borderLeft: '3px solid #3b82f6' }}>
            <span className="font-label-sm text-[0.8rem] text-on-surface uppercase tracking-widest">
              8.31 GPA · Nirma University · 2027
            </span>
          </motion.div>
        </motion.div>

        {/* ── Right Column: Skills Grid (staggered) ── */}
        <motion.div
          ref={rightRef}
          variants={staggerContainer}
          initial="hidden"
          animate={rightIn ? 'visible' : 'hidden'}
          className="flex flex-col justify-center space-y-10 mt-14 lg:mt-0"
        >
          {Object.entries(SKILLS).map(([key, { accentClass, glowColor, items }]) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className={`pl-6 ${accentClass} relative`}
            >
              {/* Blurred glow copy of the border */}
              <div
                className="absolute -left-[2px] top-0 bottom-0 w-[2px] opacity-50"
                style={{ background: glowColor, filter: 'blur(2px)' }}
              />

              <h3 className="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest mb-4 capitalize">
                {key === 'cs' ? 'CS Core' : key}
              </h3>

              <div className="flex flex-wrap gap-3">
                {items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-pill px-4 py-2 rounded-full font-label-sm text-label-sm text-on-surface tracking-wider cursor-default select-none"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
