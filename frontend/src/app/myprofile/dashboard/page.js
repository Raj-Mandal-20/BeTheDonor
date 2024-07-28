import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getHost } from "../../actions";
import Dashboard from '@/components/Dashboard';
import data from "../../../data.json";

const fetchUser = async () => {
    const cookieStore = cookies();
    const getProfile = await fetch(`${process.env.HOST}/v1/my-profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookieStore.get("usertoken").value,
        },
    }, { cache: 'no-store' });
    const profile = await getProfile.json();
    return profile.myProfile;
};

const Page = async () => {
    if (!cookies().has("usertoken")) {
        redirect("/login");
    }
    let host = await getHost();
    let user = await fetchUser();
    return (
        <Dashboard HOST={host} user={user} data={data}/>
    );
}

export default Page;
