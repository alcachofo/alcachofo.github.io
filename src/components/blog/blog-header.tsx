'use client'

import type { Post } from 'content-collections'

import { useTranslations } from 'next-intl'

import { BlurImage } from '@/components/blur-image'
import { ImageZoom } from '@/components/image-zoom'
import { Link } from '@/components/ui/link'
import { MY_NAME, SITE_GITHUB_URL } from '@/constants/site'
import { useFormattedDate } from '@/hooks/use-formatted-date'

type BlogHeaderProps = {
  post: Post
}

export function BlogHeader(props: BlogHeaderProps) {
  const { post } = props
  const formattedDate = useFormattedDate(post.date)
  const t = useTranslations()

  return (
    <div className='space-y-16 py-16'>
      <div className='space-y-16 sm:px-8'>
        <h1 className='bg-linear-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text text-center text-4xl font-semibold text-transparent md:text-5xl/16 dark:from-white dark:via-white/90 dark:to-white/70'>
          {post.title}
        </h1>
        <div className='grid grid-cols-2 text-sm max-md:gap-4'>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>{t('blog.header.written-by')}</div>
            <Link href={SITE_GITHUB_URL} className='flex items-center gap-2'>
              <BlurImage
                src='/images/avatar.png'
                className='size-6 rounded-full'
                width={1024}
                height={1024}
                alt={t('common.avatar-alt', { name: MY_NAME })}
              />
              {MY_NAME}
            </Link>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>{t('blog.header.published-on')}</div>
            <div>{formattedDate ?? '--'}</div>
          </div>
        </div>
      </div>
      <ImageZoom>
        <BlurImage
          src={`/images/blog/${post.slug}/cover.png`}
          className='rounded-lg'
          width={1200}
          height={630}
          lazy={false}
          fetchPriority='high'
          alt={post.title}
        />
      </ImageZoom>
    </div>
  )
}
