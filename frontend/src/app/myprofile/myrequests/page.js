import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getHost } from "../../actions";
import SearchPosts from '@/components/SearchPosts';
import data from "../../../data.json";

const fetchRequests = async () => {
    const cookieStore = cookies();
    const getHistory = await fetch(`${process.env.HOST}/v1/request-history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookieStore.get("usertoken").value,
        },
    }, { cache: 'no-store' });
    const history = await getHistory.json();
    return history.bloodRequests;
};

const Page = async () => {
    if (!cookies().has("usertoken")) {
        redirect("/login");
    }
    const host = await getHost();
    const myRequests = await fetchRequests();
    return (
        <SearchPosts HOST={host} myRequests={myRequests} data={data} />
    );
}

export default Page;