"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import myRequests from '../../public/MR.png';
import myAcceptedRequests from '../../public/MAR.png';
import allRequests from '../../public/AR.png';
import Chart from '@/components/Chart';

export default function Home() {
  return (
    <section className="flex flex-col items-center min-h-screen w-full">
      <div className="flex justify-center p-12 w-full">
        <div className="flex flex-col p-12 nano:p-4 gap-8 items-center text-center w-1/2 mini:w-3/4 micro:w-4/5 nano:w-full">
          <p className="text-5xl micro:text-4xl nano:text-xl font-bold text-white">
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

      {/* Mission & Vision */}

      <div className='flex micro:flex-col items-center justify-center gap-12 mini:gap-8 w-full p-12 micro:p-8'>
        <div className='flex flex-col items-center justify-center gap-8 p-12 mini:p-8 w-[500px] nano:w-full h-[350px] micro:h-fit bg-[#1c1c1f] shadow-lg shadow-black rounded-2xl'>
          <p className='text-2xl mini:text-xl nano:text-lg text-red-500'>Our Misson</p>
          <p className='text-base mini:text-sm nano:text-xs text-white'>Our mission is to create a seamless and efficient platform that bridges the gap between individuals in urgent need of blood and active donors, fostering a culture of giving and saving lives through timely and accessible blood donations across India.</p>
        </div>
        <div className='flex flex-col items-center justify-center gap-8 p-12  mini:p-8 mini:text-xl w-[500px] nano:w-full h-[350px] micro:h-fit bg-[#1c1c1f] shadow-lg shadow-black rounded-2xl'>
          <p className='text-2xl mini:text-xl nano:text-lg text-red-500'>Our Vision</p>
          <p className='text-base mini:text-sm nano:text-xs text-white'>We envision a future where every blood donation need is met promptly through a connected community of donors and recipients, making life-saving contributions easily accessible and empowering individuals to make a difference in the lives of others.</p>
        </div>
      </div>

      {/* Data */}

      <div className='flex w-full p-12 mini:p-8 items-center justify-center gap-12 nano:p-4 mini:gap-8 mini:flex-col-reverse'>
        <div className='flex flex-col gap-8 nano:gap-4 p-12 mini:p-8 nano:p-4 small:p-8'>
          <div className='flex justify-between pico:flex-col pico:w-[250px] items-center gap-8 nano:gap-4'>
            <div className='flex flex-col items-center bg-[#1c1c1f] p-12 mini:p-8 nano:p-4 gap-1 w-[250px] micro:w-[200px] nano:w-[150px] rounded-xl shadow-lg shadow-black'>
              <p className='text-lg nano:text-sm text-white mini:text-base'>4</p>
              <p className='text-base mini:text-sm nano:text-xs text-gray-400 '>Registered Donors</p>
            </div>
            <div className='flex flex-col items-center bg-[#1c1c1f] p-12 mini:p-8 nano:p-4 gap-1 w-[250px] micro:w-[200px] nano:w-[150px] rounded-xl shadow-lg shadow-black'>
              <p className='text-lg nano:text-sm text-white mini:text-base'>50</p>
              <p className='text-base mini:text-sm nano:text-xs text-gray-400 '>Total Accepts</p>
            </div>
          </div>
          <div className='flex justify-between pico:flex-col pico:w-[250px] items-center gap-8 nano:gap-4'>
            <div className='flex flex-col items-center bg-[#1c1c1f] p-12 mini:p-8 nano:p-4 gap-1 w-[250px] micro:w-[200px] nano:w-[150px] rounded-xl shadow-lg shadow-black'>
              <p className='text-lg nano:text-sm text-white mini:text-base'>50</p>
              <p className='text-base mini:text-sm nano:text-xs text-gray-400 '>Total Requests</p>
            </div>
            <div className='flex flex-col items-center bg-[#1c1c1f] p-12 mini:p-8 nano:p-4 gap-1 w-[250px] micro:w-[200px] nano:w-[150px] rounded-xl shadow-lg shadow-black '>
              <p className='text-lg nano:text-sm text-white mini:text-base'>35</p>
              <p className='text-base mini:text-sm nano:text-xs text-gray-400 '>Average Age</p>
            </div>
          </div>
        </div>
        <Chart />
      </div>


      {/* User Guide */}

      <div className='flex flex-col items-center p-12 gap-8'>
        <p className='text-3xl nano:text-xl text-white italic py-8 nano:py-4'>How To Use It ?</p>
        <div className='w-full flex justify-between items-center micro:flex-col-reverse micro:gap-4'>
          <div className='flex flex-col gap-4 px-12 mini:px-8 nano:px-4'>
            <li className='text-base mini:text-sm nano:text-xs text-white'>User can create a request by clicking upon the button at the bottom right corner of the window</li>
            <li className='text-base mini:text-sm nano:text-xs text-white'>User can delete his/her created request by clicking upon the delete button</li>
            <li className='text-base mini:text-sm nano:text-xs text-white'>User can close or open his/her created request by clicking upon the lock icon</li>
            <li className='text-base mini:text-sm nano:text-xs text-white'>User can see the accptors of his/her created request by clicking upon the acceptors button</li>
          </div>
          <Image src={myRequests} height={450} width={550} alt="" priority />
        </div>
        <div className='w-full flex justify-between items-center micro:flex-col micro:gap-4'>
          <Image src={allRequests} height={450} width={550} alt="" priority />
          <div className='flex flex-col gap-4 px-12 mini:px-8 nano:px-4'>
            <li className='text-base mini:text-sm nano:text-xs text-white'>User can accept any opened request by clicking upon the accept button</li>
            <li className='text-base mini:text-sm nano:text-xs text-white'>User can filter out requests on donation center location, blood group and request status</li>
          </div>
        </div>
        <div className='w-full flex justify-between items-center micro:flex-col-reverse micro:gap-4'>
          <div className='flex flex-col gap-4 px-12 mini:px-8 nano:px-4'>
            <li className='text-base mini:text-sm nano:text-xs text-white'>User can withdraw their acceptance from any request by clicking upon the withdraw button</li>
            <li className='text-base mini:text-sm nano:text-xs text-white'>User can make themselves unavailable to hide their identity</li>
          </div>
          <Image src={myAcceptedRequests} height={450} width={550} alt="" priority />
        </div>
      </div>
    </section>
  );
}