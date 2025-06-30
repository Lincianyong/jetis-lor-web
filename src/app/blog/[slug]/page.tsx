// app/posts/[slug]/page.tsx
import { client } from '../../../../lib/sanity'
import { postBySlugQuery } from '@/sanity/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../../../lib/sanity'
import NavBar from '@/app/components/NavigationAndFooter/NavigationBar'
import Footer from '@/app/components/NavigationAndFooter/Footer'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div>
      <div className='xl:container xl:mx-auto mx-6 md:mx-16 lg:mx-20'>
        <NavBar />
      </div>
      <article className="container mx-auto py-12 max-w-3xl mb-12">
        <header className="mb-8">
          <h1 className="text-[40px] font-semibold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 font-medium mb-6">
            <span>Oleh {post.author.name}</span>
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

        <div className="prose max-w-none mt-4 font-medium text-[16px] break-all leading-7">
          <PortableText value={post.body} />
        </div>
      </article>
        <Footer />
    </div>
  )
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current }`)
  return posts.map((post: any) => ({ slug: post.slug }))
}