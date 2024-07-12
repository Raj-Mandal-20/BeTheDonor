import Register from "@/components/Register";
import { getHost } from "../actions";
import data from "../../data.json";

const page = async () => {
    const host = await getHost();
    return (
        <div className="bg-[#051a39] w-full items-center p-10 flex justify-center min-h-screen">
            <Register HOST={host} data={data}/>
        </div>
    )
}

export default page;