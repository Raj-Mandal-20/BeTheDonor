import Sidebar from "@/components/Sidebar";

const pageLayout = async ({ children }) => {
    return (
        <div className="w-full min-h-screen flex">
            <Sidebar />
            {children}
        </div>
    );
};

export default pageLayout;