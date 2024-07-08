import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";
import Request from "@/components/Request";
import { getHost } from './actions';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Be-The-Donor",
  description: "A network of blood donors in India",
};

export default async function RootLayout({ children }) {
  let host = await getHost();
  return (
    <html lang="en">
      <body className={inter.className}>

        <Request HOST={host} />
        <Navbar />
        {children}
        <Footer />

      </body>
    </html>
  );
}
