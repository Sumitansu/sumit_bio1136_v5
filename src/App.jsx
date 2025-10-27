import React from 'react'
import {
  SplitText,
  BlurText,
  ShinyText,
  TextPressure,
  GradientText,
  TrueFocus,
  ScrollFloat,
  ScrollReveal,
  RotatingText,
  VariableProximity,
  CountUpDemo,
  AnimatedContent,
  FadeContent,
  ElectricBorder,
  LogoLoop,
  TargetCursor,
  GradualBlur,
  ClickSpark,
  MagnetButton,
  ShapeBlur,
  MetaBalls,
  StarBorder,
  AnimatedList,
  MagicBento,
  TiltedCard,
  FolderCard,
  StaggeredMenu,
  ProfileCard,
  Dock,
  GooeyNav,
  SpotlightCard,
  CardSwap,
  GlassIcon,
  ElasticSlider,
  CounterStepper,
  DarkVeil,
  GradientBlinds
} from './components/DemoComponents'

export default function App() {
  return (
    <div className="app">
      <TargetCursor />
      <header className="hero">
        <div className="hero-inner">
          <SplitText text="Sumitansu - Portfolio v5" />
          <GradientText text="React + Animations Demo" />
          <ShinyText text="shiny text" />
        </div>
      </header>

      <main className="grid">
        <section className="card"><ScrollReveal><TiltedCard /></ScrollReveal></section>
        <section className="card"><ProfileCard /></section>
        <section className="card"><CountUpDemo /></section>
        <section className="card"><AnimatedList /></section>
        <section className="card"><MagicBento /></section>
        <section className="card"><GooeyNav /></section>
        <section className="card"><MetaBalls /></section>
        <section className="card"><ClickSpark /></section>
        <section className="card"><MagnetButton /></section>
        <section className="card"><TextPressure text="Press me" /></section>
        <section className="card"><RotatingText text="ROTATE" /></section>
        <section className="card"><VariableProximity /></section>
        <section className="card"><AnimatedContent /></section>
        <section className="card"><FadeContent /></section>
        <section className="card"><LogoLoop /></section>
        <section className="card"><ElectricBorder>Electric</ElectricBorder></section>
        <section className="card"><GradualBlur /></section>
        <section className="card"><ShapeBlur /></section>
        <section className="card"><StarBorder /></section>
        <section className="card"><StaggeredMenu /></section>
        <section className="card"><FolderCard /></section>
        <section className="card"><CardSwap /></section>
        <section className="card"><GlassIcon /></section>
        <section className="card"><ElasticSlider /></section>
        <section className="card"><CounterStepper /></section>
        <section className="card"><DarkVeil /></section>
        <section className="card"><GradientBlinds /></section>
        <section className="card"><TrueFocus /></section>
      </main>

      <footer className="footer">
        <p>Demo — press, hover, and scroll to see effects. Built for Sumitansu.</p>
      </footer>
    </div>
  )
}