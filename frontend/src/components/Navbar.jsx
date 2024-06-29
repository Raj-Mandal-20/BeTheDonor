
import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faGear
} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
// import Hamburger from './Hamburger';

const getUser = async () => {
  // const response = await fetch(`${process.env.HOST}/api/auth/user/get`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "usertoken": cookies().get("usertoken").value
  //   }
  // }, { next: { revalidate: 1 } })
  // const data = await response.json()
  // return data
}

const Navbar = async () => {
  let data;
  if (cookies().has("usertoken")) {
    // data = await getUser()
  }
  return (
    <div className='flex items-center justify-evenly p-5 bg-[#051a39]'>
      {/* <Hamburger /> */}
      <div className='flex gap-1 items-center'>
        {/* <Image src={'/icon.png'} height={25} width={25} alt=''></Image> */}
        <p className='text-red-500 font-bold italic text-xl'>Be-The-Donor</p>
      </div>
      <div className='flex gap-3 items-center small:hidden'>
        <Link href={"/"} className='text-white'>Home</Link>
        <Link href={"/myrequests"} className='text-white'>My Requests</Link>
        <Link href={"/allrequests"} className='text-white'>All Requets</Link>
      </div>
      {(cookies().has('usertoken')) ? 
      <Link href={"/logout"}><FontAwesomeIcon icon={faArrowRightFromBracket} size='lg' className='text-blue-500' />logout</Link> : 
      <div className='flex gap-3'>
        <Link href={"/login"} className='text-white border-solid border-red-500 rounded-lg border-2 px-3 py-2 bg-red-500'>login</Link>
        <Link href={"/register"} className='text-[#2fdde6] border-solid border-[#2fdde6] red-500 rounded-lg border-2 px-3 py-2'>Register</Link>
        </div>
      }

      {/* // </div> : <div className='flex gap-3'>}
        {/* // <div className='flex gap-3 items-center'> */}
        {/* //   <Link href={"/user/dashboard/profile"} className='flex gap-2 items-center'> */}
        {/* //     <p className='mini:hidden'>Hi! {data.name.split(" ")[0]}</p> */}
        {/* <Image src={data.image} alt="" height={25} width={25} className='rounded-full ring-2 ring-blue-500 w-[25px] h-[25px]' /> */}
        {/* //     </Link> */}
        {/* //   <Link href={"/logout"}><FontAwesomeIcon icon={faArrowRightFromBracket} size='lg' className='text-blue-500' /></Link> */}
        {/* // </div> : <div className='flex gap-3'> */}
        {/* //   <Link href={"/login"} className='text-white border-solid border-red-500 rounded-lg border-2 px-3 py-2 bg-red-500'>login</Link> */}
        {/* //   <Link href={"/register"} className='text-[#2fdde6] border-solid border-[#2fdde6] red-500 rounded-lg border-2 px-3 py-2'>Register</Link> */}
        {/* // </div> */}
      {/* } */}
    </div>
  )
}

export default Navbar;
