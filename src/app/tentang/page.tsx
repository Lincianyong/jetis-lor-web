'use client'

import Footer from "../components/NavigationAndFooter/Footer";
import NavBar from "../components/NavigationAndFooter/NavigationBar";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Tentang () {
  const imageUrls = [
    "/CoupleField.png",
    "/Dance.png",
    "/Field.png",
  ];

  return (
    <div>
      <div className="xl:container xl:mx-auto mx-6 md:mx-16 lg:mx-20 min-h-screen">
        <NavBar />

        {/* Main Content Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mt-20 mb-20">
          {/* Text Container */}
          <div className="h-[400px] overflow-y-auto pr-2 flex-1 items-center h-full">
            <div className="font-semibold text-[40px]">Kenali Kami Lebih Dalam!</div>
            <div className="text-[16px] font-medium mt-4 leading-7">
              Jetis Lor adalah sebuah desa yang terletak di Kecamatan Nawangan, Kabupaten Pacitan, Jawa Timur. Dikelilingi oleh perbukitan hijau dan udara sejuk pegunungan, desa ini menyimpan kekayaan alam serta budaya yang masih terjaga hingga kini. Kehidupan masyarakatnya yang sederhana, ramah, dan menjunjung tinggi gotong royong menciptakan suasana hangat bagi siapa saja yang berkunjung.
              <br /><br />
              Sebagian besar penduduk Jetis Lor menggantungkan hidup dari pertanian, peternakan, serta usaha-usaha kecil seperti kuliner tradisional, kerajinan tangan, dan jasa. Selain itu, desa ini juga dikenal dengan semangat warganya dalam melestarikan budaya lokal melalui kegiatan seni dan adat.
            </div>
          </div>

          {/* Swiper Image Carousel */}
          <div className="w-[320px] flex flex-col items-center">
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                className="h-full w-full"
              >
                {imageUrls.map((src, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-[400px]">
                      <Image
                        src={src}
                        alt={`Jetis Lor ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
