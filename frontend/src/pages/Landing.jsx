import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    }, { threshold: 0.15 })
    reveals.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-black text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
        {/* Subtle radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 45%, rgba(80,60,30,0.15) 0%, transparent 70%)' }} />

        {/* 3D Bowl / Plate */}
        <div className="absolute left-1/2 top-1/2 w-[min(70vw,700px)] h-[min(70vw,700px)] z-0" style={{ transform: 'translate(-50%, -50%)' }}>
          <div className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(ellipse 100% 100% at 38% 35%, rgba(255,255,255,0.12) 0%, transparent 50%),
                radial-gradient(ellipse 90% 90% at 65% 70%, rgba(180,140,80,0.08) 0%, transparent 45%),
                conic-gradient(from 220deg at 50% 50%, rgba(255,255,255,0.04) 0deg, rgba(255,255,255,0.08) 60deg, rgba(255,255,255,0.02) 120deg, rgba(200,170,100,0.06) 200deg, rgba(255,255,255,0.04) 300deg, rgba(255,255,255,0.04) 360deg)
              `,
              boxShadow: '0 40px 120px rgba(0,0,0,0.5), inset 0 2px 30px rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              animation: 'heroFloat 8s ease-in-out infinite',
            }}
          />
          <div className="absolute inset-[15%] rounded-full"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 45% 40%, rgba(60,40,20,0.3) 0%, transparent 60%),
                radial-gradient(ellipse 120% 120% at 50% 50%, rgba(0,0,0,0.4) 0%, transparent 70%)
              `,
              boxShadow: 'inset 0 8px 40px rgba(0,0,0,0.3), inset 0 -4px 20px rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.03)',
            }}
          />
          <div className="absolute inset-[5%] rounded-full"
            style={{
              background: 'radial-gradient(ellipse 40% 20% at 32% 28%, rgba(255,255,255,0.1) 0%, transparent 100%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>

        {/* Text */}
        <div className="relative text-center z-10">
          <p className="font-body italic font-light text-lg sm:text-2xl text-white/70 mb-4 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            you are what you eat
          </p>
          <h1 className="font-display font-black text-[clamp(4rem,12vw,9rem)] leading-[0.95] tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '0.9s' }}>
            WhatToEat
          </h1>
          <p className="font-body font-light text-base sm:text-xl text-white/50 max-w-lg mx-auto px-4 animate-fade-up" style={{ animationDelay: '1.2s' }}>
            Find the perfect recipe with what's already in your kitchen
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: '1.8s' }}>
          <div className="w-[22px] h-[36px] border-[1.5px] border-white/50 rounded-[11px] relative">
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[2px] h-[7px] bg-white rounded-sm" style={{ animation: 'scrollPulse 1.6s infinite' }} />
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="min-h-screen relative flex items-center justify-center bg-black">
        <div className="relative text-center max-w-2xl px-8">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold mb-10 reveal">
            Food Is Everything
          </h2>
          <p className="font-body text-lg sm:text-2xl leading-[1.9] text-white/65 font-light reveal">
            The way you eat shapes the way you feel, think, and move.
            It's not about diets or restrictions — it's about giving your body
            what it actually needs. More energy in the morning. Better sleep at night.
            A clearer head. It all starts on your plate.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="min-h-screen bg-black">
        <div className="grid grid-cols-2 sm:grid-cols-4 w-full min-h-screen">

          <div className="border border-white/[0.07] flex flex-col justify-center items-center text-center p-7 min-h-[30vh] sm:min-h-[50vh]">
            <div className="font-display text-[clamp(1.5rem,3vw,3rem)] font-bold mb-2 reveal">01</div>
            <div className="font-body text-xs tracking-[0.14em] uppercase text-white/45">Step One</div>
            <div className="font-body text-lg text-white/65 mt-1">Choose your nutrition goal</div>
          </div>

          <div className="border border-white/[0.07] flex flex-col justify-center items-center text-center p-7 min-h-[30vh] sm:min-h-[50vh]">
            <div className="font-display text-[clamp(1.5rem,3vw,3rem)] font-bold mb-2 reveal">02</div>
            <div className="font-body text-xs tracking-[0.14em] uppercase text-white/45">Step Two</div>
            <div className="font-body text-lg text-white/65 mt-1">Select your cooking level</div>
          </div>

          <div className="border border-white/[0.07] flex flex-col justify-center items-center text-center p-7 min-h-[30vh] sm:min-h-[50vh]">
            <div className="font-display text-[clamp(1.5rem,3vw,3rem)] font-bold mb-2 reveal">03</div>
            <div className="font-body text-xs tracking-[0.14em] uppercase text-white/45">Step Three</div>
            <div className="font-body text-lg text-white/65 mt-1">Enter your available ingredients</div>
          </div>

          <div className="border border-white/[0.07] flex flex-col justify-center items-center text-center p-7 min-h-[30vh] sm:min-h-[50vh]">
            <div className="font-display text-[clamp(1.5rem,3vw,3rem)] font-bold mb-2 reveal">04</div>
            <div className="font-body text-xs tracking-[0.14em] uppercase text-white/45">Step Four</div>
            <div className="font-body text-lg text-white/65 mt-1">Get personalized recipes</div>
          </div>

          {/* Row 2 */}
          <div className="border border-white/[0.07] flex flex-col justify-center items-center p-7 min-h-[30vh] sm:min-h-[50vh]">
            <div className="font-display text-[clamp(2rem,4vw,4rem)] font-bold mb-2 reveal">70</div>
            <div className="font-body text-xs tracking-[0.14em] uppercase text-white/45">Ingredients</div>
            <div className="font-body text-base text-white/55 mt-1">In our database</div>
          </div>

          <div className="border border-white/[0.07] flex flex-col justify-center items-center p-7 min-h-[30vh] sm:min-h-[50vh]">
            <div className="font-display text-[clamp(2rem,4vw,4rem)] font-bold mb-2 reveal">38</div>
            <div className="font-body text-xs tracking-[0.14em] uppercase text-white/45">Recipes</div>
            <div className="font-body text-base text-white/55 mt-1">Curated dishes</div>
          </div>

          <div className="border border-white/[0.07] flex flex-col justify-center items-center p-7 min-h-[30vh] sm:min-h-[50vh]">
            <div className="font-display text-[clamp(2rem,4vw,4rem)] font-bold mb-2 reveal">4</div>
            <div className="font-body text-xs tracking-[0.14em] uppercase text-white/45">Goals</div>
            <div className="font-body text-base text-white/55 mt-1">Nutrition paths</div>
          </div>

          <div className="border border-white/[0.07] flex flex-col justify-center items-center p-7 min-h-[30vh] sm:min-h-[50vh]">
            <div className="font-body text-xs tracking-[0.14em] uppercase text-white/45 mb-2">Track</div>
            <div className="font-body text-lg text-white/65 text-center">Calories, macros &<br/>shopping lists</div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold mb-8 reveal">
            Start Eating Better Today
          </h2>
          <button
            onClick={() => navigate('/goals')}
            className="btn-primary px-16 py-6 rounded-none font-body text-sm tracking-[0.14em] uppercase hover:scale-105 transition-transform reveal"
          >
            Start Now
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-white/[0.07] text-center">
        <p className="font-body text-sm text-white/35 tracking-[0.1em] uppercase">
          Created by Maksim Bodulev
        </p>
      </footer>

    </div>
  )
}
