"use client"

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Sidebar = (props) => {
    const pathname = usePathname();
    return (
        <div className="w-[15%] flex flex-col border-r border-gray-800">
            <Link href={"/myprofile/dashboard"} className={`${pathname === '/myprofile/dashboard' ? 'border-r-2 text-red-500 border-red-600 bg-red-200 bg-opacity-20' : 'text-white'} hover:text-red-500 px-8 py-4`}>Dasboard</Link>
            <Link href={"/myprofile/myrequests"} className={`${pathname === '/myprofile/myrequests' ? 'border-r-2 text-red-500 border-red-600 bg-red-200 bg-opacity-20' : 'text-white'} hover:text-red-500 px-8 py-4`}>My Requests</Link>
            <Link href={"/myprofile/mydonations"} className={`${pathname === '/myprofile/mydonations' ? 'border-r-2 text-red-500 border-red-600 bg-red-200 bg-opacity-20' : 'text-white'} hover:text-red-500 px-8 py-4`}>My Donations</Link>
            {/* <Link href={"/myprofile/changepass"} className={`${pathname === '/myprofile/changepass' ? 'border-r-2 text-red-500 border-red-600 bg-red-200 bg-opacity-20' : 'text-white'} hover:text-red-500 px-8 py-4`}>Change Password</Link> */}
        </div>
    )
}

export default Sidebar;