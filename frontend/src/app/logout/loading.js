"use client"
import HashLoader from "react-spinners/HashLoader";
export default function Loading() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center bg-[#051a39]">
            <HashLoader
                color={'white'}
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <p className="text-cyan-500 text-lg mt-10">Loading...</p>
        </div>
    )
}