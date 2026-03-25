import { pb } from './client'
import type { Review } from '@/shared/types'

export async function fetchReviews(): Promise<Review[]> {
  const records = await pb.collection('reviews').getList(1, 50, {
    sort: '-created',
    expand: 'author',
  })

  return records.items.map((r) => ({
    id: r.id,
    text: r.text,
    rating: r.rating,
    author: r.expand?.author?.name ?? 'Аноним',
    authorId: r.author,
    avatar: r.expand?.author?.avatar
      ? pb.files.getURL(r.expand.author, r.expand.author.avatar, { thumb: '64x64' })
      : undefined,
    date: r.created,
    verified: true,
  }))
}

export async function createReview(data: {
  text: string
  rating: number
}): Promise<void> {
  await pb.collection('reviews').create({
    ...data,
    author: pb.authStore.model?.id,
  })
}
