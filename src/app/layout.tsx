import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ChatbotPage from "./chatbot/page";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Website Desa Jetis Lor",
  description:
    "Situs resmi Desa Jetis Lor. Temukan info layanan desa, berita terbaru, agenda, dan potensi lokal di sini.",
  keywords: [
    "Desa Jetis Lor",
    "Pemerintahan Desa",
    "UMKM Jetis Lor",
    "Berita Desa",
    "Layanan Desa",
  ],
  authors: [{ name: "Pemerintah Desa Jetis Lor", url: "https://jetislor.com" }],
  generator: "Next.js",
  applicationName: "Website Desa Jetis Lor",
  metadataBase: new URL("https://jetislor.com"),
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Website Desa Jetis Lor",
    description:
      "Temukan informasi lengkap tentang Desa Jetis Lor, termasuk layanan publik, berita terkini, dan potensi desa.",
    url: "https://jetislor.com",
    siteName: "Website Desa Jetis Lor",
    images: [
      {
        url: "/og-image.png", // Make sure this file exists in your /public folder
        width: 1200,
        height: 630,
        alt: "Website Desa Jetis Lor",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Desa Jetis Lor",
    description:
      "Temukan informasi lengkap tentang Desa Jetis Lor, termasuk layanan publik, berita terkini, dan potensi desa.",
    images: ["/icon.png"],
    creator: "@DesaJetisLor", // optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable}`}>
      <body className="font-sans antialiased !bg-white !font-jakarta">
        <ChatbotPage />
        {children}
      </body>
    </html>
  );
}
