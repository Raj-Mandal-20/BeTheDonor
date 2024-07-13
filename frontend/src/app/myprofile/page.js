import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getHost } from "../actions";
import MyProfile from '@/components/MyProfile';

const Page = async () => {
    if (!cookies().has("usertoken")) {
        redirect("/login");
    }
    const host = await getHost();
    return (
       <MyProfile HOST={host} />
    );
}

export default Page;
