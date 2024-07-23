
import Login from "@/components/Login";
import { getHost } from "../actions";

const page = async () => {
    const host = await getHost();
    return (
        <div className="min-h-screen w-full items-start p-8 flex justify-center">
            <Login HOST={host} />
        </div>
    )
}

export default page
