import "~/styles/globals.css";

import { type Metadata } from "next";
import { Toaster as SonnerToaster} from 'sonner'
import { Toaster} from "~/components/ui/toaster"
import Providers from "./providers";
import NextTopLoader from 'nextjs-toploader';
import { Lexend } from 'next/font/google';
import Navbar from "~/components/Navbar";


export const metadata: Metadata = {
  title: "Quizmify",
  description: "Quiz yourself on anything!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '700'], 
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={lexend.className} suppressHydrationWarning={true}>
        <Providers>
         <SonnerToaster position="top-center" richColors theme="dark"/>
         <Toaster />
         <NextTopLoader height={4} color="#38bdf8" showSpinner={false} easing="ease"/>
         <Navbar />
         {children}
         </Providers>
      </body>
    </html>
  );
}
