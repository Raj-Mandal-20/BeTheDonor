import Request from '@/components/Request';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { getHost } from '../actions';

// const getUser = async () => {
//     const cookieStore = cookies()
//     const usertoken = cookieStore.get('usertoken')
//     let response = await fetch(`${process.env.HOST}/api/auth/user/get`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer '+usertoken.value
//         }
//     }, { next: { revalidate: 1 } });
//     let data = await response.json();
//     if (data.message) {
//         console.log(data.message)
//     }
//     else {
//         return data
//     }
// }

const page = async () => {
    if (!cookies().has("usertoken")) {
        redirect("/login")
    }
    // let user = await getUser();
    let host = await getHost();
    return (
        <Request HOST={host} />
    )
}

export default page