import { Comfortaa } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";
import CreateRequest from "@/components/CreateRequest";
import state_district_city_pin from "@/lib/state_district_city_pin.json";
import { getSession } from "./actions/auth";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata = {
  title: "Be-The-Donor",
  description: "A network of blood donors in India",
};

export default async function RootLayout({ children }) {
  const cookie = await getSession();
  return (
    <html lang="en">
      <body className={comfortaa.className}>
        <div className="flex flex-col relative">
          {cookie ? <CreateRequest data={state_district_city_pin} /> : <></>}
          <div className="flex flex-col h-screen overflow-auto justify-between bg-[#161618]">
            <div className="relative flex flex-col">
              <Navbar cookie={cookie} />
              {children}
            </div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}