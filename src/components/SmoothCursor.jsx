import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// ─── SmoothCursor v2 ──────────────────────────────────────────────────────────
// Architecture:
//   • A crisp 5px DOT  → raw cursor position, no lag, always sharp
//   • A lagging RING   → spring-smoothed, stretches/rotates in movement direction
//   • On hover         → ring expands & color shifts to orange accent
//   • On click         → dot pulses; a ripple ring briefly expands then fades
// ─────────────────────────────────────────────────────────────────────────────

// ─── Helpers ─────────────────────────────────────────────────────────────────
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'

function getAngle(dx, dy) { return Math.atan2(dy, dx) * (180 / Math.PI) }
function getDist(dx, dy)  { return Math.sqrt(dx * dx + dy * dy) }
function lerpVal(a, b, t) { return a + (b - a) * t }

// ─── Theme palette (matches global.css) ──────────────────────────────────────
const BLUE   = '#3b82f6'
const ORANGE = '#fb923c'
const WHITE  = '#ffffff'

// ─── Ripple component ─────────────────────────────────────────────────────────
function Ripple({ x, y, color, onDone }) {
  return (
    <motion.div
      style={{
        position:      'fixed',
        left:          x,
        top:           y,
        translateX:    '-50%',
        translateY:    '-50%',
        borderRadius:  '50%',
        border:        `1.5px solid ${color}`,
        pointerEvents: 'none',
        zIndex:        9997,
      }}
      initial={{ width: 10, height: 10, opacity: 0.7 }}
      animate={{ width: 42, height: 42, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0, 0.4, 1] }}
      onAnimationComplete={onDone}
    />
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SmoothCursor() {
  const [isVisible,  setIsVisible]  = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [ripples,    setRipples]    = useState([])   // [{id, x, y, color}]

  // Raw cursor position → dot (no spring, perfectly precise)
  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Spring-smoothed position → ring (lags behind intentionally)
  const ringSpring = { damping: 28, stiffness: 280, mass: 0.6 }
  const ringX = useSpring(rawX, ringSpring)
  const ringY = useSpring(rawY, ringSpring)

  // Ring morph: rotate + stretch based on velocity
  const [ringRotate, setRingRotate] = useState(0)
  const [ringScaleX, setRingScaleX] = useState(1)
  const [ringScaleY, setRingScaleY] = useState(1)

  const posRef  = useRef({ x: -200, y: -200 })
  const prevRef = useRef({ x: -200, y: -200 })
  const rafRef  = useRef(null)

  // ── Velocity-based morph loop ─────────────────────────────────────────────
  const morphLoop = useCallback(() => {
    const dx   = posRef.current.x - prevRef.current.x
    const dy   = posRef.current.y - prevRef.current.y
    const dist = getDist(dx, dy)

    if (dist > 1) {
      setRingRotate(getAngle(dx, dy))
      setRingScaleX(v => lerpVal(v, Math.min(1 + dist * 0.022, 1.5), 0.35))
      setRingScaleY(v => lerpVal(v, Math.max(1 - dist * 0.014, 0.65), 0.35))
    } else {
      // Ease back to circle
      setRingScaleX(v => lerpVal(v, 1, 0.12))
      setRingScaleY(v => lerpVal(v, 1, 0.12))
    }

    prevRef.current = { ...posRef.current }
    rafRef.current  = requestAnimationFrame(morphLoop)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(morphLoop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [morphLoop])

  // ── Mouse position ────────────────────────────────────────────────────────
  useEffect(() => {
    const move = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      posRef.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }
    const leave = () => setIsVisible(false)
    const enter = () => setIsVisible(true)

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [rawX, rawY])

  // ── Click ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const down = (e) => {
      setIsClicking(true)
      const color = isHovering ? ORANGE : BLUE
      setRipples(prev => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY, color }])
    }
    const up = () => setIsClicking(false)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup',   up)
    return () => {
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup',   up)
    }
  }, [isHovering])

  // ── Hover — event delegation (no per-element listeners) ──────────────────
  useEffect(() => {
    const over = (e) => {
      if (e.target.closest(INTERACTIVE)) setIsHovering(true)
    }
    const out = (e) => {
      // Only clear if the new target is not interactive
      if (!e.relatedTarget || !e.relatedTarget.closest?.(INTERACTIVE)) {
        setIsHovering(false)
      }
    }
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout',  out)
    return () => {
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout',  out)
    }
  }, [])

  // ── Derived visual state ──────────────────────────────────────────────────
  const ringSize   = isClicking ? 22 : isHovering ? 44 : 32
  const ringColor  = isHovering ? ORANGE : BLUE
  const ringOpacity = isHovering ? 0.9 : 0.6
  const dotColor   = isHovering ? ORANGE : BLUE
  const dotSize    = isClicking ? 6 : 10

  return (
    <>
      {/* ── Global cursor hide ── */}
      <style>{`html,body,*{cursor:none !important;}`}</style>

      {/* ── Ripples ── */}
      {ripples.map(r => (
        <Ripple
          key={r.id}
          x={r.x}
          y={r.y}
          color={r.color}
          onDone={() => setRipples(prev => prev.filter(p => p.id !== r.id))}
        />
      ))}

      {/* ── Ring (spring-lagged, stretches with velocity) ── */}
      <motion.div
        style={{
          position:      'fixed',
          left:          ringX,
          top:           ringY,
          translateX:    '-50%',
          translateY:    '-50%',
          zIndex:        9998,
          pointerEvents: 'none',
          borderRadius:  '50%',
          rotate:        isHovering || isClicking ? 0 : ringRotate,
          scaleX:        isHovering || isClicking ? 1 : ringScaleX,
          scaleY:        isHovering || isClicking ? 1 : ringScaleY,
        }}
        animate={{
          width:  ringSize,
          height: ringSize,
          opacity: isVisible ? ringOpacity : 0,
          backgroundColor: isHovering
            ? 'rgba(251,146,60,0.06)'
            : 'rgba(59,130,246,0.04)',
        }}
        transition={{
          width:           { type: 'spring', damping: 22, stiffness: 300, mass: 0.5 },
          height:          { type: 'spring', damping: 22, stiffness: 300, mass: 0.5 },
          backgroundColor: { duration: 0.25 },
          opacity:         { duration: 0.25 },
        }}
        initial={{ width: ringSize, height: ringSize, opacity: 0 }}
      >
        {/* Border lives here so it transitions smoothly via CSS without fighting framer-motion */}
        <div
          style={{
            width:        '100%',
            height:       '100%',
            borderRadius: '50%',
            border:       `1.5px solid ${ringColor}`,
            transition:   'border-color 0.2s ease',
            boxSizing:    'border-box',
          }}
        />
      </motion.div>

      {/* ── Dot (raw position, no lag — the precision anchor) ── */}
      <motion.div
        style={{
          position:      'fixed',
          left:          rawX,
          top:           rawY,
          translateX:    '-50%',
          translateY:    '-50%',
          zIndex:        9999,
          pointerEvents: 'none',
          borderRadius:  '50%',
          backgroundColor: dotColor,
        }}
        animate={{
          width:           dotSize,
          height:          dotSize,
          opacity:         isVisible ? 1 : 0,
          backgroundColor: dotColor,
          // Subtle glow on the dot — not a box-shadow rectangle, just a filter
          filter: isHovering
            ? `drop-shadow(0 0 4px ${ORANGE})`
            : `drop-shadow(0 0 3px ${BLUE})`,
          scale: isClicking ? 0.6 : 1,
        }}
        transition={{
          width:           { type: 'spring', damping: 18, stiffness: 400 },
          height:          { type: 'spring', damping: 18, stiffness: 400 },
          scale:           { type: 'spring', damping: 15, stiffness: 500 },
          backgroundColor: { duration: 0.15 },
          filter:          { duration: 0.2 },
          opacity:         { duration: 0.2 },
        }}
        initial={{ opacity: 0, scale: 0 }}
      />
    </>
  )
}
