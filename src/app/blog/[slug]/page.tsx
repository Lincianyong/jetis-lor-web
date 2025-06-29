// app/posts/[slug]/page.tsx
import { client } from '../../../../lib/sanity'
import { postBySlugQuery } from '@/sanity/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../../../lib/sanity'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className="container mx-auto py-12 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <span>By {post.author.name}</span>
          <span>•</span>
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(1200).height(630).url()}
            alt={post.mainImage.alt || ''}
            width={1200}
            height={630}
            className="w-full rounded-lg"
          />
        )}
      </header>

      <div className="prose max-w-none">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current }`)
  return posts.map((post: any) => ({ slug: post.slug }))
}