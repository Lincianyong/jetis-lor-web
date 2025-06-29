// lib/sanity.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-06-21',
  useCdn: process.env.NODE_ENV === 'production'
})

// Image URL builder
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}