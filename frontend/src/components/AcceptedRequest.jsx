"use client";
import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { getUser } from "@/app/actions/user";
import { toast } from "react-toastify";

const AcceptedRequest = (props) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [isClosed, setIsClosed] = useState(props.request.isClosed);
    const [logo, setLogo] = useState('');
    const createdAt = new Date(props.request.createdAt).toDateString();
    const lastDate = new Date(props.request.deadline).toDateString();

    const checkIfDeadlineIsMissed = async () => {
        let c = new Date();
        let d = new Date(props.request.deadline);
        let year = d.getFullYear() - c.getFullYear();
        let month = d.getMonth() - c.getMonth();
        let day = d.getDate() - c.getDate();
        if (year > 0) {
            return false;
        } else if (year == 0) {
            if (month > 0) {
                return false;
            } else if (month == 0) {
                if (day >= 0) {
                    return false;
                } else { return true; }
            } else { return true; }
        } else { return true; }
    };

    const fetchUser = async () => {
        setLoading(true);
        const fetchedUser = await getUser(props.request.userId);
        if (fetchedUser.user) {
            setUser(fetchedUser.user);
        } else {
            setUser({});
            toast.error(`Failed to fetch user for request Id: ${props.request._id}`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        const isDeadlineMissed = await checkIfDeadlineIsMissed();
        if (isDeadlineMissed) {
            setIsClosed(true);
        } else {
            setIsClosed(props.request.isClosed);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, [props.request]);

    useEffect(() => {
        if (!user.name) return;
        let logo = '';
        let temp = user.name.trim().split(" ");
        let index = 0;
        for (let e of temp) {
            if (index == 2) break;
            logo = logo + e[0];
            index++;
        }
        setLogo(logo.toUpperCase());
    }, [user]);

    return (
        <>
            {loading && (
                <div className={`card bg-[#1c1c1f] shadow-lg shadow-black rounded-lg p-4 h-[618.4px] text-white w-[20rem] flex justify-center items-center`}>
                    <MoonLoader
                        color={"white"}
                        loading={loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            )}
            {!loading && (
                <div className={`card h-fit bg-[#1c1c1f] shadow-xl shadow-black rounded-lg flex flex-col text-white w-[20rem]`}>
                    <div className="flex flex-col gap-2 items-center w-full bg-[#39393b] p-4">
                        <div className="w-full flex justify-end">
                            {
                                !isClosed && (
                                    <div className="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-green-600 bg-white text-green-900">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 -translate-x-1 text-green-300"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle className="blinkOpen" cx="12" cy="12" r="10"></circle>
                                        </svg>
                                        Open
                                    </div>
                                )
                            }
                            {
                                isClosed && (
                                    <div className="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-red-500 bg-white text-red-900">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 -translate-x-1 text-red-300"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle className="blinkClose" cx="12" cy="12" r="10"></circle>
                                        </svg>
                                        Closed
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 w-full">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-500 text-2xl font-bold">{logo}</span>
                            </div>
                            <div className="text-2xl font-bold flex text-center">{user.name}</div>
                            <div className="text-xs text-gray-300 flex flex-col gap-1 items-center">
                                <p>{user.email}</p>
                                <p>{user.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full p-4 text-sm">
                        <div className="flex flex-col gap-2 w-full py-4 border-b border-gray-600">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">Center</p>
                                <p>{props.request.donationCenter}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">State</p>
                                <p>{props.request.state}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">District</p>
                                <p>{props.request.district}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">City</p>
                                <p>{props.request.city}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">Pincode</p>
                                <p>{props.request.pin}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full py-4">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">Blood Group</p>
                                <p>{props.request.bloodGroup}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">Blood Unit</p>
                                <p>{props.request.bloodUnit}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">Acceptors</p>
                                <p>{props.request.donors?.length}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">Created at</p>
                                <p>{createdAt}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">Deadline</p>
                                <p>{lastDate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex  w-full">
                        {
                            !isClosed ?
                                <button id="cbmd" className="px-4 py-2 w-full bg-red-300 text-black hover:cursor-not-allowed">Revoke</button>
                                :
                                <button className="px-4 py-2 w-full bg-orange-300 text-black hover:cursor-not-allowed">Request Closed</button>
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default AcceptedRequest;
