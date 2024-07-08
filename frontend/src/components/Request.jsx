"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { parseCookies } from 'nookies'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

const Request = (props) => {
    const cookies = parseCookies();
    const [data, setData] = useState({ userId: cookies["userId"], city: "", state: "", pin: "", bloodUnit: "", bloodGroup: "", deadline: "" })
    const { push, refresh } = useRouter();
    const [progress, setProgress] = useState(0)

    const submit = async (e) => {
        e.preventDefault();
        // console.log(data)
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
        // console.log(res);
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
            setProgress(100)
            refresh()
            push("/myprofile");
        }
    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const hideB = (e) => {
        if(!parseCookies()["usertoken"]){
            push("/login");
        }
        else{
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

            <div id='req' className="hidden items-center justify-center before:bg-black before:opacity-60 before:h-full before:w-full before:absolute before:-z-10 before:overflow-hidden z-10 before:inset-0 fixed h-full w-full">
                <div className="w-full max-w-md p-6 text-white rounded-lg shadow-lg card-gradient">
                    <div className='flex justify-stretch'>
                        <h2 className="text-2xl font-bold mb-2">Donate Blood</h2>
                        <button onClick={hideReq} className='bg-transparent cursor-pointer text-white'>cross</button>
                    </div>
                    <p className="mb-4 text-gray-400">Fill out the form to schedule your blood donation.</p>
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
                                    <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="city" name="city" placeholder="City" value={data.city} onChange={change} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                                    <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="state" name="state" placeholder="State" value={data.state} onChange={change} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="pin">Pincode</label>
                                    <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="zip" name="pin" placeholder="Pincode" value={data.pin} onChange={change} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="bloodUnit">Blood Unit</label>
                                    <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="bloodUnit" name="bloodUnit" placeholder="Enter your blood unit/group" value={data.bloodUnit} onChange={change} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="bloodGroup">Blood Group</label>
                                    <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="bloodUnit" name="bloodGroup" placeholder="Enter your blood group" value={data.bloodGroup} onChange={change} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="deadline">Deadline</label>

                                <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="date" id="timeTag" name="deadline" placeholder="Enter the deadline" value={data.deadline} onChange={change} />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between w-full">
                            <button className="px-4 w-full py-2 rounded-md bg-[#b9003a] text-white hover:bg-[#e2034b]" type="submit">Submit</button>
                        </div>
                    </form>
                    <ToastContainer />
                    <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
                </div>
            </div>
            {/* <div id="reqb" className='h-full w-full fixed flex justify-end items-end p-10 -z-10'> */}
                <button id="reqb" className='absolute top-3/4 left-3/4 bg-[#b9003a] p-4 rounded-full shadow-md border-none hover:bg-[#e2034b] text-white' onClick={hideB}>Hide</button>
            {/* </div> */}
        </div>
    )
}

export default Request
