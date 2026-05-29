import React, { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// ─── ScrollBar ────────────────────────────────────────────────────────────────
// Fixed right-side scroll progress indicator.
// • Glass track (2px)
// • Spring-animated fill + glowing orb at tip
// • Clickable section markers — active one glows orange
// • Fading scroll-percentage label
// ─────────────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'hero',      label: 'Top'       },
  { id: 'about',     label: 'About'     },
  { id: 'projects',  label: 'Projects'  },
  { id: 'education', label: 'Education' },
  { id: 'contact',   label: 'Contact'   },
]

const BLUE   = '#3b82f6'
const ORANGE = '#fb923c'
// Track height in px (must match inline style below)
const TRACK_H = 340

export default function ScrollBar() {
  // 0–1 raw scroll fraction → spring smoothed
  const rawPct     = useMotionValue(0)
  const smoothPct  = useSpring(rawPct, { damping: 32, stiffness: 200, mass: 0.55 })

  // Derived: fill height & orb top (in px)
  const fillH  = useTransform(smoothPct, v => v * TRACK_H)
  const orbTop = useTransform(smoothPct, v => v * TRACK_H)

  const [sectionOffsets, setSectionOffsets] = useState([])   // [{id,label,pct}]
  const [activeSection,  setActiveSection]  = useState('hero')
  const [isScrolling,    setIsScrolling]    = useState(false)
  const [displayPct,     setDisplayPct]     = useState(0)    // integer for label

  const hideTimer = useRef(null)

  // ── Track scroll ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const pct       = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0

      rawPct.set(pct)
      setDisplayPct(Math.round(pct * 100))

      // Detect active section
      let current = SECTIONS[0].id
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          current = s.id
        }
      }
      setActiveSection(current)

      // Show/hide label
      setIsScrolling(true)
      clearTimeout(hideTimer.current)
      hideTimer.current = setTimeout(() => setIsScrolling(false), 1100)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(hideTimer.current)
    }
  }, [rawPct])

  // ── Measure section positions (as % of scrollable range) ─────────────────
  useEffect(() => {
    const measure = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const offsets = SECTIONS.map(s => {
        const el = document.getElementById(s.id)
        const elTop = el ? el.offsetTop : 0
        return {
          id:    s.id,
          label: s.label,
          pct:   maxScroll > 0 ? Math.min(elTop / maxScroll, 1) : 0,
        }
      })
      setSectionOffsets(offsets)
    }
    const t = setTimeout(measure, 400)
    window.addEventListener('resize', measure)
    return () => { clearTimeout(t); window.removeEventListener('resize', measure) }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Hide native scrollbar + hide component on mobile ─────────────── */}
      <style>{`
        html::-webkit-scrollbar { display: none; }
        html { scrollbar-width: none; -ms-overflow-style: none; }
        @media (max-width: 768px) { .scrollbar-root { display: none !important; } }
      `}</style>

      {/* ── Outer wrapper (vertically centered, right edge) ─────────────── */}
      <div
        className="scrollbar-root"
        style={{
          position:      'fixed',
          right:         18,
          top:           '50%',
          transform:     'translateY(-50%)',
          height:        TRACK_H,
          display:       'flex',
          alignItems:    'flex-start',
          zIndex:        8900,
          pointerEvents: 'none',
        }}
      >
        {/* ── Track ──────────────────────────────────────────────────────── */}
        <div
          style={{
            position:     'relative',
            width:        2,
            height:       '100%',
            borderRadius: 99,
            background:   'rgba(255,255,255,0.05)',
            boxShadow:    'inset 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          {/* ── Animated fill ────────────────────────────────────────────── */}
          <motion.div
            style={{
              position:     'absolute',
              top:          0,
              left:         0,
              width:        '100%',
              borderRadius: 99,
              height:       fillH,
              background:   `linear-gradient(to bottom, ${BLUE} 0%, #6366f1 100%)`,
              boxShadow:    `0 0 6px 1px rgba(59,130,246,0.45)`,
            }}
          />

          {/* ── Glowing orb at fill tip ──────────────────────────────────── */}
          <motion.div
            style={{
              position:      'absolute',
              left:          '50%',
              top:           orbTop,
              translateX:    '-50%',
              translateY:    '-50%',
              width:         10,
              height:        10,
              borderRadius:  '50%',
              background:    `radial-gradient(circle, #93c5fd 0%, ${BLUE} 60%)`,
              boxShadow:     `0 0 8px 3px rgba(59,130,246,0.8), 0 0 20px 5px rgba(99,102,241,0.4)`,
              pointerEvents: 'none',
            }}
          />

          {/* ── Section markers ──────────────────────────────────────────── */}
          {sectionOffsets.map(s => {
            const isActive = s.id === activeSection
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                title={s.label}
                style={{
                  position:      'absolute',
                  left:          '50%',
                  top:           `${s.pct * 100}%`,
                  transform:     'translate(-50%, -50%)',
                  width:         isActive ? 7 : 4,
                  height:        isActive ? 7 : 4,
                  borderRadius:  '50%',
                  background:    isActive ? ORANGE : 'rgba(255,255,255,0.22)',
                  border:        isActive
                    ? `1px solid rgba(251,146,60,0.6)`
                    : '1px solid rgba(255,255,255,0.1)',
                  boxShadow:     isActive
                    ? `0 0 7px 2px rgba(251,146,60,0.55)`
                    : 'none',
                  transition:    'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  cursor:        'pointer',
                  pointerEvents: 'auto',
                  padding:       0,
                  outline:       'none',
                }}
              />
            )
          })}
        </div>

        {/* ── Scroll % label ───────────────────────────────────────────────── */}
        <motion.span
          animate={{ opacity: isScrolling ? 1 : 0, x: isScrolling ? -6 : 2 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position:      'absolute',
            right:         12,
            top:           '50%',
            transform:     'translateY(-50%)',
            fontSize:      '0.58rem',
            fontFamily:    "'Inter', sans-serif",
            fontWeight:    500,
            letterSpacing: '0.09em',
            color:         'rgba(226,232,240,0.4)',
            whiteSpace:    'nowrap',
            pointerEvents: 'none',
            userSelect:    'none',
          }}
        >
          {displayPct}%
        </motion.span>
      </div>
    </>
  )
}
