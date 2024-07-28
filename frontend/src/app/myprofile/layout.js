import Sidebar from "@/components/Sidebar";
import { getHost } from "../actions";

const pageLayout = async ({ children }) => {
    let host = await getHost();
    return (
        <div className="w-full min-h-screen flex">
            <Sidebar HOST={host}/>
            {children}
        </div>
    );
};

export default pageLayout;