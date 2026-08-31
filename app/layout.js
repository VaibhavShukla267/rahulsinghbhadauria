import { Noto_Serif_Devanagari, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import TopStrip from "@/components/TopStrip";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { TranslationProvider } from '@/contexts/TranslationContext';
import siteConfig from "@/config/siteConfig";

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-serif-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "700"],
});

const tiroDevanagariHindi = Tiro_Devanagari_Hindi({
  variable: "--font-tiro-devanagari-hindi",
  subsets: ["devanagari"],
  weight: "400",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rahulsinghbhadauria.com'),
  title: {
    default: siteConfig.organizationNameHi,
    template: `%s | ${siteConfig.organizationNameHi}`
  },
  description: "राहुल सिंह भदौरिया का आधिकारिक वेब पोर्टल। ऑनलाइन सदस्यता, जनसमस्या निवारण एवं जनसेवा गतिविधियां।",
  keywords: ["Rahul Singh Bhadauria", "राहुल सिंह भदौरिया", "Lucknow", "Kanpur", "Kalyanpur"],
  authors: [{ name: siteConfig.founderNameEn }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteConfig.organizationNameHi,
    description: "राहुल सिंह भदौरिया का आधिकारिक वेब पोर्टल",
    url: "https://rahulsinghbhadauria.com",
    siteName: siteConfig.organizationNameEn,
    images: [
      {
        url: "/Hero%20image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.organizationNameEn,
      },
    ],
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.organizationNameEn,
    description: "Official web portal of Rahul Singh Bhadauria",
    images: ["/Hero%20image.png"],
  },
};


export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.founderNameEn,
    "alternateName": siteConfig.founderNameHi,
    "url": "https://rahulsinghbhadauria.com",
    "image": "https://rahulsinghbhadauria.com/png.png",
    "jobTitle": "Leader & Social Worker",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lucknow",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    "sameAs": [
      siteConfig.socialLinks.facebook,
      siteConfig.socialLinks.twitter,
      siteConfig.socialLinks.instagram,
    ]
  };

  return (
    <html lang="hi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning
        className={`${notoSerifDevanagari.variable} ${tiroDevanagariHindi.variable} ${notoSerifDevanagari.className} antialiased`}
      >
        <TranslationProvider>
          <TopStrip />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />        
          <Toaster position="top-center" richColors />
        </TranslationProvider>
      </body>
    </html>
  );
}


