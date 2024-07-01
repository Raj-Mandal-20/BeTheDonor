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
        <div className='w-full h-screen flex p-10 justify-center overflow-auto'>
            <div className='flex flex-col items-center'>
                <h1 className='text-2xl text-green-600 p-5 text-center'>Logged Out Successfully</h1>
                <Image src="/success.gif" width={200} height={200} alt="" className='w-[200px] h-[200px]' />
                <h1 className='text-xl text-blue-500 p-5 text-center'>Visit Us Again</h1>
                <Link href={"/"} className='underline text-lg text-center'>Go Back to Home Page</Link>
            </div>
        </div>
    )
}

export default Logout;