import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'

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
    accentColor: '#3b82f6',
  },
  {
    id: 2,
    title: 'Diabetes Prediction',
    category: 'ML / AI',
    badge: 'Machine Learning',
    description: 'Logistic regression from scratch in NumPy, 4-model benchmark. XGBoost achieved 77.8% recall optimising for early detection in patient datasets.',
    tags: ['XGBoost', 'scikit-learn', 'NumPy', 'Python'],
    github: 'https://github.com/adityathakar-25/diabetes-prediction-ml-project',
    accentColor: '#60a5fa',
  },
  {
    id: 3,
    title: 'IPL Win Predictor',
    category: 'ML / AI',
    badge: 'Machine Learning',
    description: 'Live win probability via Streamlit. Ball-by-ball ML pipeline providing real-time analytics during IPL matches using trained scikit-learn pipeline.',
    tags: ['Streamlit', 'Pandas', 'scikit-learn', 'Python'],
    github: 'https://github.com/adityathakar-25/ipl-win-predictor',
    live: true,
    accentColor: '#fb923c',
  },
  {
    id: 4,
    title: 'California Housing Regression',
    category: 'ML / AI',
    badge: 'Machine Learning',
    description: 'Vectorised Linear and Ridge regression from scratch in NumPy. Full reproducible sklearn ColumnTransformer pipeline with lambda tuning via validation curve.',
    tags: ['NumPy', 'scikit-learn', 'Jupyter', 'Pandas'],
    github: 'https://github.com/adityathakar-25/california-housing-linear-regression',
    accentColor: '#38bdf8',
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
    accentColor: '#3b82f6',
  },
  {
    id: 6,
    title: 'To-Do List',
    category: 'Web Dev',
    badge: 'Web Development',
    description: 'Clean task management web app with intuitive UI for creating, updating, and tracking todos with persistent storage.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage'],
    github: 'https://github.com/adityathakar-25/todo-list',
    accentColor: '#60a5fa',
  },
  {
    id: 7,
    title: 'Weather App',
    category: 'Web Dev',
    badge: 'Web Development',
    description: 'Live weather data via API integration, displaying current conditions, dynamic temperature graphics, and multi-day forecasts for any city.',
    tags: ['JavaScript', 'REST API', 'CSS3', 'WeatherAPI'],
    github: 'https://github.com/adityathakar-25/weather-app',
    accentColor: '#38bdf8',
  },
  {
    id: 8,
    title: 'BST Movie Recommendation',
    category: 'DSA',
    badge: 'Data Structures',
    description: 'Efficient movie recommendation engine using Binary Search Trees for rapid querying, filter operations, and logarithmic-time sorting of large cinematic datasets.',
    tags: ['C++', 'BST', 'Algorithms', 'Data Structures'],
    github: 'https://github.com/adityathakar-25/BST-Movie-Recommendation',
    accentColor: '#fb923c',
  },
]

const FILTERS = ['All', 'ML / AI', 'Web Dev', 'DSA']

