import Image from 'next/image'
import { TreePalm, Utensils, Coffee } from 'lucide-react'
import KerjaSamaButton from '../MicroComponent/KerjasamaButton'

export default function Landing() {
    return (
      <div className=''>
        
        {/* Icons - Hidden on mobile, shown on lg+ */}
        <div className='lg:flex justify-end gap-4 hidden'>
          <div className='border border-[#CACACA] rounded-full h-[54px] w-[54px] bg-white flex items-center justify-center transition duration-300 hover:translate-y-[-8px]'>
            <TreePalm size={24} />
          </div>
          <div className='border border-[#CACACA] rounded-full h-[54px] w-[54px] bg-white flex items-center justify-center transition duration-300 hover:translate-y-[-8px]'>
            <Utensils size={24} />
          </div>
          <div className='border border-[#CACACA] rounded-full h-[54px] w-[54px] bg-white flex items-center justify-center transition duration-300 hover:translate-y-[-8px]'>
            <Coffee size={24} />
          </div>
        </div>
      
        {/* Mobile layout (image first) */}
        <div className='lg:hidden'>
          <div className="relative h-[40vh] rounded-2xl overflow-hidden mb-8 -mt-10">
            <Image 
              src="/CherryPicking.jpg"
              alt="Desa Jetis Lor"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
          
          <div className=''>
            <div className='font-medium text-[16px] mb-4'>
              Selamat datang di Desa Jetis Lor, dimana kami
            </div>
            <div className='font-semibold text-[28px] leading-9 mb-8'>
              Menjelajah kearifan lokal, dari hati desa kami untuk dunia!
            </div>
            <KerjaSamaButton />
          </div>
        </div>

        {/* Desktop layout (original grid) */}
        <div className='hidden lg:grid grid-cols-2 gap-16 items-center h-full -mt-32'>
          <div className=''>
            <div className='font-medium text-[20px] mb-4'>
              Selamat datang di Desa Jetis Lor, dimana kami
            </div>
            <div className='font-semibold text-[40px] leading-[48px]'>
              Menjelajah kearifan lokal, dari hati desa kami untuk dunia!
            </div>
            <KerjaSamaButton />
          </div>

          <div className="relative h-[80vh] rounded-2xl overflow-hidden">
            <Image 
              src="/CherryPicking.jpg"
              alt="Desa Jetis Lor"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    )
}