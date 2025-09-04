import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://RedHatBrew.com/"),
  title: "Black Hat Brew | Secure Beyond Assumptions",
  description:
    "YUnmatched offensive security and risk management to protect your environment.",
  openGraph: {
    title: "Black Hat Brew | Secure Beyond Assumptions",
    description:
      "Unmatched offensive security and risk management to protect your environment.",
    type: "website",
    locale: "en_US",
    url: "https://RedHatBrew.com/",
    siteName: "Black Hat Brew",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Black Hat Brew",
              "url": "https://RedHatBrew.com/",
            }),
          }}
        />


        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-J9628P2K61`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J9628P2K61', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={` bg-[#1A1A1A] ${inter.className}`}>
        <Providers>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
          {/* <ScrollToTop /> */}
        </Providers>
      </body>
    </html>
  );
}

