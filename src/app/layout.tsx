import "~/styles/globals.css";

import { type Metadata } from "next";
import { Toaster} from 'sonner'
import Providers from "./providers";
import NextTopLoader from 'nextjs-toploader';
import { Lexend } from 'next/font/google';
import Navbar from "~/components/Navbar";


export const metadata: Metadata = {
  title: "Quizmify",
  description: "Generated by create-t3-app",
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
    <html lang="en">
      <body className={lexend.className}>
        <Providers>
         <Toaster position="top-center" richColors/>
         <NextTopLoader height={4} color="#AAFF00" showSpinner={false}/>
         <Navbar />
         {children}
         </Providers>
      </body>
    </html>
  );
}
