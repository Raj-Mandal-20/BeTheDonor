import React from 'react'
import Requests from "@/components/Requests";
import { cookies } from 'next/headers'
// import { getHost } from '@/app/actions';

// const getFoods = async (id) => {
//     let response = await fetch(`${process.env.HOST}/api/foods/get?id=${id}`, { cache: 'no-store' });
//     let data = await response.json();
//     if (data.error) {
//         console.log(data.error)
//     }
//     else {
//         return data;
//     }
// }
const page = async ({ params }) => {
    // const data = await getFoods(params.id);
    // const host = await getHost();
    // let likes = [];
    // if (cookies().has('usertoken')) {
    //     likes = await getLikes();
    // }
    return (
        <Requests  />
    )
}

export default page