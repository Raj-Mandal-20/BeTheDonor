import Image from "next/image";
import home from "../../public/home.png";

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen">
      <div className="flex items-center h-[90vh]">
        <div className="flex flex-col px-24">
          <p className="text-6xl font-bold text-white">
            Be the <span className="text-red-600"> Donor</span>
            <br />
            Save a <span className="text-[#2fdde6]">Life</span>
          </p>
          <p className="mt-6 text-gray-400">
            Be-The-Donor is a platform that connects those in need of blood with willing donors, helping to save lives.
          </p>
        </div>
        <Image src={home} alt="" className="p-32" priority/>
      </div>
    </section>
  );
}
