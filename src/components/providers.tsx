'use client'

import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

type ProvidesProps = {
  children: React.ReactNode
}

export function Providers(props: ProvidesProps) {
  const { children } = props

  return (
    <ThemeProvider attribute='class' forcedTheme='dark' defaultTheme='dark' enableSystem={false} disableTransitionOnChange>
      <TooltipProvider>
        {children}
        <Toaster
          toastOptions={{
            duration: 2500,
          }}
          visibleToasts={5}
          expand
        />
      </TooltipProvider>
    </ThemeProvider>
  )
}
