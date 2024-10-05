import React from 'react';
import { redirect } from 'next/navigation';
import SearchAcceptedRequests from '@/components/SearchAcceptedRequests';
import { getAcceptedRequests } from '@/app/actions/requests';
import { getSession } from '@/app/actions/auth';
import state_district_city_pin from "@/lib/state_district_city_pin.json";
import Image from 'next/image';
import error from '../../../../public/error.webp';

const page = async () => {
  if (!await getSession()) {
    redirect("/login")
  }
  const acceptedRequestsResponse = await getAcceptedRequests();
  if (acceptedRequestsResponse.donates) {
    const acceptedRequests = acceptedRequestsResponse.donates.filter(request => request != null);
    acceptedRequests.reverse();
    return (
      <SearchAcceptedRequests acceptedRequests={acceptedRequests} data={state_district_city_pin} />
    )
  } else {
    return (
      <div className='w-[85%] min-h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
          <Image src={error} height={200} width={200} alt="" priority />
          <div className='w-full p-12 flex flex-wrap gap-4'>
            <h1 className='text-lg text-white'>{acceptedRequestsResponse.statusCode}</h1>
            <h1 className='text-lg text-gray-400'>|</h1>
            <h1 className='text-lg text-white'>{acceptedRequestsResponse.message}</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default page;