// app/umkm/page.tsx
import { client } from '@/sanity/lib/client'
import { umkmsQuery } from '../../sanity/lib/sanity.queries'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../../../lib/sanity'

export default async function UmkmPage() {
  const umkms = await client.fetch(umkmsQuery)

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Local UMKM</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {umkms.map((umkm: any) => (
          <article key={umkm._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/umkm/${umkm.slug}`}>
              <div className="relative h-48">
                <Image
                  src={urlFor(umkm.thumbnail).width(600).height(400).url()}
                  alt={umkm.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{umkm.title}</h2>
                <p className="text-gray-600 mb-3 line-clamp-2">{umkm.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {umkm.products?.map((product: string, i: number) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 text-sm rounded">
                      {product}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  {umkm.categories?.map((cat: any) => cat.title).join(', ')}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}