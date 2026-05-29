import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CONTACT_CARDS = [
  {
    id: 'email',
    label: 'Email',
    value: 'adityathakar.m@gmail.com',
    href: 'mailto:adityathakar.m@gmail.com',
    icon: 'mail',
    iconType: 'material',
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+91 93136 91507',
    href: 'tel:+919313691507',
    icon: 'call',
    iconType: 'material',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'adityathakar-25',
    href: 'https://github.com/adityathakar-25',
    iconType: 'svg',
    icon: (
      <svg aria-hidden="true" className="w-6 h-6" viewBox="0 0 24 24" style={{ fill: '#60a5fa' }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'adityathakar07',
    href: 'https://www.linkedin.com/in/adityathakar07',
    iconType: 'svg',
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" style={{ fill: '#60a5fa' }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

// ─── Shared variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export default function Contact() {
  // Header
  const headerRef = useRef(null)
  const headerIn  = useInView(headerRef, { once: true, margin: '-60px 0px' })

  // Cards grid
  const cardsRef = useRef(null)
  const cardsIn  = useInView(cardsRef, { once: true, margin: '-60px 0px' })

  // Footer
  const footerRef = useRef(null)
  const footerIn  = useInView(footerRef, { once: true, margin: '-40px 0px' })

  return (
    <section id="contact" className="relative w-full">
      {/* ── Ambient glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full max-w-container-max mx-auto px-6 md:px-margin-desktop py-16 md:py-section-gap flex flex-col items-center">

        {/* ── Header ── */}
        <motion.header
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerIn ? 'visible' : 'hidden'}
          className="text-center mb-20 max-w-2xl"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md text-on-surface mb-5"
          >
            Let's Connect.
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body-lg text-body-lg text-on-surface-variant opacity-70">
            Open to internships and opportunities.
          </motion.p>
        </motion.header>

        {/* ── Contact cards — staggered 2×2 grid ── */}
        <motion.div
          ref={cardsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={cardsIn ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-4xl w-full"
        >
          {CONTACT_CARDS.map((card) => (
            <motion.a
              key={card.id}
              variants={fadeUp}
              href={card.href}
              target={card.id === 'github' || card.id === 'linkedin' ? '_blank' : undefined}
              rel={card.id === 'github' || card.id === 'linkedin' ? 'noopener noreferrer' : undefined}
              whileHover={{ y: -5, boxShadow: '0 0 20px rgba(59,130,246,0.15)' }}
              className="group relative overflow-hidden rounded-xl flex flex-col items-center text-center p-10"
              style={{
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(24px)',
                border: '1px solid var(--glass-border)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)' }}
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-all duration-500"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}
              >
                {card.iconType === 'material' ? (
                  <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontVariationSettings: "'FILL' 0" }}>
                    {card.icon}
                  </span>
                ) : (
                  card.icon
                )}
              </div>

              {/* Label */}
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-3">
                {card.label}
              </h3>

              {/* Value */}
              <p className="font-body-lg text-body-lg text-on-surface transition-colors duration-300 group-hover:text-primary">
                {card.value}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        ref={footerRef}
        variants={fadeUp}
        initial="hidden"
        animate={footerIn ? 'visible' : 'hidden'}
        className="w-full pt-12 pb-8 flex flex-col items-center justify-center px-6 md:px-margin-desktop"
        style={{ borderTop: '1px solid var(--glass-border)' }}
      >
        <p className="uppercase tracking-widest text-on-surface-variant opacity-60" style={{ fontSize: '0.75rem' }}>
          © 2025 Aditya Thakar
        </p>
      </motion.footer>
    </section>
  )
}
