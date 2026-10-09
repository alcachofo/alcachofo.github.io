'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { BlurImage } from '@/components/blur-image'
import { cn } from '@/utils/cn'

const WORDS = [
  {
    // i18n-check t('homepage.hero.amazing')
    key: 'amazing',
    // "web apps" fades lime into leaf green.
    className: 'from-[#bef264] to-[#22c55e]',
  },
  {
    // i18n-check t('homepage.hero.stunning')
    key: 'stunning',
    // "binaries" fades emerald into teal.
    className: 'from-[#34d399] to-[#14b8a6]',
  },
  {
    // i18n-check t('homepage.hero.fantastic')
    key: 'fantastic',
    // "ciphers" fades mint into a darker olive.
    className: 'from-[#86efac] to-[#65a30d]',
  },
  {
    // i18n-check t('homepage.hero.attractive')
    key: 'attractive',
    // "smart contracts" ends on the purple of an artichoke tip, the one nod to its other colour.
    className: 'from-[#4ade80] to-[#a78bfa]',
  },
] as const

export function Hero() {
  return (
    <div className='my-16 flex justify-between'>
      <Introduction />
      <Avatar />
    </div>
  )
}

function Introduction() {
  const [index, setIndex] = useState(0)
  const t = useTranslations()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const WORD = WORDS[index % WORDS.length] ?? WORDS[0]

  return (
    <div className='space-y-4'>
      <h1 className='space-y-2 text-xl font-semibold sm:text-3xl'>
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ease: 'easeOut' }}>
          {t('homepage.hero.line-1')}
        </motion.div>
        <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ease: 'easeOut' }}>
          <motion.span layout>{t('homepage.hero.line-2-left')}</motion.span>
          <motion.div layout className='relative inline-block overflow-hidden align-bottom'>
            <AnimatePresence mode='popLayout' initial={false}>
              <motion.span
                key={index}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ type: 'tween', duration: 0.3 }}
                layout
                className={cn('mx-1.75 inline-block bg-linear-to-r bg-clip-text text-transparent', WORD.className)}
              >
                {t(`homepage.hero.${WORD.key}`)}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          <motion.span layout className='inline-block'>
            {t('homepage.hero.line-2-right')}
          </motion.span>
        </motion.div>
        <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ease: 'easeOut' }}>
          {t('homepage.hero.line-3')}
        </motion.div>
      </h1>
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: 'easeOut' }}
        className='text-sm text-muted-foreground'
      >
        {t('homepage.hero.location-timezone')}
      </motion.div>
    </div>
  )
}

function Avatar() {
  const t = useTranslations()

  return (
    <motion.div
      className='relative hidden size-28 md:block'
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <BlurImage
        src='/images/avatar.png'
        className='size-28 rounded-full'
        width={1024}
        height={1024}
        alt={t('homepage.hero.image-alt')}
        lazy={false}
      />
      {/* The blurred glow behind the avatar, now emerald into lime so the artichoke sits in green light. */}
      <div className='absolute inset-0 -z-10 bg-linear-to-tl from-emerald-700 to-lime-500 opacity-50 blur-2xl' />
    </motion.div>
  )
}
