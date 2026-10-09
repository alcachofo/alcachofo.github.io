'use client'

import type { Post } from 'content-collections'

import { PencilIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useFormattedDate } from '@/hooks/use-formatted-date'

import { ContentCard } from './content-card'

type PostCardProps = {
  post: Post
  featured?: boolean
}

export function PostCard(props: PostCardProps) {
  const { post, featured } = props
  const formattedDate = useFormattedDate(post.date)
  const t = useTranslations()

  return (
    <ContentCard
      key={post.slug}
      href={`/blog/${post.slug}`}
      title={t('homepage.latest-articles.card')}
      image={`/images/blog/${post.slug}/cover.png`}
      imageAlt={post.title}
      icon={<PencilIcon className='size-4.5' />}
      featured={featured}
    >
      <div className='flex items-center gap-2 px-2 pt-4 text-sm text-muted-foreground'>
        {formattedDate ?? '--'}
      </div>
      <div className='flex flex-col px-2 py-4 transition-transform ease-out group-hover:translate-x-0.5'>
        <h3 className='text-2xl font-semibold'>{post.title}</h3>
        <p className='mt-2 text-muted-foreground'>{post.description}</p>
      </div>
    </ContentCard>
  )
}
