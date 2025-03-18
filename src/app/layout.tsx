import "~/styles/globals.css";

import { type Metadata } from "next";
import { Toaster} from "~/components/ui/toaster"
import Providers from "./providers";
import NextTopLoader from 'nextjs-toploader';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import Navbar from "~/components/Navbar";
import BackGround from "~/components/BackGround";

export const metadata: Metadata = {
  title: "Quizmify",
  description: "Quiz yourself on anything!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['500','800']
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${grotesk.className} font-semibold`} suppressHydrationWarning={true}>
        <Providers>
         <Toaster />
         <BackGround />
         <NextTopLoader height={4} color="#38bdf8" showSpinner={false} easing="ease"/>
         <Navbar />
          {children}
         </Providers>
      </body>
    </html>
  );
}
