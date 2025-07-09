'use client' // Add this at the top

import { useEffect, useState } from 'react' // Import React hooks
import { client } from '@/sanity/lib/client'
import { postsQuery } from '../../sanity/lib/sanity.queries'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import NavBar from '../components/NavigationAndFooter/NavigationBar'
import Footer from '../components/NavigationAndFooter/Footer'

// Remove the metadata export since client components can't export metadata
// We'll handle this with useEffect below

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(postsQuery)
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Set page title dynamically
  useEffect(() => {
    document.title = 'Artikel | Website Jetis Lor'
  }, [])

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading posts...</p>
      </div>
    )
  }

  // Handle case where there are no posts
  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No posts available</p>
      </div>
    )
  }

  const topPost = posts[0]
  const mobilePosts = posts.slice(1)
  const nextThreePosts = posts.slice(1, 4)
  const remainingPosts = posts.slice(4)

  return (
    <div>
      <div className="xl:container xl:mx-auto mx-6 md:mx-16 lg:mx-20">
        <NavBar />

        {/* Top Featured Post - shown on all screens */}
        {topPost && (
          <div className="mt-12 mb-8">
            <Link href={`/artikel/${topPost.slug.current}`}>
              <article className="w-full flex flex-col md:flex-row border border-[#CACACA] p-6 rounded-2xl gap-6">
                <div className="relative h-[260px] w-full md:w-[450px] mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(topPost.mainImage).width(1200).height(600).url()}
                    alt={topPost.mainImage.alt || ''}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[20px] text-black font-medium mb-1">
                    {topPost.categories?.map((cat: any) => cat.title).join(', ')}
                  </div>
                  <h2 className="text-[28px] md:text-[32px] font-semibold">{topPost.title}</h2>
                  <p className="text-black font-medium mb-2 text-[16px]">
                    Oleh {topPost.author.name} •{' '}
                    {new Date(topPost.publishedAt).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-black break-all text-[16px] mt-4 leading-7">
                    {topPost.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* Mobile List (hidden on md+) */}
        <div className="md:hidden space-y-8 mb-12">
          {mobilePosts.map((post: any) => (
            <article
              key={post._id}
              className="border border-[#CACACA] rounded-xl overflow-hidden"
            >
              <Link href={`/artikel/${post.slug.current}`}>
                <div className="p-5">
                  <div className="text-[16px] text-black font-medium mb-1">
                    {post.categories?.map((cat: any) => cat.title).join(', ')}
                  </div>
                  <h2 className="text-[20px] font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-3">
                    Oleh {post.author.name} •{' '}
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  {post.mainImage && (
                    <div className="relative h-48 w-full mt-4 rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.mainImage.alt || ''}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="line-clamp-2 font-medium text-black text-[16px] mt-4">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Desktop Layout (hidden on mobile) */}
        <div className="hidden md:block">
          {/* Next Posts - 2 columns on md, 3 on lg+ */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {nextThreePosts.slice(0, 2).map((post: any) => (
              <article key={post._id} className="border border-[#CACACA] rounded-xl overflow-hidden">
                <Link href={`/artikel/${post.slug.current}`}>
                  <div className="p-5 pb-0">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-600 mb-2">
                      Oleh {post.author.name} • {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className='p-5'>
                    {post.mainImage && (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.mainImage.alt || ''}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </Link>
              </article>
            ))}
            {/* Show third post only on lg+ screens */}
            {nextThreePosts.length > 2 && (
              <article className="hidden lg:block border border-[#CACACA] rounded-xl overflow-hidden">
                <Link href={`/artikel/${nextThreePosts[2].slug.current}`}>
                  <div className="p-5 pb-0">
                    <h2 className="text-xl font-semibold mb-2">{nextThreePosts[2].title}</h2>
                    <p className="text-gray-600 mb-2">
                      Oleh {nextThreePosts[2].author.name} • {new Date(nextThreePosts[2].publishedAt).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className='p-5'>
                    {nextThreePosts[2].mainImage && (
                      <Image
                        src={urlFor(nextThreePosts[2].mainImage).width(600).height(400).url()}
                        alt={nextThreePosts[2].mainImage.alt || ''}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </Link>
              </article>
            )}
          </div>

          {/* Remaining Posts */}
          <div className="space-y-8 mt-18 mb-24">
            {remainingPosts.map((post: any) => (
              <article
                key={post._id}
                className="border border-l-0 border-r-0 border-[#CACACA] py-6 overflow-hidden transition-shadow"
              >
                <Link href={`/artikel/${post.slug.current}`}>
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-[180px] w-full md:w-[260px] mr-4">
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.mainImage.alt || ''}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="text-[16px] text-black font-medium mb-1">
                        {post.categories?.map((cat: any) => cat.title).join(', ')}
                      </div>
                      <h2 className="text-[20px] md:text-[24px] font-semibold mb-2">{post.title}</h2>
                      <p className="text-gray-600 text-sm mb-3">
                        Oleh {post.author.name} •{' '}
                        {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="line-clamp-2 font-medium text-black text-[16px]">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}