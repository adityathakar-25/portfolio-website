import React from 'react'
import Hero      from './sections/Hero'
import About     from './sections/About'
import Projects  from './sections/Projects'
import Education from './sections/Education'
import Contact   from './sections/Contact'
import ShaderBackground from './components/ShaderBackground'

export default function App() {
  return (
    <div className="min-h-screen text-on-surface">
      <ShaderBackground />
      <Hero />
      <div className="relative z-10">
        <About />
        <Projects />
        <Education />
        <Contact />
      </div>
    </div>
  )
}
