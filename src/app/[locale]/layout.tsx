import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { Analytics } from '@/components/analytics'
import { Hello } from '@/components/hello'
import { Providers } from '@/components/providers'
import { MY_NAME } from '@/constants/site'
import { routing } from '@/i18n/routing'
import { createRootMetadata } from '@/lib/metadata'
import { cn } from '@/utils/cn'

export function generateStaticParams(): Array<{ locale: string }> {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = createRootMetadata({
  title: {
    template: `%s | ${MY_NAME}`,
    default: MY_NAME,
  },
})

export const viewport: Viewport = {
  themeColor: [
    // Both entries use the dark artichoke background, since the site forces dark mode anyway.
    { media: '(prefers-color-scheme: light)', color: '#090f0a' },
    // Same colour for dark, so the mobile browser bar always blends into the page.
    { media: '(prefers-color-scheme: dark)', color: '#090f0a' },
  ],
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

async function Layout(props: LayoutProps<'/[locale]'>) {
  const { children, params } = props
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={cn(geistSans.variable, geistMono.variable)}
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <NextIntlClientProvider>
            <Hello />
            {children}
            <Analytics />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

export default Layout
