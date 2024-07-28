import Register from "@/components/Register";
import { getHost } from "../actions";
import data from "../../data.json";

const page = async () => {
    const host = await getHost();
    return (
        <div className="w-full p-8 flex justify-center items-start min-h-screen">
            <Register HOST={host} data={data}/>
        </div>
    )
}

export default page;