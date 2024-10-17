"use client"
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faDroplet, faCheckToSlot } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <>
            <div className="w-[20%] flex flex-col border-r border-gray-800 mini:hidden">
                <Link href={"/myprofile/dashboard"} className={`${pathname === '/myprofile/dashboard' ? 'border-r-2 text-red-500 border-red-600 bg-red-200 bg-opacity-20' : 'text-white'} hover:text-red-500 px-8 py-4 text-sm`}>Dasboard</Link>
                <Link href={"/myprofile/myrequests"} className={`${pathname === '/myprofile/myrequests' ? 'border-r-2 text-red-500 border-red-600 bg-red-200 bg-opacity-20' : 'text-white'} hover:text-red-500 px-8 py-4 text-sm`}>My Requests</Link>
                <Link href={"/myprofile/acceptedrequests"} className={`${pathname === '/myprofile/acceptedrequests' ? 'border-r-2 text-red-500 border-red-600 bg-red-200 bg-opacity-20' : 'text-white'} hover:text-red-500 px-8 py-4 text-sm`}>Accepted Requests</Link>
            </div>

            <div className="w-fit hidden border-r border-gray-800 mini:flex mini:flex-col">
                <Link href={"/myprofile/dashboard"} className={`${pathname === '/myprofile/dashboard' ? 'border-r-2 text-red-500 border-red-600 bg-red-200 bg-opacity-20' : 'text-white'} hover:text-red-500 px-8 py-4 micro:px-6 nano:px-4`}>
                    <FontAwesomeIcon icon={faIdBadge} />
                </Link>
                <Link href={"/myprofile/myrequests"} className={`${pathname === '/myprofile/myrequests' ? 'border-r-2 text-red-500 border-red-600 bg-red-200 bg-opacity-20' : 'text-white'} hover:text-red-500 px-8 py-4 micro:px-6 nano:px-4`}>
                    <FontAwesomeIcon icon={faDroplet} />
                </Link>
                <Link href={"/myprofile/acceptedrequests"} className={`${pathname === '/myprofile/acceptedrequests' ? 'border-r-2 text-red-500 border-red-600 bg-red-200 bg-opacity-20' : 'text-white'} hover:text-red-500 px-8 py-4 micro:px-6 nano:px-4`}>
                    <FontAwesomeIcon icon={faCheckToSlot} />
                </Link>
            </div>
        </>
    )
}

export default Sidebar;