import { client } from '@/sanity/lib/client'
import { postsQuery } from '../../sanity/lib/sanity.queries'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import NavBar from '../components/NavigationAndFooter/NavigationBar'
import Footer from '../components/NavigationAndFooter/Footer'

export default async function PostsPage() {
  const posts = await client.fetch(postsQuery)

  const topPost = posts[0]
  const nextThreePosts = posts.slice(1, 4)
  const remainingPosts = posts.slice(4)

  return (
    <div>
    <div className="xl:container xl:mx-auto mx-6 md:mx-16 lg:mx-20">
      <NavBar />

      {/* Top Featured Post */}
      {topPost && (
        <div className="mt-12 mb-8">
          <Link href={`/blog/${topPost.slug.current}`}>
            <article className="w-full flex border border-[#CACACA] p-6 rounded-2xl gap-6">
              <div className="relative h-[260px] w-[450px] mb-4 rounded-lg overflow-hidden">
                <Image
                  src={urlFor(topPost.mainImage).width(1200).height(600).url()}
                  alt={topPost.mainImage.alt || ''}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="">
                <div className="text-[20px] text-black font-medium mb-1">
                  {topPost.categories?.map((cat: any) => cat.title).join(', ')}
                </div>

                <h2 className="text-[32px] font-semibold">{topPost.title}</h2>

                {/* ✅ Formatted date */}
                <p className="text-black font-medium mb-2 text-[16px]">
                  Oleh {topPost.author.name} •{' '}
                  {new Date(topPost.publishedAt).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                <p className="text-black break-all text-[16px] mt-4 leading-7">{topPost.excerpt}</p>
              </div>
            </article>
          </Link>
        </div>
      )}


      {/* Next 3 Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {nextThreePosts.map((post: any) => (
          <article key={post._id} className="border border-[#CACACA] rounded-xl overflow-hidden">
            <Link href={`/blog/${post.slug.current}`}>
              <div className="p-5 pb-0">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">
                  Oleh {post.author.name} • {new Date(topPost.publishedAt).toLocaleDateString('id-ID', {
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
      </div>

      {/* Remaining Posts Styled Like UMKM Cards */}
      <div className="space-y-8 mt-18 mb-24">
        {remainingPosts.map((post: any) => (
          <article
            key={post._id}
            className="border border-l-0 border-r-0 border-[#CACACA] py-6 overflow-hidden transition-shadow"
          >
            <Link href={`/blog/${post.slug.current}`}>
              <div className="flex">
                <div className="relative h-[180px] w-[260px] mr-4">
                  <Image
                    src={urlFor(post.mainImage).width(600).height(400).url()}
                    alt={post.mainImage.alt || ''}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[16px] text-black font-medium mb-1">
                    {post.categories?.map((cat: any) => cat.title).join(', ')}
                  </div>
                  <h2 className="text-[24px] font-semibold mb-2">{post.title}</h2>
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
    <Footer />
    </div>
  )
}
