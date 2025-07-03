// app/umkm/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { umkmBySlugQuery } from '@/sanity/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../../../lib/sanity'
import NavBar from '@/app/components/NavigationAndFooter/NavigationBar'
import Footer from '@/app/components/NavigationAndFooter/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UMKM | Website Jetis Lor',
  description: '...',
}

export default async function UmkmDetailPage({ params }: { params: { slug: string } }) {
  const umkm = await client.fetch(umkmBySlugQuery, { slug: params.slug })

  if (!umkm) return <div>UMKM not found</div>

  return (
    <div>
      <div className="xl:container xl:mx-auto mx-6 md:mx-16 lg:mx-20">
        <NavBar />
      </div>
      
      <div className='container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-3xl mb-12 min-h-screen'>
        {/* Mobile-first layout */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12 mt-6 md:mt-12">
          {/* Image - full width on mobile, half on md+ */}
          <div className="relative h-64 w-full md:h-80"> 
            <Image
              src={urlFor(umkm.thumbnail).width(800).height(600).url()}
              alt={umkm.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              priority
            />
          </div>
          
          {/* Content - optimized for mobile */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex flex-wrap gap-2">
              {umkm.categories?.map((cat: any) => (
                <span 
                  key={cat._id || cat.title}
                  className="text-base md:text-[18px] font-medium  rounded-full"
                >
                  {cat.title}
                </span>
              ))}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold">{umkm.title}</h1>
            
            <div className="space-y-2">
              <h2 className="text-[15px] md:text-[16px] font-semibold">Produk</h2>
              <ul className="flex flex-wrap gap-2">
                {umkm.products?.map((product: string, i: number) => (
                  <li key={i} className="bg-gray-100 px-3 py-1 text-sm rounded-md font-medium">
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
                className="inline-flex items-center text-blue-600 hover:underline mt-2 text-[15px] md:text-[16px]"
              >
                Lihat Lokasi ↗
              </a>
            )}
          </div>
        </div>

        {/* Long description with better mobile spacing */}
        {umkm.longDescription && (
          <div className="prose max-w-none font-medium text-[15px] md:text-[16px] leading-7 md:leading-8 space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Tentang UMKM</h2>
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