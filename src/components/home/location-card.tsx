'use client'

import type { Globe } from 'cobe'

import createGlobe from 'cobe'
import { MapPinIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Badge } from '../ui/badge'

// One marker in the middle of Spain (latitude 40, longitude -3.7); the badge above it reads the location-value string.
const MARKERS = [{ id: 'es', location: [40, -3.7] as [number, number], size: 0.03 }]

function getThemeOptions(isDark: boolean) {
  return {
    dark: isDark ? 1 : 0,
    diffuse: isDark ? 2 : 1.5,
    mapBrightness: isDark ? 2 : 1.5,
    // The land dots: a soft artichoke green in the dark theme, a pale leaf green in the light one.
    baseColor: isDark ? ([0.55, 0.8, 0.45] as [number, number, number]) : ([0.86, 0.95, 0.8] as [number, number, number]),
    // The marker dot is the bright lime used for buttons, or a deep leaf green on the light globe.
    markerColor: isDark ? ([0.75, 0.95, 0.4] as [number, number, number]) : ([0.25, 0.55, 0.2] as [number, number, number]),
    // The halo around the globe follows the same two greens.
    glowColor: isDark
      ? ([0.3, 0.55, 0.3] as [number, number, number])
      : ([0.8, 0.92, 0.72] as [number, number, number]),
  }
}

export function LocationCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<Globe | null>(null)
  const [ready, setReady] = useState(false)
  const pointerInteractingRef = useRef<{ x: number; y: number } | null>(null)
  const dragOffsetRef = useRef({ phi: 0 })
  // cobe faces longitude L at phi = 3π/2 - L (radians); for Spain's -3.7° that is about 4.78.
  const phiOffsetRef = useRef(4.78)

  const t = useTranslations()

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteractingRef.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
  }, [])

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      if (pointerInteractingRef.current !== null) {
        const deltaX = e.clientX - pointerInteractingRef.current.x
        dragOffsetRef.current = { phi: deltaX / 300 }
      }
    }

    function handlePointerUp() {
      if (pointerInteractingRef.current !== null) {
        phiOffsetRef.current += dragOffsetRef.current.phi
        dragOffsetRef.current = { phi: 0 }
      }
      pointerInteractingRef.current = null
      if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
    }

    globalThis.addEventListener('pointermove', handlePointerMove, { passive: true })
    globalThis.addEventListener('pointerup', handlePointerUp, { passive: true })

    return () => {
      globalThis.removeEventListener('pointermove', handlePointerMove)
      globalThis.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const width = canvas.offsetWidth
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.8 : 2)

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width,
      height: width,
      phi: phiOffsetRef.current,
      theta: 0,
      mapSamples: 16_000,
      markerElevation: 0.01,
      markers: MARKERS,
      ...getThemeOptions(false),
    })

    let animationId = 0

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      const nextWidth = Math.round(entry.contentRect.width)
      const nextDpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.8 : 2)

      globeRef.current?.update({
        devicePixelRatio: nextDpr,
        width: nextWidth,
        height: nextWidth,
      })
    })

    resizeObserver.observe(canvas)

    function animate() {
      globeRef.current?.update({
        phi: phiOffsetRef.current + dragOffsetRef.current.phi,
      })
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const fadeInId = requestAnimationFrame(() => {
      setReady(true)
    })

    return () => {
      cancelAnimationFrame(animationId)
      cancelAnimationFrame(fadeInId)
      resizeObserver.disconnect()
      globeRef.current?.destroy()
      globeRef.current = null
    }
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      globeRef.current?.update(getThemeOptions(isDark))
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className='relative flex h-60 flex-col gap-6 overflow-hidden rounded-2xl p-4 shadow-feature-card lg:p-6'>
      <div className='flex items-center gap-2'>
        <MapPinIcon className='size-4.5' />
        <h2 className='text-sm'>{t('homepage.about-me.location')}</h2>
      </div>
      <div className='relative mx-auto -mt-4 aspect-square max-w-125 select-none'>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          data-ready={ready}
          className='aspect-square size-full cursor-grab touch-none opacity-0 transition-opacity data-[ready=true]:opacity-100'
        />
        {MARKERS.map((m) => (
          <div
            key={m.id}
            className='pointer-events-none absolute bottom-[anchor(top)] left-[anchor(center)] -translate-x-1/2 -translate-y-2 transition-[opacity,filter]'
            style={{
              positionAnchor: `--cobe-${m.id}`,
              opacity: `var(--cobe-visible-${m.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            }}
          >
            <Badge>{t('homepage.about-me.location-value')}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
