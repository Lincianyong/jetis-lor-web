// app/posts/page.tsx
import { client } from '@/sanity/lib/client'
import { postsQuery } from '../../sanity/lib/sanity.queries'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export default async function PostsPage() {
  const posts = await client.fetch(postsQuery)

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">All Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <article key={post._id} className="border rounded-lg overflow-hidden">
            <Link href={`/blog/${post.slug.current}`}>
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).width(600).height(400).url()}
                  alt={post.mainImage.alt || ''}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">
                  By {post.author.name} • {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{post.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}