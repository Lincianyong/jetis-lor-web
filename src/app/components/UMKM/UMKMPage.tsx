'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { umkmsQuery } from '../../../sanity/lib/sanity.queries'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../../../../lib/sanity'
import NavBar from '../NavigationAndFooter/NavigationBar'
import Footer from '../NavigationAndFooter/Footer'
import { Search } from 'lucide-react'

export default function UmkmPage() {
  const [umkms, setUmkms] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUmkms, setFilteredUmkms] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(umkmsQuery)
      setUmkms(data)
      setFilteredUmkms(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const filtered = umkms.filter((umkm) =>
      umkm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      umkm.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUmkms(filtered)
  }, [searchTerm, umkms])

  return (
    <div>
      <div className="xl:container xl:mx-auto mx-6 md:mx-16 lg:mx-20">
        <NavBar />

        <div className='mt-16'>
          <div className='font-semibold text-[28px] lg:text-[40px] text-center'>UMKM</div>
          <div className='font-medium text-[16px] lg:text-[20px] text-center'>Daftar Usaha Mikro, Kecil, dan Menengah Desa Jetis Lor</div>

          <div className='flex justify-center mt-6'>
            <div className='h-[40px] w-[400px] lg:h-[50px] lg:w-[560px] border rounded-full flex items-center pl-4'>
              <Search />
              <input
                type="text"
                placeholder="Cari UMKM atau produk..."
                className="pl-4 text-[16px] lg:text-[18px] text-[#5A5A5A] outline-none w-full bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-8 mt-18">
          {filteredUmkms.map((umkm) => (
          <article key={umkm._id} className="border border-l-0 border-r-0 border-[#CACACA] py-6 overflow-hidden transition-shadow">
            <Link href={`/umkm/${umkm.slug}`}>
              {/* Change flex direction based on screen size */}
              <div className='flex flex-col lg:flex-row items-center lg:items-start gap-4'>
                {/* Image Section */}
                <div className="h-[160px] w-full lg:h-[180px] lg:w-[260px] relative flex-shrink-0">
                  <Image
                    src={urlFor(umkm.thumbnail).width(600).height(400).url()}
                    alt={umkm.title}
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 1024px) 100vw, 260px"
                  />
                </div>

                {/* Text Section */}
                <div className="lg:p-4 w-full">
                  <div className="text-[12px] lg:text-[16px] text-black font-medium">
                    {umkm.categories?.map((cat: any) => cat.title).join(', ')}
                  </div>
                  <h2 className="text-[20px] lg:text-[24px] font-semibold mb-2">{umkm.title}</h2>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {umkm.products?.map((product: string, i: number) => (
                      <span key={i} className="bg-gray-100 px-2 py-1 text-sm rounded font-medium text-[12px] lg:text-[14px]">
                        {product}
                      </span>
                    ))}
                  </div>
                  <p className="mb-3 line-clamp-2 font-medium text-black mt-4 text-[14px] lg:text-[16px]">
                    {umkm.description}
                  </p>
                </div>
              </div>
            </Link>
          </article>
          ))}
        </div>
      </div>

      <div className='mt-40'>
        <Footer />
      </div>
    </div>
  )
}