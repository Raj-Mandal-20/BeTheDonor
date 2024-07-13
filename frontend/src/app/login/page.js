
import Login from "@/components/Login";
import { getHost } from "../actions";

const page = async () => {
    const host = await getHost();
    return (
        <div className="bg-[#051a39] min-h-screen w-full items-start p-5 flex justify-center">
            <Login HOST={host} />
        </div>
    )
}

export default page
