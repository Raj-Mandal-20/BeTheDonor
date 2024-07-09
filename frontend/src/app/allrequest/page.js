import React from 'react'
import Requests from "@/components/Requests";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { getHost } from '../actions';

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
        <Requests HOST={host} allBloodRequest={allBloodRequest}/>
    )
}

export default page