import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import Tilt from 'react-parallax-tilt'

// Utility: simple Reveal hook using IntersectionObserver
export function useReveal() {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, visible]
}

/* ---- Text effects ---- */
export function SplitText({ text = '' }) {
  return (
    <h1 className="split-text">
      {text.split('').map((ch, i) => (
        <motion.span key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.02 }}>
          {ch}
        </motion.span>
      ))}
    </h1>
  )
}

export function BlurText({ text = 'blur me' }) {
  return <h2 className="blur-text">{text}</h2>
}

export function ShinyText({ text = 'Shiny' }) {
  return <h2 className="shiny-text">{text}</h2>
}

export function TextPressure({ text = 'Pressure' }) {
  return (
    <button className="pressure-btn" onMouseDown={(e)=> e.currentTarget.classList.add('pressed')} onMouseUp={(e)=> e.currentTarget.classList.remove('pressed')}>
      {text}
    </button>
  )
}

export function GradientText({ text = 'Gradient' }) {
  return <h3 className="gradient-text">{text}</h3>
}

/* ---- Focus/spotlight and cursor ---- */
export function TrueFocus() {
  return <div className="true-focus-card">Hover to see focus spotlight follow your cursor.</div>
}

export function TargetCursor() {
  // creates a custom cursor ring following the mouse
  const [pos, setPos] = useState({ x: -100, y: -100 })
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return <div className="target-cursor" style={{ left: pos.x, top: pos.y }} />
}

/* ---- Scroll + float + reveal ---- */
export function ScrollFloat() {
  return <div className="float-card">Floating on scroll (simple parallax)</div>
}

export function ScrollReveal({ children }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}> 
      {children}
    </div>
  )
}

/* ---- Rotating / proximity ---- */
export function RotatingText({ text = 'ROTATING' }) {
  return <div className="rotating-text">{text}</div>
}

