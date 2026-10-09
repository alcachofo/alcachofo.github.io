'use client'

import type { Post } from 'content-collections'

import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/components/ui/link'
// The site's repo, so "Edit on GitHub" opens this post's .mdx file in it.
import { SITE_REPO_URL } from '@/constants/site'
import { useFormattedDate } from '@/hooks/use-formatted-date'

type BlogFooterProps = {
  post: Post
}

export function BlogFooter(props: BlogFooterProps) {
  const { post } = props
  const t = useTranslations()
  const locale = useLocale()

  // ?plain=1 makes GitHub show the raw MDX instead of trying to render it.
  const editURL = `${SITE_REPO_URL}/blob/main/src/content/blog/${locale}/${post.slug}.mdx?plain=1`

  const formattedDate = useFormattedDate(post.lastModified)

  return (
    <div className='my-8 flex w-full items-center justify-between py-4 text-sm'>
      <Link href={editURL} className='text-muted-foreground transition-colors hover:text-foreground'>
        {t('blog.footer.edit-on-github')}
      </Link>
      <div className='text-muted-foreground'>{t('blog.footer.last-updated', { date: formattedDate ?? '--' })}</div>
    </div>
  )
}
