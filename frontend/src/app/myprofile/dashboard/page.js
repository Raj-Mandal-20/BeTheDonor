import React from 'react';
import { redirect } from 'next/navigation';
import Dashboard from '@/components/Dashboard';
import state_district_city_pin from "@/lib/state_district_city_pin.json";
import { getCurrentUser } from '@/app/actions/user';
import { getSession } from '@/app/actions/auth';
import Image from 'next/image';
import error from '../../../../public/error.webp';

const Page = async () => {
    if (!await getSession()) {
        redirect("/login");
    }
    const currentUserResponse = await getCurrentUser();
    if (currentUserResponse.myProfile) {
        const currentUser = currentUserResponse.myProfile;
        return (
            <Dashboard user={currentUser} data={state_district_city_pin} />
        );
    } else {
        return (
            <div className='w-[85%] min-h-screen flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <Image src={error} height={200} width={200} alt="" priority />
                    <div className='w-full p-12 flex flex-wrap gap-4'>
                        <h1 className='text-lg text-white'>{currentUserResponse.statusCode}</h1>
                        <h1 className='text-lg text-gray-400'>|</h1>
                        <h1 className='text-lg text-white'>{currentUserResponse.message}</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Page;
