import Image from "next/image"

export default function Tentang() {
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10">
            {/* Text section - appears first on all screens */}
            <div className="lg:col-span-1 space-y-4 order-1 lg:order-3">
                <div className="text-[28px] md:text-[40px] font-semibold">
                    Tentang Kami!
                </div>
                <div className="text-[16px] lg:text-[18px] font-medium leading-8">
                    Jetis Lor adalah sebuah desa yang terletak di wilayah Kabupaten Pacitan, Jawa Timur. Dikenal dengan industri kopinya dan masyarakat yang ramah, Jetis Lor menjadi tempat yang kaya akan kearifan lokal, tradisi budaya, dan potensi sumber daya alam maupun manusia.
                </div>
            </div>
            
            {/* Images container - appears below text on mobile/tablet */}
            <div className="order-2 lg:contents">
                {/* First image (top right on desktop) */}
                <div className="w-full h-[190px] rounded-xl overflow-hidden lg:place-self-start mb-4 lg:mb-0">
                    <Image 
                        src="/Field.png"
                        height={200}
                        width={200}
                        alt="Ladang di Jetis Lor"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Second image (top left on desktop) */}
                <div className="w-full h-[190px] rounded-xl overflow-hidden lg:place-self-end lg:mr-4 hidden lg:block">
                    <Image 
                        src="/CherryTree.png"
                        height={200}
                        width={200}
                        alt="Pohon Ceri di Jetis Lor"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}