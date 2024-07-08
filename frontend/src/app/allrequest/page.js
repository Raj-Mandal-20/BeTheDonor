import React from 'react'
import Requests from "@/components/Requests";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { getHost } from '../actions';

const page = async () => {
    if (!cookies().has('usertoken')) {
        redirect("/login")
    }
    let host = await getHost();
    return (
        <Requests HOST={host} />
    )
}

export default page