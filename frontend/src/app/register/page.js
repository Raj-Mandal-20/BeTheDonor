import Register from "@/components/Register";
import { getHost } from "../actions";

const page = async () => {
    const host = await getHost();
    return (
        <div className="bg-[#051a39] h-fit w-full items-center p-10 flex justify-center">
            <Register HOST={host} />
        </div>
    )
}

export default page;