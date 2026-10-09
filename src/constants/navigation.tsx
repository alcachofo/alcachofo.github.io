import { SiGithub, SiHackerone } from '@icons-pack/react-simple-icons'
import { FlameIcon, PencilIcon, UserCircleIcon } from 'lucide-react'

import { SITE_GITHUB_URL, SITE_HACKERONE_URL } from './site'

export const HEADER_LINKS = [
  {
    icon: <PencilIcon />,
    href: '/blog',
    // i18n-check t('common.labels.blog')
    labelKey: 'common.labels.blog',
  },
  {
    icon: <FlameIcon />,
    href: '/projects',
    // i18n-check t('common.labels.projects')
    labelKey: 'common.labels.projects',
  },
  {
    icon: <UserCircleIcon />,
    href: '/about',
    // i18n-check t('common.labels.about')
    labelKey: 'common.labels.about',
  },
] as const

export const FOOTER_GROUPS = [
  {
    id: 'main',
    links: [
      // i18n-check t('common.labels.home')
      { href: '/', labelKey: 'common.labels.home' },
      // i18n-check t('common.labels.blog')
      { href: '/blog', labelKey: 'common.labels.blog' },
      // i18n-check t('common.labels.about')
      { href: '/about', labelKey: 'common.labels.about' },
    ],
  },
  {
    id: 'site',
    links: [
      // i18n-check t('common.labels.projects')
      { href: '/projects', labelKey: 'common.labels.projects' },
    ],
  },
  {
    id: 'social',
    links: [
      // i18n-check t('common.labels.github')
      { href: SITE_GITHUB_URL, labelKey: 'common.labels.github' },
    ],
  },
] as const

export const SOCIAL_LINKS = [
  {
    href: SITE_GITHUB_URL,
    title: 'GitHub',
    icon: <SiGithub />,
  },
  {
    // HackerOne sits right under GitHub in the Connect card.
    href: SITE_HACKERONE_URL,
    title: 'HackerOne',
    icon: <SiHackerone />,
  },
] as const
