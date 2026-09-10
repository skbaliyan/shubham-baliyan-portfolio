import { useEffect, useRef } from 'react'

/* ============================================================
   PARTICLE DRIFT — hero background
   Canvas, no library, ~60 lines of maths. Stays inside the
   palette: white at low alpha with a few acid particles, over
   the void. It sits under the grid and the scanline, so it has
   to stay quiet or the composition turns to soup.

   It stops running when it is off-screen, when the tab is
   hidden, and entirely under prefers-reduced-motion.
   ============================================================ */

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  acid: boolean
  alpha: number
}

const density = (w: number) => {
  if (w < 640) return 26
  if (w < 1024) return 40
  return 58
}

export const ParticleField = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let particles: Particle[] = []
    let raf = 0
    let running = false
    let w = 0
    let h = 0

    const seed = () => {
      const n = density(w)
      particles = Array.from({ length: n }, () => {
        const acid = Math.random() < 0.18
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          // Slow diagonal drift, upward-biased. Nothing should read as motion
          // unless you look for it.
          vx: (Math.random() - 0.5) * 0.16,
          vy: -(0.05 + Math.random() * 0.18),
          r: acid ? 1.1 + Math.random() * 0.9 : 0.6 + Math.random() * 1.1,
          acid,
          alpha: acid ? 0.22 + Math.random() * 0.2 : 0.07 + Math.random() * 0.12,
        }
      })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const paint = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.acid
          ? `rgba(223, 255, 0, ${p.alpha})`
          : `rgba(255, 255, 255, ${p.alpha})`
        ctx.fill()
      }
    }

    const step = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        // Wrap rather than respawn, so density never flickers.
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w }
        if (p.x < -4) p.x = w + 4
        if (p.x > w + 4) p.x = -4
      }
      paint()
      raf = requestAnimationFrame(step)
    }

    const start = () => {
      if (running || reduced.matches) return
      running = true
      raf = requestAnimationFrame(step)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()
    if (reduced.matches) {
      // One static frame: the texture without the movement.
      paint()
    } else {
      start()
    }

    // Only animate while the hero is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    const onReducedChange = () => {
      stop()
      if (reduced.matches) paint()
      else start()
    }

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        resize()
        if (reduced.matches) paint()
      }, 150)
    }

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', onResize)
    reduced.addEventListener('change', onReducedChange)

    return () => {
      stop()
      io.disconnect()
      window.clearTimeout(resizeTimer)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      reduced.removeEventListener('change', onReducedChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
