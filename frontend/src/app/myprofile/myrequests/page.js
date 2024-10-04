import React from 'react';
import { redirect } from 'next/navigation';
import SearchMyRequests from '@/components/SearchMyRequests';
import { getMyRequests } from '@/app/actions/requests';
import { getSession } from '@/app/actions/auth';
import state_district_city_pin from "@/lib/state_district_city_pin.json";
import Image from 'next/image';
import error from '../../../../public/error.webp';

const Page = async () => {
    if (!await getSession()) {
        redirect("/login");
    }
    try {
        const myRequestsResponse = await getMyRequests();
        if (myRequestsResponse.bloodRequests) {
            const myRequests = myRequestsResponse.bloodRequests.filter(request => request != null);
            myRequests.reverse();
            return (
                <SearchMyRequests myRequests={myRequests} data={state_district_city_pin} />
            );
        } else {
            return (
                <div className='w-[85%] min-h-screen flex justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <Image src={error} height={200} width={200} alt="" priority />
                        <div className='w-full p-12 flex flex-wrap gap-4'>
                            <h1 className='text-lg text-white'>{myRequestsResponse.statusCode}</h1>
                            <h1 className='text-lg text-gray-400'>|</h1>
                            <h1 className='text-lg text-white'>{myRequestsResponse.message}</h1>
                        </div>
                    </div>
                </div>
            );
        }
    } catch (error) {
        return (
            <div className='w-[85%] min-h-screen flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <Image src={error} height={200} width={200} alt="" priority />
                    <div className='w-full p-12 flex flex-wrap gap-4'>
                        <h1 className='text-lg text-white'>504</h1>
                        <h1 className='text-lg text-gray-400'>|</h1>
                        <h1 className='text-lg text-white'>Server Timed Out!</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Page;