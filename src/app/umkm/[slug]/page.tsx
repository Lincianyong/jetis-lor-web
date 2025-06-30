// app/umkm/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { umkmBySlugQuery } from '@/sanity/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../../../lib/sanity'
import NavBar from '@/app/components/NavigationAndFooter/NavigationBar'
import Footer from '@/app/components/NavigationAndFooter/Footer'

export default async function UmkmDetailPage({ params }: { params: { slug: string } }) {
  const umkm = await client.fetch(umkmBySlugQuery, { slug: params.slug })

  if (!umkm) return <div>UMKM not found</div>

  return (
    <div>
      <div className="xl:container xl:mx-auto mx-6 md:mx-16 lg:mx-20">
        <NavBar />
      </div>
      <div className='container mx-auto py-12 max-w-3xl mb-12 min-h-screen'>
        <div className="grid md:grid-cols-2 gap-8 mb-12 mt-12">
          {/* Fixed size image container */}
          <div className="relative h-64 w-full"> {/* Adjust height as needed */}
            <Image
              src={urlFor(umkm.thumbnail).width(800).height(600).url()}
              alt={umkm.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Content aligned vertically center */}
          <div className="flex flex-col justify-center">
            <div>
              {umkm.categories?.map((cat: any) => (
                <span 
                  key={cat._id || cat.title}
                  className="text-[18px] font-medium"
                >
                  {cat.title}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold mb-4">{umkm.title}</h1>
            
            <div className="mb-4">
              <h2 className="text-[16px] font-medium mb-2">Products</h2>
              <ul className="flex flex-wrap gap-2">
                {umkm.products?.map((product: string, i: number) => (
                  <li key={i} className="bg-gray-100 px-2 py-1 text-sm rounded font-medium">
                    {product}
                  </li>
                ))}
              </ul>
            </div>
            
            {umkm.locationUrl && (
              <a 
                href={umkm.locationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline mb-6"
              >
                View Location ↗
              </a>
            )}
          </div>
        </div>

        {umkm.longDescription && (
          <div className="prose max-w-none font-medium text-[16px] leading-7">
            <PortableText value={umkm.longDescription}/>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

// Generate static paths
export async function generateStaticParams() {
  const umkms = await client.fetch(`*[_type == "umkm"] { "slug": _id }`)
  return umkms.map((umkm: any) => ({ slug: umkm.slug }))
}