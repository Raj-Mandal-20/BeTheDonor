import Register from "@/components/Register";
import state_district_city_pin from '../../lib/state_district_city_pin.json';
import { getSession } from "../actions/auth";
import { redirect } from "next/navigation";

const page = async () => {
    if (await getSession()) {
        redirect("/myprofile/dashboard");
    }
    return (
        <div className="w-full p-8 flex justify-center items-start min-h-screen">
            <Register data={state_district_city_pin} />
        </div>
    )
}

export default page;