import React from 'react'
import { redirect } from 'next/navigation';
import SearchAllRequests from '@/components/SearchAllRequests';
import { getAllRequests } from '../actions/requests';
import { getCurrentUser } from '../actions/user';
import { getSession } from '../actions/auth';
import state_district_city_pin from "../../lib/state_district_city_pin.json";
import Image from 'next/image';
import error from '../../../public/error.webp';

const page = async () => {
  if (!await getSession()) {
    redirect("/login")
  }
  const allBloodRequestsResponse = await getAllRequests();
  if (allBloodRequestsResponse.allBloodRequest) {
    const allBloodRequests = allBloodRequestsResponse.allBloodRequest.filter(request => request != null);
    allBloodRequests.reverse();
    const currentUserResponse = await getCurrentUser();
    if (currentUserResponse.myProfile) {
      const currentUser = currentUserResponse.myProfile;
      const noOfAcceptors = {};
      allBloodRequests.forEach(request => {
        noOfAcceptors[request._id] = request.donors?.length;
      });
      return (
        <SearchAllRequests allBloodRequests={allBloodRequests} currentUser={currentUser} noOfAcceptors={noOfAcceptors} data={state_district_city_pin} />
      )
    } else {
      return (
        <div className='w-full min-h-screen flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center'>
            <Image src={error} height={200} width={200} alt="" priority />
            <div className='w-full p-12 flex flex-wrap gap-4'>
              <h1 className='text-lg micro:text-sm text-white'>{currentUserResponse.statusCode}</h1>
              <h1 className='text-lg micro:text-sm text-gray-400'>|</h1>
              <h1 className='text-lg micro:text-sm text-white'>{currentUserResponse.message}</h1>
            </div>
          </div>
        </div>
      )
    }
  } else {
    return (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
          <Image src={error} height={200} width={200} alt="" priority />
          <div className='w-full p-12 flex text-wrap gap-4'>
            <h1 className='text-lg micro:text-sm text-white'>{allBloodRequestsResponse.statusCode}</h1>
            <h1 className='text-lg micro:text-sm text-gray-400'>|</h1>
            <h1 className='text-lg micro:text-sm text-white'>{allBloodRequestsResponse.message}</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default page