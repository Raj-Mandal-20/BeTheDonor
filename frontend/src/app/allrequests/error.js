'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import Image from 'next/image';
import errorImg from '../../../public/error.webp';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <Image src={errorImg} height={200} width={200} alt="" priority />
                <div className='w-full p-12 flex text-wrap gap-4'>
                    <h1 className='text-lg text-white'>504</h1>
                    <h1 className='text-lg text-gray-400'>|</h1>
                    <h1 className='text-lg text-white'>Server Timed Out</h1>
                </div>
            </div>
        </div>
    )
}