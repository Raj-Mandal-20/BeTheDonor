"use client"
import Link from 'next/link'
import React from 'react'
import { destroyCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import success from '../../public/success.gif';

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
        <div className='w-full flex flex-col min-h-screen p-12  items-center'>
                <h1 className='text-3xl text-red-600'>Logged Out Successfully</h1>
                <Image src={success} alt="Bye! See You Soon" priority/>
                <button className='border border-red-600 px-4 py-2 text-red-600 rounded-lg text-xl hover:bg-red-600 hover:text-white'>
                    <Link href={"/"}>Go Back to Home Page</Link>
                </button>
        </div>
    )
}

export default Logout;