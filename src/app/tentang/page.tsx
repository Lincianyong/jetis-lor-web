import Footer from "../components/NavigationAndFooter/Footer";
import NavBar from "../components/NavigationAndFooter/NavigationBar";
import Image from "next/image";

export default function Tentang () {
    return (
        <div>
            <div className="xl:container xl:mx-auto mx-6 md:mx-16 lg:mx-20">
                <NavBar />

                {/* Main Content Row */}
                <div className="flex justify-between items-start gap-x-8 mt-20 mb-20">
                    {/* Text Container with scroll and height match */}
                    <div className="h-[400px] overflow-y-auto pr-2 flex-1">
                        <div className="font-semibold text-[40px]">Kenali Kami Lebih Dalam!</div>
                        <div className="text-[16px] font-medium mt-4 leading-7">
                            Jetis Lor adalah sebuah desa yang terletak di Kecamatan Nawangan, Kabupaten Pacitan, Jawa Timur. Dikelilingi oleh perbukitan hijau dan udara sejuk pegunungan, desa ini menyimpan kekayaan alam serta budaya yang masih terjaga hingga kini. Kehidupan masyarakatnya yang sederhana, ramah, dan menjunjung tinggi gotong royong menciptakan suasana hangat bagi siapa saja yang berkunjung.
                            <br /><br />
                            Sebagian besar penduduk Jetis Lor menggantungkan hidup dari pertanian, peternakan, serta usaha-usaha kecil seperti kuliner tradisional, kerajinan tangan, dan jasa. Selain itu, desa ini juga dikenal dengan semangat warganya dalam melestarikan budaya lokal melalui kegiatan seni dan adat.
                        </div>
                    </div>

                    {/* Fixed Image/Box */}
                    <div className="h-[400px] w-[320px] border border-black rounded-lg bg-gray-100 flex items-center justify-center">
                        {/* You can place an image here using <Image /> */}
                        {/* Example: 
                        <Image src="/path/to/image.jpg" alt="Jetis Lor" width={320} height={400} className="object-cover" />
                        */}
                        <span className="text-gray-500 text-sm">Image Placeholder</span>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
