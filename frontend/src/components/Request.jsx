"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { parseCookies } from 'nookies'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

const Request = (props) => {
    const cookies = parseCookies();
    const [data, setData] = useState({ userId: cookies["userId"], city: "", state: "", pin: "", bloodUnit: "", bloodGroup: "Any", deadline: "" })
    const { push } = useRouter();
    const [progress, setProgress] = useState(0)

    const submit = async (e) => {
        e.preventDefault();
        setProgress(10)
        let response = await fetch(`${props.HOST}/v1/create-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + cookies["usertoken"]
            },
            body: JSON.stringify(data)
        });
        setProgress(40)
        const res = await response.json();
        setProgress(70)
        if (!res.bloodRequest) {
            toast.error(res.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setProgress(100)
        }
        else {
            toast.success(res.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            document.getElementById('req').style.display = 'none';
            document.getElementById('reqb').style.display = 'flex';
            setProgress(100)
            push("/myprofile");
        }
    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const hideB = (e) => {
        if (!parseCookies()["usertoken"]) {
            push("/login");
        }
        else {
            document.getElementById('reqb').style.display = "none";
            document.getElementById('req').style.display = "flex";
        }
    }

    const hideReq = () => {
        document.getElementById('req').style.display = 'none';
        document.getElementById('reqb').style.display = 'flex';
    }

    return (
        <div className="">
            <div id='req' className="hidden fixed h-full w-full items-center justify-center before:bg-black before:opacity-80 before:h-full before:w-full before:absolute before:-z-10">
                <div className="w-2/5 p-6 text-white rounded-lg shadow-lg card-gradient">
                    <div className='flex justify-between w-full items-center '>
                        <h2 className="text-2xl font-bold mb-2">Request For Donation</h2>
                        <button title='Close' onClick={hideReq} className='bg-transparent p-2 hover:bg-blue-100 hover:text-blue-950 rounded-lg cursor-pointer text-white'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <p className="mb-4 text-gray-400">Fill out the form to request for new donations.</p>
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                                    <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="state" name="state" placeholder="State" value={data.state} onChange={change} required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
                                    <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="city" name="city" placeholder="City" value={data.city} onChange={change} required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="pin">Pincode</label>
                                    <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="zip" name="pin" placeholder="Pincode" value={data.pin} onChange={change} required/>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="bloodUnit">Blood Unit</label>
                                    <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="bloodUnit" name="bloodUnit" placeholder="Enter blood units required" value={data.bloodUnit} onChange={change} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="bloodGroup">Blood Group</label>
                                    <select id='bloodGroup' name="bloodGroup" value={data.bloodGroup} onChange={change} className='block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300'>
                                        <option value="Any" className='text-gray-800'>Select Blood Group</option>
                                        <option value="A+" className='text-gray-800'>A+</option>
                                        <option value="B+" className='text-gray-800'>B+</option>
                                        <option value="O+" className='text-gray-800'>O+</option>
                                        <option value="AB+" className='text-gray-800'>AB+</option>
                                        <option value="A-" className='text-gray-800'>A-</option>
                                        <option value="B-" className='text-gray-800'>B-</option>
                                        <option value="O-" className='text-gray-800'>O-</option>
                                        <option value="AB-" className='text-gray-800'>AB-</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="deadline">Deadline</label>
                                <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="date" id="deadline" name="deadline" value={data.deadline} onChange={change} required/>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between w-full">
                            <button className="px-4 w-full py-2 rounded-md bg-[#b9003a] text-white hover:bg-[#e2034b]" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <button id="reqb" title='Add New Request' className='fixed flex top-[90%] left-[90%] bg-[#b9003a] p-4 rounded-full shadow-md border-none hover:bg-[#e2034b] text-white' onClick={hideB}>
                <FontAwesomeIcon icon={faPlus} />
            </button>

            <ToastContainer />
            <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
        </div>
    )
}

export default Request
