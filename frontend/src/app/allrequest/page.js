import React from 'react'
import Requests from "@/components/Requests";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

const page = async () => {
    if (!cookies().has('usertoken')) {
        redirect("/login")
    }
    return (
        <Requests  />
    )
}

export default page