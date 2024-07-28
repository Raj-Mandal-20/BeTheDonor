import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";
import Request from "@/components/Request";
import { getHost } from './actions';
import data from "../data.json";
import { cookies } from "next/headers";

// const inter = Inter({ subsets: ["latin"] });
const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata = {
  title: "Be-The-Donor",
  description: "A network of blood donors in India",
};

export default async function RootLayout({ children }) {
  let host = await getHost();
  const cookie = cookies().has('usertoken');
  return (
    <html lang="en">
      <body className={comfortaa.className}>
        <div className="flex flex-col min-h-screen bg-[#161618]">
          <Request HOST={host} data={data} />
          <Navbar cookie={cookie} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
