import Image from "next/image"

export default function Tentang () {
    return (
        <div className="grid grid-cols-3 gap-10">
            <div className="place-self-start w-full h-[190px] rounded-xl overflow-hidden">
            <Image 
                src="/Field.png"
                height={200}
                width={200}
                alt=""
                className="w-full h-full object-cover"
            />
            </div>

            <div className="place-self-end w-full h-[190px] rounded-xl mr-4 overflow-hidden">
            <Image 
                src="/CherryTree.png"
                height={200}
                width={200}
                alt=""
                className="w-full h-full object-cover"
            />
            </div>


            <div className="space-y-4">
                <div className="text-[40px] font-semibold">
                    Tentang Kami!
                </div>
                <div className="text-[18px] font-medium leading-8">
                    Jetis Lor adalah sebuah desa yang terletak di wilayah Kabupaten Pacitan, Jawa Timur. Dikenal dengan industri kopinya dan masyarakat yang ramah, Jetis Lor menjadi tempat yang kaya akan kearifan lokal, tradisi budaya, dan potensi sumber daya alam maupun manusia.
                </div>
            </div>
            
        </div>
    )
}