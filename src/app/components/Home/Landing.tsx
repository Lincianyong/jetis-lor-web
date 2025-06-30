import Image from 'next/image'
import {TreePalm} from 'lucide-react'
import {Utensils} from 'lucide-react'
import {Coffee} from 'lucide-react'
import KerjaSamaButton from '../MicroComponent/KerjasamaButton'

export default function Landing() {
    return (
        <div>
            <div className='grid grid-cols-2 gap-16 items-end mt-12'>
        <div className='flex justify-end gap-4'>
          <div className='border border-[#CACACA] rounded-full h-[54px] w-[54px] bg-white flex items-center justify-center transition duration-300 hover:translate-y-[-8px]'><TreePalm size={24} /></div>
          <div className='border border-[#CACACA] rounded-full h-[54px] w-[54px] bg-white flex items-center justify-center transition duration-300 hover:translate-y-[-8px]'><Utensils size={24} /></div>
          <div className='border border-[#CACACA] rounded-full h-[54px] w-[54px] bg-white flex items-center justify-center transition duration-300 hover:translate-y-[-8px]'><Coffee size={24} /></div>
        </div>
      </div>
      
      <div className='grid grid-cols-2 gap-16 items-center h-full -mt-32'>
        <div className=''>
          <div className='font-medium text-[20px] mb-4'>Selamat datang di Desa Jetis Lor, dimana kami</div>
          <div className='font-semibold text-[40px] leading-12'>Menjelajah kearifan lokal, dari hati desa kami untuk dunia!</div>
          <KerjaSamaButton />
        </div>

      <div className="relative h-[80vh] rounded-2xl overflow-hidden">
        <Image 
          src="/CherryPicking.jpg"
          alt="test"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      </div>
        </div>
    )
}