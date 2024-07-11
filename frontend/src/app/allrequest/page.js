import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { getHost } from '../actions';
import BloodRequest from '@/components/BloodRequest';

const fetchRequests = async () => {
  const cookieStore = cookies();
  const requests = await fetch(`${process.env.HOST}/v1/all-blood-request`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookieStore.get("usertoken").value,
    },
  });
  const res = await requests.json();
  return res.allBloodRequest;
};

const page = async () => {
  if (!cookies().has('usertoken')) {
    redirect("/login")
  }
  let host = await getHost();
  let allBloodRequest = await fetchRequests();
  return (
    <div className={`bg-[#051a39] p-10 flex flex-wrap gap-8 justify-center items-center min-h-screen`}>
      {
        allBloodRequest?.length > 0 ? (
          allBloodRequest.map((request, index) => (
            <BloodRequest key={index} request={request} HOST={host} />
          ))
        ) : (
          <div className="text-white text-2xl h-[23rem]">
            No Blood Requests
          </div>
        )}
    </div>
  )
}

export default page