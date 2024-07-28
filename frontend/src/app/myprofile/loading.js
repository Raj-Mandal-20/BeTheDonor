"use client"
import HashLoader from "react-spinners/HashLoader";
export default function Loading() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center w-[85%]">
            <HashLoader
                color={'white'}
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <p className="text-2xl mt-10 blinkL">Loading</p>
        </div>
    )
}