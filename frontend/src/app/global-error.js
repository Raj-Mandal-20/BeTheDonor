'use client'
import Image from 'next/image'

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body className='w-full bg-[#051a39] min-h-screen flex p-10 justify-center text-center'>
                <div className='flex flex-col items-center'>
                    <Image src="/error.gif" width={300} height={300} alt="" />
                    <h1 className='text-5xl text-red-400 p-3 text-center'>OOPs!</h1>
                    <h2 className='text text-blue-200 p-3 text-center'>An Error Occured: "{error.message}"</h2>
                    <button onClick={() => reset()} className="px-4 py-2 w-full text-white bg-red-500 border hover:bg-red-400 rounded-lg hover:shadow-lg border-red-400">Try again</button>
                </div>
            </body>
        </html>
    )
}