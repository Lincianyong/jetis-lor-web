'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Button } from "../../../components/ui/button"
import emailjs from "emailjs-com"

export default function KerjaSamaButton() {
  const [subject, setSubject] = useState("")
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  const handleSend = () => {
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

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
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          {/* Large version (lg and up) */}
          <div className='hidden lg:block'>
            <div className='font-semibold text-[18px] mt-10 border bg-white border-[#CACACA] w-fit rounded-full flex items-center gap-2 text-black font-jakarta p-3 px-8 pr-11'>
              Kontak Kami
            </div>
            <div className="border border-[#CACACA] rounded-full h-[54px] w-[54px] bg-white absolute -mt-13 ml-40 flex items-center justify-center transition duration-300 hover:translate-x-[8px]">
              <ArrowRight size={24} />
            </div>
          </div>
          
          {/* Small version (sm and md) */}
          <div className='lg:hidden'>
            <div className='font-semibold text-[14px] mt-10 border bg-white border-[#CACACA] w-fit rounded-full flex items-center gap-2 text-black font-jakarta p-2 px-5 pr-9'>
              Kontak Kami
            </div>
            <div className="border border-[#CACACA] rounded-full h-[40px] w-[40px] bg-white absolute -mt-[39px] ml-32 flex items-center justify-center transition duration-300 hover:translate-x-[6px]">
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
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
  )
}