// ─── Single Project Card Component ──────────────────────────────────────────
function ProjectCard({ project, index, isHorizontal = false }) {
  return (
    <motion.article
      whileHover={{ y: -7, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="glass-panel rounded-2xl flex flex-col justify-between p-7 md:p-8 flex-shrink-0 relative group"
      style={{
        width: isHorizontal ? 'clamp(320px, 30vw, 440px)' : '100%',
        minHeight: isHorizontal ? 510 : 'auto',
      }}
    >
      {/* Subtle top glow highlight on card hover */}
      <div
        className="absolute top-0 left-6 right-6 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accentColor || '#3b82f6'}, transparent)`,
        }}
      />

      <div className="glass-content">
        {/* Top Header: Badge + Index */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <span
            className="px-3.5 py-1.5 rounded-full font-label-sm text-[10.5px] font-medium tracking-wider uppercase"
            style={{
              border: `1px solid ${project.highlight ? 'var(--accent)' : 'rgba(255,255,255,0.14)'}`,
              color: project.highlight ? '#93c5fd' : 'var(--text-primary)',
              background: project.highlight ? 'rgba(59,130,246,0.16)' : 'rgba(255,255,255,0.04)',
              boxShadow: project.highlight ? '0 0 12px rgba(59,130,246,0.2)' : 'none',
            }}
          >
            {project.badge}
          </span>
          <span className="font-mono text-xs text-on-surface-variant/40 font-semibold tracking-wider">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-headline-md text-2xl md:text-[26px] text-on-surface mb-3.5 leading-snug group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-body-lg text-body-lg text-on-surface-variant/80 leading-relaxed mb-6 line-clamp-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full font-label-sm text-[11px] text-on-surface-variant/90 border border-white/5 transition-colors group-hover:border-white/10"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions / Links */}
      <div className="glass-content flex items-center gap-3 mt-8 pt-5 border-t border-[var(--glass-border)]">
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-button flex items-center gap-2 px-5 py-2.5 rounded-full font-label-sm text-[11px] text-on-surface uppercase tracking-widest hover:text-white"
        >
          <span className="material-symbols-outlined text-base">code</span>
          GitHub
        </motion.a>

        {project.live && (
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-label-sm text-[11px] uppercase tracking-widest text-[#fb923c] hover:text-white border border-[#fb923c]/40 hover:border-[#fb923c] bg-[#fb923c]/10 transition-all duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#fb923c] animate-pulse" />
            Live Demo
          </motion.a>
        )}
      </div>
    </motion.article>
  )
}

// ─── Horizontal Sticky Scroll Track (Desktop "All" view) ────────────────────
function HorizontalScrollTrack({ projects, activeFilter, onFilterChange }) {
  const wrapperRef   = useRef(null)
  const trackRef     = useRef(null)
  const [maxDist, setMaxDist]       = useState(0)
  const [activeIndex, setActiveIndex] = useState(1)

  // Track scroll through the outer container
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // Physics-based spring smoothing on scroll progress (Apple-style inertia)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.2,
    restDelta: 0.0005,
  })

  // Measure track dimensions dynamically
  const measureTrack = () => {
    if (!trackRef.current) return
    const trackWidth = trackRef.current.scrollWidth
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1280
    // Travel needed to bring last card into comfortable viewing zone
    const distance = Math.max(0, trackWidth - windowWidth + 140)
    setMaxDist(distance)
  }

  useLayoutEffect(() => {
    measureTrack()
    window.addEventListener('resize', measureTrack)
    return () => window.removeEventListener('resize', measureTrack)
  }, [projects])

  // ── Transform mapping with generous START and END buffers ──────────────────
  // 0.00 – 0.08: Entrance buffer (cards rest at 0, user registers 1st card)
  // 0.08 – 0.90: Fluid spring-damped horizontal travel from 0 to -maxDist
  // 0.90 – 1.00: Exit buffer (cards rest at -maxDist, smooth handoff to next section)
  const x = useTransform(
    smoothProgress,
    [0, 0.08, 0.90, 1],
    [0, 0, -maxDist, -maxDist]
  )

  // Track progress line fill
  const progressPercent = useTransform(
    smoothProgress,
    [0.08, 0.90],
    ['0%', '100%']
  )

  // Track opacity for soft fade in/out at extremes
  const containerOpacity = useTransform(
    smoothProgress,
    [0, 0.04, 0.96, 1],
    [0.9, 1, 1, 0.9]
  )

  // Active card index listener for live counter
  useEffect(() => {
    const unsub = smoothProgress.on('change', (latest) => {
      const clamped = Math.max(0, Math.min(1, (latest - 0.08) / 0.82))
      const idx = Math.min(
        projects.length,
        Math.max(1, Math.round(clamped * (projects.length - 1)) + 1)
      )
      setActiveIndex(idx)
    })
    return () => unsub()
  }, [smoothProgress, projects.length])

  // Scroll to previous / next project card via click
  const scrollStep = (direction) => {
    if (!wrapperRef.current) return
    const totalScrollable = wrapperRef.current.offsetHeight - window.innerHeight
    const stepSize = (totalScrollable * 0.82) / (projects.length - 1)
    const targetScroll = window.scrollY + direction * stepSize
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  // Calculate container height (~42vh of scroll per project card for relaxed pacing)
  const wrapperHeight = `calc(100vh + ${projects.length * 42}vh)`

  return (
    <div
      ref={wrapperRef}
      style={{ height: wrapperHeight, position: 'relative' }}
      className="relative w-full"
    >
      {/* Sticky viewport pinned for the duration of the wrapper */}
      <motion.div
        style={{ opacity: containerOpacity }}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-8 md:py-10 z-10"
      >
        {/* ── Top Bar: Header, Filters, Counter & Progress ── */}
        <div className="w-full max-w-container-max mx-auto px-6 md:px-margin-desktop flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-widest text-[var(--accent)] mb-2">
                Featured Portfolio
              </p>
              <h2 className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md text-on-surface leading-tight">
                Selected Work
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => onFilterChange(f)}
                  className="px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-widest transition-all duration-300 select-none"
                  style={{
                    border: `1px solid ${activeFilter === f ? 'var(--accent)' : 'rgba(255,255,255,0.12)'}`,
                    background: activeFilter === f ? 'rgba(59, 130, 246, 0.2)' : 'var(--glass-bg)',
                    color: activeFilter === f ? '#60a5fa' : 'var(--text-muted)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Progress bar line */}
          <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative mt-2">
            <motion.div
              style={{ width: progressPercent }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-orange-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            />
          </div>
        </div>

        {/* ── Center: Horizontally Moving Cards Track ── */}
        <div className="w-full overflow-hidden flex items-center my-auto py-4">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-7 md:gap-8 px-6 md:px-margin-desktop will-change-transform"
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isHorizontal={true}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Bottom Bar: Live Project Counter + Nav Controls ── */}
        <div className="w-full max-w-container-max mx-auto px-6 md:px-margin-desktop flex items-center justify-between text-xs text-on-surface-variant">
          {/* Active project name & number */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-semibold text-white">
              {String(activeIndex).padStart(2, '0')}
            </span>
            <span className="text-white/30">/</span>
            <span className="font-mono text-xs text-white/50">
              {String(projects.length).padStart(2, '0')}
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-500/60 ml-2" />
            <span className="hidden sm:inline-block text-white/70 font-medium truncate max-w-[280px]">
              {projects[activeIndex - 1]?.title}
            </span>
          </div>

          {/* Hint & Navigation Buttons */}
          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-2 font-label-sm text-[10px] uppercase tracking-widest text-white/40">
              <span className="material-symbols-outlined text-sm animate-bounce">arrow_downward</span>
              Scroll to explore
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollStep(-1)}
                disabled={activeIndex <= 1}
                aria-label="Previous project"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:border-blue-500/50 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>
              <button
                onClick={() => scrollStep(1)}
                disabled={activeIndex >= projects.length}
                aria-label="Next project"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:border-blue-500/50 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Responsive Grid View (Filtered & Mobile layouts) ───────────────────────
function StaticGrid({ projects }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
      }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-gutter"
    >
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          variants={{
            hidden:  { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
          }}
        >
          <ProjectCard project={project} index={i} isHorizontal={false} />
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─── Main Projects Section Export ───────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 1024
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="relative w-full">
      <AnimatePresence mode="wait">
        {activeFilter === 'All' && !isMobile ? (
          /* Desktop All view: Smooth Horizontal Sticky Scroll */
          <HorizontalScrollTrack
            key="horizontal-track"
            projects={filteredProjects}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        ) : (
          /* Mobile / Filtered view: Clean Animated Grid */
          <div
            key="grid-view"
            className="w-full max-w-container-max mx-auto px-6 md:px-margin-desktop py-16 md:py-section-gap"
          >
            {/* Header + Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-widest text-[var(--accent)] mb-3">
                  Projects
                </p>
                <h2 className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md text-on-surface leading-tight">
                  Selected Work
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2.5">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-widest transition-all duration-300 select-none"
                    style={{
                      border: `1px solid ${activeFilter === f ? 'var(--accent)' : 'rgba(255,255,255,0.12)'}`,
                      background: activeFilter === f ? 'rgba(59, 130, 246, 0.2)' : 'var(--glass-bg)',
                      color: activeFilter === f ? '#60a5fa' : 'var(--text-muted)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <StaticGrid projects={filteredProjects} />
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
