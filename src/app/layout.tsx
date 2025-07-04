import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Configure the Plus Jakarta Sans font
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"], // Include all weights you need
});

export const metadata: Metadata = {
  title: "Website Desa Jetis Lor",
  description: "Situs resmi Desa Jetis Lor. Temukan info layanan desa, berita terbaru, agenda, dan potensi lokal di sini.",
    icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable}`}>
      <body className="font-sans antialiased !bg-white !font-jakarta">
        {children}
      </body>
    </html>
  );
}