'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

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
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <div className="space-y-9">
      <div className="flex justify-center">
        <h2 className="font-semibold text-[28px] lg:text-[40px]">Artikel Terbaru</h2>
      </div>

      {/* Mobile Carousel (sm only) */}
      <div className="sm:block md:hidden px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 30
            }
          }}
        >
          {posts.slice(0, 3).map((post) => (
            <SwiperSlide key={post._id}>
              <div className="px-2 pb-10">
                <Link
                  href={`/artikel/${post.slug.current}`}
                  className="border rounded-2xl overflow-hidden group hover:shadow-md transition block h-full"
                >
                  <div className="p-5">
                    <h3 className="text-[18px] font-semibold mb-1 line-clamp-2">{post.title}</h3>
                    <p className="text-[14px] font-medium">
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Medium screens (md only - 2 columns) */}
      <div className="hidden sm:hidden md:grid lg:hidden grid-cols-2 gap-x-10 gap-y-6">
        {posts.slice(0, 2).map((post) => (
          <Link
            key={post._id}
            href={`/artikel/${post.slug.current}`}
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

      {/* Large screens (lg+ - 3 columns) */}
      <div className="hidden md:hidden lg:grid grid-cols-3 gap-x-10 gap-y-6">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post._id}
            href={`/artikel/${post.slug.current}`}
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