'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/sanity.queries'
import { urlFor } from '@/sanity/lib/image'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  author: { name: string }
  mainImage?: any
  publishedAt: string
}

export default function ArticleCards() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await client.fetch(postsQuery)
      setPosts(data.slice(0, 3)) // only show 3 latest
    }
    fetchPosts()
  }, [])

  return (
    <div className="space-y-9">
      <div className="flex justify-center">
        <h2 className="font-semibold text-[40px]">Artikel Terbaru</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="border rounded-2xl overflow-hidden group hover:shadow-md transition"
          >
            <div className="p-5">
              <h3 className="text-[22px] font-semibold mb-1 line-clamp-2">{post.title}</h3>
              <p className="text-[16px] font-medium">
                {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}{" "}
                • {post.author.name}
              </p>
            </div>
            <div className='rounded-2xl p-5 pt-0'>
                {post.mainImage && (
                <Image
                    src={urlFor(post.mainImage).width(600).height(400).url()}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover rounded-lg"
                />
                )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
