'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../../../components/ui/dialog"
import { ArrowRight, Menu, X } from "lucide-react"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Button } from "../../../components/ui/button"
import emailjs from "emailjs-com"

export default function NavBar() {
  const [subject, setSubject] = useState("")
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isMdScreen, setIsMdScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    <div className="flex justify-between items-center mt-8 px-4 lg:px-0">
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

      {/* Large Screen Navigation (lg and up) */}
      <div className="hidden lg:flex items-center space-x-8">
        <div className="flex justify-between text-black gap-12 font-jakarta font-[600] rounded-full border border-[#CACACA] p-3 px-8">
          <Link href="/">Beranda</Link>
          <Link href="/umkm">UMKM</Link>
          <Link href="/artikel">Artikel</Link>
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

      {/* Medium and Small Screen Hamburger Button (md and below) */}
      <button 
        className="lg:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu (for md and below) */}
      <div className={`fixed top-0 right-0 h-full w-3/4 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col space-y-6 flex-grow">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-semibold">Beranda</Link>
            <Link href="/umkm" onClick={() => setIsOpen(false)} className="text-lg font-semibold">UMKM</Link>
            <Link href="/artikel" onClick={() => setIsOpen(false)} className="text-lg font-semibold">Artikel</Link>
            <Link href="/tentang" onClick={() => setIsOpen(false)} className="text-lg font-semibold">Tentang</Link>
            
            <div className="mt-auto mb-8">
              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    className="flex items-center gap-2 text-white bg-black font-jakarta font-[600] rounded-full p-3 px-8 w-full justify-center"
                    onClick={() => setIsOpen(false)}
                  >
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
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}