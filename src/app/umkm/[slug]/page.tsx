// app/umkm/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { umkmBySlugQuery } from '@/sanity/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../../../lib/sanity'

export default async function UmkmDetailPage({ params }: { params: { slug: string } }) {
  const umkm = await client.fetch(umkmBySlugQuery, { slug: params.slug })

  if (!umkm) return <div>UMKM not found</div>

  return (
    <div className="container mx-auto py-12 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-64 md:h-full">
          <Image
            src={urlFor(umkm.thumbnail).width(800).height(600).url()}
            alt={umkm.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{umkm.title}</h1>
          <p className="text-gray-600 mb-6">{umkm.description}</p>
          
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

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Categories</h2>
            <div className="flex flex-wrap gap-2">
            {umkm.categories?.map((cat: any) => (
                <span 
                key={cat._id || cat.title} // Fallback to title if _id is missing
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                {cat.title}
                </span>
            ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {umkm.products?.map((product: string, i: number) => (
            <li key={i} className="border p-4 rounded-lg hover:bg-gray-50">
              {product}
            </li>
          ))}
        </ul>
      </div>

      {umkm.longDescription && (
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <PortableText value={umkm.longDescription} />
        </div>
      )}
    </div>
  )
}

// Generate static paths
export async function generateStaticParams() {
  const umkms = await client.fetch(`*[_type == "umkm"] { "slug": _id }`)
  return umkms.map((umkm: any) => ({ slug: umkm.slug }))
}