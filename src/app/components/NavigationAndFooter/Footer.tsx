import { ArrowRight } from "lucide-react";
import Link from "next/link";
import KerjaSamaButton from "../MicroComponent/KerjasamaButton";

export default function Footer () {
    return (
        <div className="w-full bg-black">
            <div className="xl:container xl:mx-auto mx-6 md:mx-16 lg:mx-20">
                <div className="flex items-center justify-between h-[300px]">
                    {/* left */}
                    <div>
                        <div className="text-white text-[40px] font-semibold leading-14">
                            Terimakasih sudah mengunjungi <br/> Website kami!
                        </div>
                        <div className='mt-8'>
                            <KerjaSamaButton />
                        </div>
                    </div>

                    {/* right */}
                    <div>
                        <div className="text-white grid font-semibold text-[18px] space-y-4">
                            <Link href="/">Beranda</Link>
                            <Link href="/umkm">UMKM</Link>
                            <Link href="/blog">Artikel</Link>
                            <Link href="/tentang">Tentang</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}