"use client"
import Link from 'next/link'
import React from 'react'
import { destroyCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Logout = () => {
    const { refresh } = useRouter();
    const logout = async () => {
        destroyCookie(null, "usertoken");
        destroyCookie(null, "userId");
        refresh();
    }
    const cookies = parseCookies();
    if (cookies["usertoken"] || cookies["userId"]) {
        logout();
    }
    return (
        <div className='w-full bg-[#051a39] min-h-screen flex p-10 justify-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-3xl text-red-400 p-5'>Logged Out Successfully</h1>
                <Image src="/success.gif" width={300} height={300} alt="BYE! SEE YOU SOON" />
                <h1 className='text-xl text-blue-200 p-5'>Visit Us Again</h1>
                <div className='flex gap-2 text-lg text-white'>
                    <span className=''>Go Back to</span>
                    <Link href={"/"} className='underline'>Home Page</Link>
                </div>
            </div>
        </div>
    )
}

export default Logout;