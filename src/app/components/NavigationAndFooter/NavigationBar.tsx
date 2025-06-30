'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../../../components/ui/dialog"
import { ArrowRight } from "lucide-react"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Button } from "../../../components/ui/button"
import emailjs from "emailjs-com"

export default function NavBar() {
  const [subject, setSubject] = useState("")
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  const handleSend = () => {
    const serviceID = 'service_iveuiim'
    const templateID = 'template_8p96919'
    const publicKey = '-rF-mT0ziKbLQrNAI'

    const templateParams = {
      subject,
      name,
      content,
    }

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        alert("Pesan berhasil dikirim!")
        setSubject("")
        setName("")
        setContent("")
      })
      .catch((error) => {
        console.error("EmailJS Error:", error)
        alert("Gagal mengirim pesan. Silakan coba lagi.")
      })
  }

  return (
    <div className="flex justify-between items-center mt-8">
      {/* Logo */}
      <div className="w-[160px]">
        <Link href="/">
          <Image
            src="/JetisLor.png"
            height={200}
            width={200}
            alt="jetis lor"
          />
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex items-center space-x-8">
        <div className="flex justify-between text-black gap-12 font-jakarta font-[600] rounded-full border border-[#CACACA] p-3 px-8">
          <Link href="/">Beranda</Link>
          <Link href="/umkm">UMKM</Link>
          <Link href="/blog">Artikel</Link>
          <Link href="/tentang">Tentang</Link>
        </div>

        {/* Dialog Contact Form */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 text-white bg-black font-jakarta font-[600] rounded-full p-3 px-8">
              Kontak Kami
              <ArrowRight size={18} />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md w-full">
            <DialogTitle className="text-[40px] font-semibold mb-4">
              Kirim Pesan Sekarang!
            </DialogTitle>
            <div className="flex flex-col gap-4">
              <div>
                <div className="font-medium text-[16px] mb-2">Subjek</div>
                <Input
                  placeholder="Contoh: Pengajuan Kerjasama Antar Kabupaten"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div>
                <div className="font-medium text-[16px] mb-2">Nama</div>
                <Input
                  placeholder="Contoh: Huda Tullah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <div className="font-medium text-[16px] mb-2">Pesan</div>
                <Textarea
                  placeholder="Isi pesan..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="h-32"
                />
              </div>
              <Button onClick={handleSend} className="bg-black text-white mt-4 text-[16px] font-semibold py-6">
                Kirim Pesan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
