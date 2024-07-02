import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#051a39] text-white  flex flex-col justify-between min-h-screen">
      <div className="flex flex-col justify-between text-center  py-14  w-full mx-auto items-center">
        <div className="flex text-center w-ful px-14 items-center justify-center">
          <div className="flex flex-col p-14 w-1/2">

            <h1 className="text-4xl font-bold text-white">
              Be the <span className="text-red-600"> Donor</span> Save a <span className="text-teal-400">life</span>
            </h1>
            <p className="mt-6 text-red-500">
              Be-The-Donor is a platform that connects those in need of blood with willing donors, helping to save lives.
            </p>
          </div>
          <div>
            <Image
              src="/bg.jpeg" // Replace with the path to your image
              alt="Donate Blood Save Lives"
              width={250} // Adjust the width as needed
              height={250} // Adjust the height as needed
              className="mx-auto rounded" // Center the image horizontally
            />

          </div>
        </div>
        <div className="mt-10 text-center flex flex-col items-center justify-center w-2/3">
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="mt-4 text-white">
            At Be-The-Donor, our mission is to connect those in need of blood with willing donors. We strive to make the donation process easy and accessible, while fostering a sense of community and generosity.
          </p>
        </div>
      </div>
    </div>
  );
}
