import Login from "@/components/Login";
import { getSession } from "../actions/auth";
import { redirect } from "next/navigation";

const page = async () => {
    if (await getSession()) {
        redirect("/myprofile/dashboard");
    }
    return (
        <Login />
    )
}

export default page
