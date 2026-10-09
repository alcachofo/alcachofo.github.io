'use client'

// next/image renders the small artichoke logo; images are unoptimized site-wide, so it is a plain <img> in the end.
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useLayoutEffect, useRef } from 'react'

import { CommandMenu } from '@/components/command-menu'
import { Link } from '@/components/ui/link'
// MY_NAME is the name shown next to the logo, kept in one place with the rest of the site constants.
import { MY_NAME } from '@/constants/site'

import { MobileNav } from './mobile-nav'
import { Navbar } from './navbar'
import { SkipNav } from './skip-nav'

const SCROLL_THRESHOLD = 100

export function LayoutHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number | null>(null)
  const t = useTranslations()

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return

      rafRef.current = requestAnimationFrame(() => {
        if (headerRef.current) {
          const isScrolled = window.scrollY > SCROLL_THRESHOLD

          const currentScrolled = headerRef.current.dataset.scrolled === 'true'

          if (isScrolled !== currentScrolled) {
            headerRef.current.dataset.scrolled = String(isScrolled)
          }
        }

        rafRef.current = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className='fixed inset-x-0 top-4 z-40 mx-auto flex h-15 max-w-5xl items-center justify-between rounded-2xl bg-background/30 px-8 shadow-xs backdrop-blur-md transition-colors data-[scrolled=true]:bg-background/80'
    >
      <SkipNav />
      <Link
        href='/'
        aria-label={t('common.labels.home')}
        className='flex items-center gap-2 font-mono text-sm font-semibold tracking-tight'
      >
        {/* The artichoke cutout sits in front of the name; alt is empty because the link already has a label. */}
        <Image src='/images/artichoke.png' alt='' width={22} height={26} className='h-6.5 w-auto' priority />
        {MY_NAME}
      </Link>
      <div className='flex items-center gap-2'>
        <Navbar />
        <CommandMenu />
        <MobileNav />
      </div>
    </header>
  )
}
