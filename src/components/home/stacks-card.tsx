'use client'

import {
  SiBurpsuite,
  SiC,
  SiDocker,
  SiEthereum,
  SiGit,
  SiGithub,
  SiGnubash,
  SiHackthebox,
  SiJavascript,
  SiKalilinux,
  SiLinux,
  SiOpenstreetmap,
  SiOwasp,
  SiPython,
  SiSolidity,
  SiWireshark,
} from '@icons-pack/react-simple-icons'
import { ZapIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Marquee } from '@/components/ui/marquee'

export function StacksCard() {
  const t = useTranslations()

  return (
    <div className='flex h-60 flex-col gap-2 overflow-hidden rounded-2xl p-4 shadow-feature-card lg:p-6'>
      <div className='flex items-center gap-2'>
        <ZapIcon className='size-4.5' />
        <h2 className='text-sm'>{t('homepage.about-me.stacks')}</h2>
      </div>
      {/* Top row: the languages used across the writeups, then the web and network tools. */}
      <Marquee gap='20px' className='py-4'>
        <SiPython className='size-10' />
        <SiC className='size-10' />
        <SiGnubash className='size-10' />
        <SiJavascript className='size-10' />
        <SiSolidity className='size-10' />
        <SiBurpsuite className='size-10' />
        <SiWireshark className='size-10' />
        <SiOwasp className='size-10' />
      </Marquee>
      {/* Bottom row, scrolling the other way: systems, workflow, web3, practice platform and the OSINT map. */}
      <Marquee gap='20px' className='py-4' reverse>
        <SiKalilinux className='size-10' />
        <SiLinux className='size-10' />
        <SiDocker className='size-10' />
        <SiGit className='size-10' />
        <SiGithub className='size-10' />
        <SiEthereum className='size-10' />
        <SiHackthebox className='size-10' />
        <SiOpenstreetmap className='size-10' />
      </Marquee>
    </div>
  )
}
