'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "../../../components/ui/drawer"
import { ArrowRight } from "lucide-react"

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex justify-between items-center mt-8">
      {/* Logo */}
      <div className="w-[160px]">
        <Image
          src="/JetisLor.png"
          height={200}
          width={200}
          alt="jetis lor"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center space-x-8">
        <div className="flex justify-between text-black gap-12 font-jakarta font-[600] rounded-full border border-[#CACACA] p-3 px-8">
          <Link href="/">Beranda</Link>
          <Link href="/umkm">UMKM</Link>
          <Link href="/blog">Artikel</Link>
          <Link href="/tentang">Tentang</Link>
        </div>

        {/* Partnership Button */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <button className="flex items-center gap-2 text-white bg-black font-jakarta font-[600] rounded-full p-3 px-8">
              Kontak Kami
              <ArrowRight size={18} />
            </button>
          </DrawerTrigger>
          <DrawerContent className="p-6">
        <DrawerTitle className="text-lg font-semibold mb-4">
            Informasi Kerja Sama
        </DrawerTitle>
        <p className="text-sm text-gray-700">
            Silakan isi formulir atau hubungi tim kami untuk informasi lebih lanjut mengenai kerja sama.
        </p>
        </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
