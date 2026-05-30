import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'Shopeasy Magic Layers',
    category: 'ML / AI',
    highlight: true,
    badge: 'Machine Learning · Internship',
    description: 'AI pipeline: YOLOv8 + SAM + LaMa for product image processing. Built for spark.shopeasy.ai — detects objects, generates pixel-precise masks, and removes them using deep inpainting.',
    tags: ['YOLOv8', 'SAM', 'LaMa', 'PyTorch', 'Gradio'],
    github: 'https://github.com/adityathakar-25/shopeasy-magic-layers',
  },
  {
    id: 2,
    title: 'Diabetes Prediction',
    category: 'ML / AI',
    badge: 'Machine Learning',
    description: 'Logistic regression from scratch in NumPy, 4-model benchmark. XGBoost achieved 77.8% recall optimising for early detection in patient datasets.',
    tags: ['XGBoost', 'scikit-learn', 'NumPy', 'Python'],
    github: 'https://github.com/adityathakar-25/diabetes-prediction-ml-project',
  },
  {
    id: 3,
    title: 'IPL Win Predictor',
    category: 'ML / AI',
    badge: 'Machine Learning',
    description: 'Live win probability via Streamlit. Ball-by-ball ML pipeline providing real-time analytics during IPL matches using trained scikit-learn pipeline.',
    tags: ['Streamlit', 'Pandas', 'scikit-learn'],
    github: 'https://github.com/adityathakar-25/ipl-win-predictor',
    live: true,
  },
  {
    id: 4,
    title: 'California Housing Regression',
    category: 'ML / AI',
    badge: 'Machine Learning',
    description: 'Vectorised Linear and Ridge regression from scratch in NumPy. Full reproducible sklearn ColumnTransformer pipeline with lambda tuning via validation curve.',
    tags: ['NumPy', 'scikit-learn', 'Jupyter'],
    github: 'https://github.com/adityathakar-25/california-housing-linear-regression',
  },
  {
    id: 5,
    title: 'Crypto Live',
    category: 'Web Dev',
    badge: 'Web Development',
    description: 'Real-time dashboard integrating CoinGecko API. Features search, sort, filter, USD/INR toggle, favourites, and live price charts with Chart.js.',
    tags: ['React', 'Chart.js', 'Axios', 'Tailwind CSS'],
    github: 'https://github.com/adityathakar-25/crypto-live',
    live: true,
  },
  {
    id: 6,
    title: 'To-Do List',
    category: 'Web Dev',
    badge: 'Web Development',
    description: 'Clean task management web app with intuitive UI for creating, updating, and tracking todos.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/adityathakar-25/todo-list',
  },
  {
    id: 7,
    title: 'Weather App',
    category: 'Web Dev',
    badge: 'Web Development',
    description: 'Live weather data via API integration, displaying current conditions and forecasts for any city.',
    tags: ['JavaScript', 'REST API'],
    github: 'https://github.com/adityathakar-25/weather-app',
  },
  {
    id: 8,
    title: 'BST Movie Recommendation',
    category: 'DSA',
    badge: 'Data Structures',
    description: 'Efficient movie recommendation engine using Binary Search Trees for rapid querying and sorting of large cinematic datasets.',
    tags: ['C++', 'BST'],
    github: 'https://github.com/adityathakar-25/BST-Movie-Recommendation',
  },
]

const FILTERS = ['All', 'ML / AI', 'Web Dev', 'DSA']

// ─── Shared variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Card slides in from the right — amount scales with position in list
const cardVariant = (i) => ({
  hidden:  { opacity: 0, x: 80 + i * 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.07 },
  },
})

// ─── Horizontal sticky scroll section ─────────────────────────────────────
// The outer wrapper is very tall (controls how long the user scrolls).
// The inner container is sticky, and we drive a translateX via useScroll.

const CARD_W      = 420   // px — card width
const CARD_GAP    = 32    // px — gap between cards (= spacing.gutter)
const PEEK_RIGHT  = 120   // px — how much to peek past the last card

