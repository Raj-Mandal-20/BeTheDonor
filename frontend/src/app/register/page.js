import Register from "@/components/Register";
import { getHost } from "../actions";

const page = async () => {
    const host = await getHost();
    return (
        <div className="bg-[#051a39] h-fit">
            <Register HOST={host} />
        </div>
    )
}

export default page;