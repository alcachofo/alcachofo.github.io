'use client'

import type { Metadata } from 'next'

// next/image draws the fallen artichoke above the message.
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { GoToHomepage } from '@/components/go-to-homepage'
import { MainLayout } from '@/components/main-layout'

export const metadata: Metadata = {
  title: '404',
}

function NotFound() {
  const t = useTranslations()

  return (
    <MainLayout>
      <div className='mt-40 mb-40 flex flex-col items-center justify-center gap-12'>
        {/* An artichoke lying on its side: this page fell over too. Decorative, so the alt text is empty. */}
        <Image src='/images/artichoke-side.png' alt='' width={700} height={479} className='w-72 drop-shadow-2xl' priority />
        <h1 className='text-center text-6xl font-semibold'>{t('error.not-found')}</h1>
        <GoToHomepage />
      </div>
    </MainLayout>
  )
}

export default NotFound