function HorizontalScrollTrack({ projects }) {
  const wrapperRef = useRef(null)

  // Track scroll progress through the wrapper element
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // Total horizontal distance to travel
  const totalWidth = projects.length * (CARD_W + CARD_GAP) + PEEK_RIGHT
  const maxTranslate = -(totalWidth - (typeof window !== 'undefined' ? window.innerWidth : 1280) + 160)

  const x = useTransform(scrollYProgress, [0, 1], [0, maxTranslate])

  // Height of the sticky wrapper = horizontal scroll distance + a bit of padding
  const wrapperHeight = `calc(${totalWidth}px + 50vh)`

  return (
    /* Outer tall wrapper that creates the scroll range */
    <div
      ref={wrapperRef}
      style={{ height: wrapperHeight, position: 'relative' }}
    >
      {/* Sticky viewport — stays pinned while wrapper scrolls */}
      <div
        style={{
          position: 'sticky',
          top: '15vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          paddingTop: '1rem',
        }}
      >
        {/* The moving track */}
        <motion.div
          style={{
            x,
            display: 'flex',
            gap: CARD_GAP,
            paddingLeft: 80,   // matches margin-desktop
            paddingRight: PEEK_RIGHT,
            willChange: 'transform',
          }}
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              variants={cardVariant(i)}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -5 }}
              viewport={{ once: true, margin: '0px -50px' }}
              className="glass-panel rounded-xl flex flex-col justify-between p-8 flex-shrink-0"
              style={{ width: CARD_W, minHeight: 520 }}
            >
              <div className="glass-content">
                {/* Category badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="px-4 py-1.5 rounded-full font-label-sm text-label-sm"
                    style={{
                      border: `1px solid ${project.highlight ? 'var(--accent)' : 'rgba(149,141,161,0.5)'}`,
                      color: project.highlight ? 'var(--text-primary)' : '#ccc3d8',
                      background: project.highlight ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.03)',
                    }}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline-md text-2xl text-on-surface mb-4 leading-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed line-clamp-4 mb-6">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full font-label-sm text-label-sm text-on-surface-variant"
                      style={{ background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.25)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="glass-content flex gap-3 mt-8">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button flex items-center gap-2 px-5 py-2.5 rounded-full font-label-sm text-label-sm text-on-surface uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0" }}>code</span>
                  GitHub
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Static grid (used when a filter is active) ───────────────────────────
function StaticGrid({ projects }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.08 }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter"
    >
      {projects.map((project, i) => (
        <motion.article
          key={project.id}
          variants={cardVariant(i)}
          whileHover={{ y: -5 }}
          className="glass-panel rounded-xl flex flex-col justify-between p-8"
        >
          <div className="glass-content">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="px-4 py-1.5 rounded-full font-label-sm text-label-sm"
                style={{
                  border: `1px solid ${project.highlight ? 'var(--accent-2)' : 'rgba(149,141,161,0.5)'}`,
                  color: project.highlight ? 'var(--text-primary)' : '#ccc3d8',
                  background: project.highlight ? 'rgba(251, 146, 60, 0.12)' : 'rgba(255,255,255,0.03)',
                }}
              >
                {project.badge}
              </span>
            </div>
            <h3 className="font-headline-md text-2xl text-on-surface mb-4 leading-tight">{project.title}</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed line-clamp-4 mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full font-label-sm text-label-sm text-on-surface-variant" style={{ background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-content flex gap-3 mt-8">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={project.github} target="_blank" rel="noopener noreferrer" className="glass-button flex items-center gap-2 px-5 py-2.5 rounded-full font-label-sm text-label-sm text-on-surface uppercase tracking-widest">
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0" }}>code</span>
              GitHub
            </motion.a>
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}

// ─── Main Section ──────────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState('All')
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 1024
  )

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const visible = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active)

  // Animate the header + filters in
  const headerRef = useRef(null)
  const headerIn  = useInView(headerRef, { once: true, margin: '-60px 0px' })

  return (
    <section id="projects">

      {/* ── Section header + filters (always visible, not inside sticky) ── */}
      <motion.div
        ref={headerRef}
        initial="hidden"
        animate={headerIn ? 'visible' : 'hidden'}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="w-full max-w-container-max mx-auto px-6 md:px-margin-desktop pt-16 md:pt-section-gap pb-4"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4">Projects</p>
          <h2 className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md text-on-surface">
            Selected Work
          </h2>
        </motion.div>

        {/* ── Category filter pills ── */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-5 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-widest transition-all duration-300"
              style={{
                border: `1px solid ${active === f ? 'var(--accent)' : 'rgba(255,255,255,0.12)'}`,
                background: active === f ? 'rgba(59, 130, 246, 0.2)' : 'var(--glass-bg)',
                color: active === f ? '#60a5fa' : 'var(--text-muted)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Cards — horizontal scroll when showing All on desktop, grid otherwise ── */}
      {active === 'All' && !isMobile ? (
        <HorizontalScrollTrack projects={visible} />
      ) : (
        <div className="w-full max-w-container-max mx-auto px-6 md:px-margin-desktop pb-16 md:pb-section-gap pt-6">
          <StaticGrid key={active} projects={visible} />
        </div>
      )}
    </section>
  )
}