export function VariableProximity() {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const dist = Math.sqrt(dx*dx + dy*dy)
      const max = 300
      const scale = 1 + Math.max(0, (max - dist) / 1200)
      el.style.transform = `scale(${scale}) translate(${dx/20}px, ${dy/20}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return <div ref={ref} className="proximity-box">Move near me</div>
}

/* ---- Counters / animated content ---- */
export function CountUpDemo() {
  return (
    <div className="counter">
      <CountUp end={1234} duration={2.5} separator="," />
      <div className="muted">projects</div>
    </div>
  )
}

export function AnimatedContent() {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="animated-card">
      Animated content — framer-motion
    </motion.div>
  )
}

export function FadeContent() {
  return <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="fade-card">Fade in content</motion.div>
}

/* ---- Electric border / logo loop / gradual blur ---- */
export function ElectricBorder({ children }) {
  return <div className="electric-border">{children}</div>
}

export function LogoLoop() {
  const logos = ['⚡','🔷','🔶','⭐']
  return (
    <div className="logo-loop">
      {logos.map((l,i)=> <div key={i} className="logo">{l}</div>)}
    </div>
  )
}

export function GradualBlur() {
  const ref = useRef()
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      const v = Math.min(12, Math.max(0, (window.scrollY / 200)))
      ref.current.style.filter = `blur(${v}px)`
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div ref={ref} className="gradual-blur">Gradual blur as you scroll</div>
}

/* ---- Click spark particles (simple span) ---- */
export function ClickSpark() {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onClick = (e) => {
      const p = document.createElement('span')
      p.className = 'spark'
      p.style.left = `${e.clientX - 10}px`
      p.style.top = `${e.clientY - 10}px`
      document.body.appendChild(p)
      setTimeout(()=> p.remove(), 700)
    }
    el.addEventListener('click', onClick)
    return () => el.removeEventListener('click', onClick)
  }, [])
  return <div ref={ref} className="click-spark">Click me for sparks</div>
}

/* ---- Magnet button ---- */
export function MagnetButton() {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const dist = Math.sqrt(dx*dx + dy*dy)
      const max = 120
      if (dist < max) {
        el.style.transform = `translate(${dx/6}px, ${dy/6}px) scale(1.05)`
      } else {
        el.style.transform = ''
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return <button ref={ref} className="magnet-btn">Magnet</button>
}

/* ---- Shape blur / metaballs / gooey nav ---- */
export function ShapeBlur() {
  return <div className="shape-blur">Soft blurred shapes behind content</div>
}

export function MetaBalls() {
  return (
    <div className="metaballs">
      <svg viewBox="0 0 600 200" className="metaballs-svg">
        <defs>
          <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" /></filter>
        </defs>
        <g filter="url(#goo)">
          <circle cx="80" cy="100" r="40" fill="#ff6b6b" />
          <circle cx="160" cy="80" r="50" fill="#ffd166" />
          <circle cx="260" cy="120" r="35" fill="#4ecdc4" />
          <circle cx="340" cy="90" r="45" fill="#5b5f97" />
        </g>
      </svg>
    </div>
  )
}

export function StarBorder() {
  return <div className="star-border">Star border effect</div>
}

/* ---- Lists, bento, tilted card ---- */
export function AnimatedList() {
  const items = ['One','Two','Three','Four']
  return (
    <div className="animated-list">
      {items.map((it,i)=>(
        <motion.div key={it} initial={{ x:-20, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ delay: i*0.12 }} className="list-item">{it}</motion.div>
      ))}
    </div>
  )
}

export function MagicBento() {
  return <div className="magic-bento">Magic Bento grid — hover rearranges</div>
}

export function TiltedCard() {
  return (
    <Tilt glareEnable={true} className="tilt-card">
      <div className="tilt-inner">
        Tilted card with glare
      </div>
    </Tilt>
  )
}

/* ---- Folder, menu, profile, dock ---- */
export function FolderCard() {
  const [open, setOpen] = useState(false)
  return (
    <div className={`folder ${open ? 'open' : ''}`} onClick={()=>setOpen(!open)}>
      <div className="folder-top">Folder {open ? 'open' : 'closed'}</div>
      <div className="folder-body">Contents</div>
    </div>
  )
}

export function StaggeredMenu() {
  const [open, setOpen] = useState(false)
  const items = ['Home','Work','About','Contact']
  return (
    <div className="staggered-menu">
      <button onClick={()=>setOpen(v=>!v)} className="menu-toggle">Menu</button>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="menu-list">
            {items.map((it,i)=> <motion.li key={it} initial={{ x:-10, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ delay: i*0.06 }}>{it}</motion.li>)}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="avatar">SB</div>
      <div className="meta">
        <div className="name">Sumitansu</div>
        <div className="role">Developer & Designer</div>
      </div>
    </div>
  )
}

export function Dock() {
  return <div className="dock">Dock: hover icons enlarge (CSS)</div>
}

/* ---- Gooey nav / spotlight / card swap / glass icons ---- */
export function GooeyNav() {
  return (
    <div className="gooey-nav">
      <svg className="goo-filter" width="0" height="0">
        <defs>
          <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"/></filter>
        </defs>
      </svg>
      <div className="goo-items" style={{ filter: 'url(#goo)' }}>
        <div className="goo-item">A</div>
        <div className="goo-item">B</div>
        <div className="goo-item">C</div>
      </div>
    </div>
  )
}

export function SpotlightCard() {
  return <div className="spotlight-card">Spotlight card</div>
}

export function CardSwap() {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className={`swap ${flipped ? 'flipped' : ''}`} onClick={()=>setFlipped(v=>!v)}>
      <div className="front">Front</div>
      <div className="back">Back</div>
    </div>
  )
}

export function GlassIcon() {
  return <div className="glass-icon">🔔</div>
}

/* ---- Elastic slider / counter stepper / dark veil / blinds ---- */
export function ElasticSlider() {
  return <div className="elastic-slider">Elastic slider placeholder (spring feel)</div>
}

export function CounterStepper() {
  const [n,setN] = useState(0)
  return (
    <div className="stepper">
      <button onClick={()=>setN(n-1)}>-</button>
      <div className="value">{n}</div>
      <button onClick={()=>setN(n+1)}>+</button>
    </div>
  )
}

export function DarkVeil() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={()=>setOpen(true)}>Open veil</button>
      {open && <div className="veil" onClick={()=>setOpen(false)} />}
    </div>
  )
}

export function GradientBlinds() {
  return (
    <div className="blinds">
      <div className="blind">A</div><div className="blind">B</div><div className="blind">C</div>
    </div>
  )
}