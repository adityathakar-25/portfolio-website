import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Shared animation variants ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─── Hook: trigger once when element enters viewport ──────────────────────
function useFadeUp() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return { ref, inView }
}

// ─── Nav links — single source of truth ───────────────────────────────────
const NAV_LINKS = [
  { href: '#about',     label: 'About' },
  { href: '#projects',  label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact',   label: 'Contact' },
]

export default function Hero() {
  const label   = useFadeUp()
  const title   = useFadeUp()
  const tagline = useFadeUp()
  const ctas    = useFadeUp()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section
      id="hero"
      style={{ position: 'relative', minHeight: '100vh' }}
    >
      <div style={{ position: 'relative' }}>

        {/* ── Top Navigation ── */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl border-b border-white/[0.06] transition-all duration-300"
          style={{ background: 'rgba(3,1,15,0.55)' }}
        >
          <div className="flex justify-between items-center px-6 md:px-margin-desktop py-5 w-full max-w-container-max mx-auto relative">

            {/* Left nav links — About · Projects */}
            <div className="hidden md:flex items-center gap-10 z-10 w-1/3">
              <a
                href="#about"
                className="font-label-sm text-label-sm uppercase tracking-widest transition-all duration-300 opacity-70 hover:opacity-100"
                style={{ color: 'var(--text-primary)' }}
              >
                About
              </a>
              <a
                href="#projects"
                className="font-label-sm text-label-sm uppercase tracking-widest transition-all duration-300 opacity-70 hover:opacity-100"
                style={{ color: 'var(--text-primary)' }}
              >
                Projects
              </a>
            </div>

            {/* Brand monogram */}
            <a
              href="#hero"
              className="md:absolute md:left-1/2 md:-translate-x-1/2 z-20 font-jakarta tracking-tighter text-3xl md:text-4xl hover:opacity-80 transition-opacity duration-200 select-none"
              style={{ color: '#ffffff', fontWeight: 800 }}
            >
              AT
            </a>

            {/* Right nav links — Education · Contact */}
            <div className="flex items-center justify-end gap-10 z-10 w-full md:w-1/3">
              <div className="hidden md:flex items-center gap-10">
                <a
                  href="#education"
                  className="font-label-sm text-label-sm uppercase tracking-widest transition-all duration-300 opacity-70 hover:opacity-100"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Education
                </a>
                <a
                  href="#contact"
                  className="font-label-sm text-label-sm uppercase tracking-widest transition-all duration-300 opacity-70 hover:opacity-100"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Contact
                </a>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex md:hidden items-center justify-center p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Toggle Menu"
              >
                <span className="material-symbols-outlined text-2xl">
                  {menuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>

            {/* Mobile Dropdown Overlay Menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-full border-x-0 border-t border-b border-white/[0.06] flex flex-col py-6 px-6 gap-6 z-40"
                  style={{ background: 'rgba(5, 7, 10, 0.97)', backdropFilter: 'blur(24px)', borderBottom: '1px solid var(--glass-border)' }}
                >
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-label-sm text-[13px] uppercase tracking-widest text-white/80 hover:text-white transition-colors py-1"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* ── Main Hero Body ── */}
        <main className="relative min-h-screen flex flex-col items-center justify-center px-5 md:px-margin-desktop pt-28 pb-20 md:pt-32 md:pb-24">

          {/* Ambient glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[500px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: -1,
            }}
          />



          {/* ── Bottom Text Content ── */}
          <div className="flex flex-col items-center text-center mt-8 md:mt-20 w-full max-w-4xl">

            <motion.span
              ref={label.ref}
              variants={fadeUp}
              initial="hidden"
              animate={label.inView ? 'visible' : 'hidden'}
              className="uppercase tracking-[0.25em] md:tracking-[0.3em] font-normal"
              style={{ color: 'rgba(248,250,252,0.5)', fontSize: 'clamp(0.6rem, 2vw, 0.75rem)' }}
            >
              Computer Science &amp; Engineering
            </motion.span>

            <motion.h1
              ref={title.ref}
              variants={fadeUp}
              initial="hidden"
              animate={title.inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="font-jakarta text-on-surface mt-4 md:mt-5 uppercase tracking-tighter drop-shadow-sm font-bold"
              style={{ fontSize: 'clamp(2.2rem, 10vw, 5rem)', lineHeight: 1.1 }}
            >
              Aditya Thakar
            </motion.h1>

            <motion.span
              ref={tagline.ref}
              variants={fadeUp}
              initial="hidden"
              animate={tagline.inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
              className="uppercase tracking-[0.2em] md:tracking-[0.3em] font-normal mt-4 md:mt-6"
              style={{ color: '#fb923c', fontSize: 'clamp(0.65rem, 2.5vw, 0.75rem)' }}
            >
              Machine Learning · Web Dev · DSA
            </motion.span>

            <motion.div
              ref={ctas.ref}
              variants={fadeUp}
              initial="hidden"
              animate={ctas.inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-10 md:mt-12 w-full max-w-xs sm:max-w-none sm:w-auto"
            >
              {/* Primary — View Projects */}
              <motion.a
                whileHover={{ scale: 1.05, borderColor: '#3b82f6', boxShadow: '0 0 15px rgba(59,130,246,0.3)' }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="relative px-7 py-3.5 sm:py-3 rounded-lg text-white font-medium border border-white/15 text-center text-sm"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                View Projects
              </motion.a>

              {/* Resume */}
              <motion.a
                whileHover={{ scale: 1.05, borderColor: '#3b82f6', boxShadow: '0 0 15px rgba(59,130,246,0.2)' }}
                whileTap={{ scale: 0.95 }}
                href="https://drive.google.com/file/d/1-JPJs2Li_RcEN4TW1b1QinjIinCZRsh2/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-7 py-3.5 sm:py-3 rounded-lg text-white font-medium border border-white/[0.08] text-center text-sm"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                Resume
              </motion.a>
            </motion.div>
          </div>
        </main>
      </div>
    </section>
  )
}
