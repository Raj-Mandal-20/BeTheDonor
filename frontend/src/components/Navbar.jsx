"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket, faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from 'next/navigation';
import { deleteSession } from '@/app/actions/auth';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = (props) => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(props.cookie);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  const logout = async () => {
    setProgress(10);
    setIsLoggingOut(true);
    const response = await deleteSession();
    setProgress(75);
    if (response.statusCode === 200) {
      toast.success(response.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setProgress(100);
      setIsLoggingOut(false);
    } else {
      toast.error(response.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setProgress(100);
      setIsLoggingOut(false);
    }
  }

  useEffect(() => {
    setIsLoggedIn(props.cookie);
  }, [props.cookie]);

  return (
    <>
      <LoadingBar
        color='#b9003a'
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className='flex items-center justify-evenly sticky w-full top-0 z-30 bg-[#161618] border-b-gray-800 border-b'>
        <div className="gap-1 flex items-center justify-center ">
          <div className="flex items-center space-x-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
              <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
            </svg>
            <span className="text-2xl text-red-500 italic font-semibold">Be-The-Donor</span>
          </div>
        </div>
        <div className='flex gap-8 items-center h-full'>
          <Link href={"/"} className={`${pathname === '/' ? 'border-b-2 text-red-500 border-red-600' : 'text-white'} py-6 h-full content-center hover:text-red-500`}>Home</Link>
          <Link href={"/allrequests"} className={`${pathname === '/allrequests' ? 'border-b-2 text-red-500 border-red-600' : 'text-white'} py-6 hover:text-red-500 h-full content-center`}>Requests</Link>
          <Link href={"/donors"} className={`${pathname === '/donors' ? 'border-b-2 text-red-500 border-red-600' : 'text-white'} py-6 hover:text-red-500 h-full content-center`}>Donors</Link>
          <Link href={"/camps"} className={`${pathname === '/camps' ? 'border-b-2 text-red-500 border-red-600' : 'text-white'} py-6 hover:text-red-500 h-full content-center`}>Camps</Link>
        </div>
        {isLoggedIn ?
          <div className='flex gap-3'>
            <Link title='Dashboard' href={"/myprofile/dashboard"} className='text-[#2fdde6] border-solid border-[#2fdde6] rounded-lg border-2 px-3 py-2 hover:bg-[#2fdde6] hover:text-blue-950'>
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <button disabled={isLoggingOut} title='Logout' onClick={logout} className={`border-solid rounded-lg border-2 px-3 py-2 ${isLoggingOut ? 'text-gray-400 border-gray-400 hover:cursor-wait' : 'text-red-600 border-red-600 hover:bg-red-600 hover:text-white'}`}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div> :
          <div className='flex gap-3'>
            <Link title='Login' href={"/login"} className='text-[#2fdde6] border-solid border-[#2fdde6] rounded-lg border-2 px-3 py-2 hover:bg-[#2fdde6] hover:text-blue-950'>
              <FontAwesomeIcon icon={faRightToBracket} />
            </Link>
            <Link title='Register' href={"/register"} className='text-red-600 border-solid border-red-600 rounded-lg border-2 px-3 py-2 hover:bg-red-600 hover:text-white'>
              <FontAwesomeIcon icon={faUserPlus} />
            </Link>
          </div>
        }
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="dark"
      />
    </>
  )
}

export default Navbar;
