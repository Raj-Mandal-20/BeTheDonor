
import Login from "@/components/Login";
import { getHost } from "../actions";

const page = async () => {
    const host = await getHost();
    return (
        <div className="bg-[#051a39] h-screen w-full items-center p-10 flex justify-center">
            <Login HOST={host} />
        </div>
    )
}

export default page
