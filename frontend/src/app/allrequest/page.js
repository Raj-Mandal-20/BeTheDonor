import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { getHost } from '../actions';
import SearchRequests from '@/components/SearchRequests';
import data from "../../data.json";

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

const countDonors = async (allBloodRequest) => {
  let obj = {};
  for (let request of allBloodRequest) {
    obj[request._id] = request.donors?.length;
  }
  return obj;
};

const page = async () => {
  if (!cookies().has('usertoken')) {
    redirect("/login")
  }
  let host = await getHost();
  let allBloodRequest = await fetchRequests();
  let donors = await countDonors(allBloodRequest);
  return (
    <SearchRequests allBloodRequest={allBloodRequest} donors={donors} host={host} data={data}/>
  )
}

export default page