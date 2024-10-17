"use client";
import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowLoopLeft, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
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
        try {
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
        } catch (error) {
            setUser({});
            toast.error(`Server timed out for request Id: ${props.request._id}`, {
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
                <div className={`card bg-[#1c1c1f] shadow-lg shadow-black rounded-lg p-4 h-[268px] nano:h-[332px] text-white w-[20rem] nano:w-[14rem] flex justify-center items-center`}>
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
                <div className='h-[268px] nano:h-[332px] bg-[#1c1c1f] shadow-xl shadow-black rounded-lg flex flex-col justify-between gap-4 text-white w-[20rem] nano:w-[14rem] p-4'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-lg nano:text-base'>{props.request.donationCenter}</p>
                        <div className='flex nano:flex-col gap-1'>
                            <div className='flex gap-1 items-center user_name relative'>
                                <p className='text-xs text-gray-400 italic'>by</p>
                                <p className="text-xs italic underline hover:cursor-pointer">{user.name}</p>
                                <div className='user_details absolute bg-[#1c1c1f] z-10 p-4 rounded-md shadow-xl shadow-black hidden flex-col gap-2 w-[18rem] nano:w-[12rem]'>
                                    <p className="text-gray-500 text-sm bg-gray-200 rounded-full p-2 w-8 h-8 flex justify-center items-center">{logo}</p>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-xs text-gray-400 italic'>User Name</p>
                                        <p className='text-white text-xs'>{user.name}</p>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-xs text-gray-400 italic'>Phone Number</p>
                                        <p className='text-white text-xs'>{user.phoneNumber}</p>
                                    </div>
                                    <div className='flex flex-col gap-1 break-all'>
                                        <p className='text-xs text-gray-400 italic'>E-Mail Address</p>
                                        <p className='text-white text-xs'>{user.email}</p>
                                    </div>
                                </div>
                            </div>
                            <p className='text-xs text-gray-400 italic'>{createdAt}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-xs text-gray-400 italic'>Address</p>
                        <p className='text-xs'>{props.request.city}, {props.request.district}, {props.request.state}, {props.request.pin}</p>
                    </div>
                    <div className='flex w-full justify-between'>
                        <div className='flex items-center gap-1'>
                            <p className='text-xs text-gray-400 italic'>Blood Group</p>
                            <p className='text-xs'>{props.request.bloodGroup}</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-xs text-gray-400 italic'>Blood Units</p>
                            <p className='text-xs'>{props.request.bloodUnit}</p>
                        </div>
                    </div>
                    <div className='flex nano:flex-col-reverse nano:gap-2 w-full justify-between'>
                        <div className='flex items-center gap-1'>
                            <p className='text-xs text-gray-400 italic'>Deadline</p>
                            <p className='text-xs'>{lastDate}</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-xs text-gray-400 italic'>Acceptors</p>
                            <p className='text-xs'>{props.request.donors?.length}</p>
                        </div>
                    </div>
                    <div className='flex w-full justify-between items-center'>
                        <div className='flex text-sm'>
                            {
                                !isClosed && (
                                    <div title="Open" className={`text-blue-500`}><FontAwesomeIcon icon={faLockOpen} /></div>
                                )
                            }
                            {
                                isClosed && (
                                    <div title="Closed" className={`text-yellow-500`}><FontAwesomeIcon icon={faLock} /></div>
                                )
                            }
                        </div>
                        <div className='flex text-sm'>
                            <button title='Revoke Acceptance' className={`text-red-600 hover:text-red-500`}><FontAwesomeIcon icon={faPersonWalkingArrowLoopLeft} /></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AcceptedRequest;
