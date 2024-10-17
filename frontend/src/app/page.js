"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen nano:min-h-fit w-full">
      <div className="flex justify-center p-16 w-full">
        <div className="flex flex-col p-12 nano:p-4 gap-8 items-center text-center w-1/2 mini:w-3/4 micro:w-4/5 nano:w-full">
          <p className="text-6xl micro:text-4xl nano:text-xl font-bold text-white">
            Be the <span className="text-red-600"> Donor</span>
            <br />
            Save a <span className="text-[#2fdde6]">Life</span>
          </p>
          <p className="text-gray-400 nano:text-xs">
            Be-The-Donor is a platform that connects those in need of blood with willing donors, helping to save lives.
          </p>
          <a href='/app-version-13.9.2024.apk' download={true}>
            <button className='flex gap-2 text-red-600 border-solid border-red-600 rounded-lg border-2 px-4 py-2 hover:bg-red-600 hover:text-white nano:text-xs'>
              <p>Downlod the app</p>
              <div>
                <FontAwesomeIcon icon={faDownload} />
              </div>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}