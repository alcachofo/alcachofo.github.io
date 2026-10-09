import { SiGithub } from '@icons-pack/react-simple-icons'

// The footer button goes to the GitHub profile defined once in the site constants.
import { SITE_GITHUB_URL } from '@/constants/site'

import { Link } from '../ui/link'

export function GithubStarButton() {
  return (
    <Link
      href={SITE_GITHUB_URL}
      className='flex h-8 items-center gap-2 overflow-hidden rounded-4xl border bg-muted px-3 font-medium'
    >
      <SiGithub className='size-4' /> GitHub
    </Link>
  )
}
