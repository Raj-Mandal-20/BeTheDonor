"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { parseCookies } from 'nookies'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

const Request = (props) => {
    const cookies = parseCookies();
    const [data, setData] = useState({ userId: cookies["userId"], donationCenter: "", city: "", state: "", district: "", pin: "", bloodUnit: "", bloodGroup: "", deadline: "" })
    const { push } = useRouter();
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateRQ").appendChild(option)
        }
    }, [])

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
                theme: "dark",
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
        if (e.target.name == 'state') {
            document.getElementById('districtRQ').innerHTML = '<option value="" class="text-gray-800">Select District</option>';
            document.getElementById('cityRQ').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
            document.getElementById('pinRQ').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';
            for (let state in props.data) {
                if (state == e.target.value) {
                    for (let district in props.data[state]) {
                        let option = document.createElement("option");
                        option.innerHTML = `${district}`
                        option.setAttribute("value", `${district}`);
                        option.setAttribute("class", 'text-gray-800');
                        document.getElementById("districtRQ").appendChild(option)
                    }
                }
            }
        }
        if (e.target.name == 'district') {
            document.getElementById('cityRQ').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
            document.getElementById('pinRQ').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';

            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == e.target.value) {
                            for (let city in props.data[state][district]) {
                                let option = document.createElement("option");
                                option.innerHTML = `${city}`
                                option.setAttribute("value", `${city}`);
                                option.setAttribute("class", 'text-gray-800');
                                document.getElementById("cityRQ").appendChild(option)
                            }
                        }
                    }
                }
            }
        }
        if (e.target.name == 'city') {
            document.getElementById('pinRQ').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';

            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == data.district) {
                            for (let city in props.data[state][district]) {
                                if (city == e.target.value) {
                                    let zip = props.data[state][district][city];
                                    let option = document.createElement("option");
                                    option.innerHTML = `${zip}`
                                    option.setAttribute("value", `${zip}`);
                                    option.setAttribute("class", 'text-gray-800');
                                    document.getElementById("pinRQ").appendChild(option)
                                }
                            }
                        }
                    }
                }
            }
        }
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
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <LoadingBar
                color='#3b82f6'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div id='req' className="hidden fixed h-full w-full items-center justify-center z-10 before:bg-black before:opacity-80 before:h-full before:w-full before:absolute before:-z-10">
                <div className="w-2/5 p-6 text-white rounded-lg shadow-lg card-gradient">
                    <div className='flex justify-between w-full items-center '>
                        <h2 className="text-2xl font-bold mb-2">Request For Donation</h2>
                        <button title='Close' onClick={hideReq} className='flex bg-transparent p-2 hover:bg-blue-100 hover:text-blue-950 rounded-full cursor-pointer text-white'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <p className="mb-4 text-gray-400">Fill out the form to request for new donations.</p>
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="dcRQ">Donation Center</label>
                                <input id='dcRQ' type="text" name="donationCenter" value={data.donationCenter} placeholder='Name of the Donation Center' onChange={change} className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="stateRQ">State</label>
                                    <select name="state" onChange={change} id="stateRQ" title='Center State' className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required>
                                        <option value="" className='text-gray-800'>Select State</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="districtRQ">District</label>
                                    <select name="district" onChange={change} id="districtRQ" title='Center District' className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required>
                                        <option value="" className='text-gray-800'>Select District</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                            <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="cityRQ">City</label>
                                    <select name="city" onChange={change} id="cityRQ" title='Center City' className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required>
                                        <option value="" className='text-gray-800'>Select City</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="pinRQ">Pincode</label>
                                    <select name="pin" onChange={change} id="pinRQ" title='Center Pincode' className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required>
                                        <option value="" className='text-gray-800'>Select Pincode</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="bloodUnitRQ">Blood Unit</label>
                                    <input className="block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="number" min={1} id="bloodUnitRQ" name="bloodUnit" placeholder="Enter blood units required" value={data.bloodUnit} onChange={change} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="bloodGroupRQ">Blood Group</label>
                                    <select id='bloodGroupRQ' title='Required Blood Group' name="bloodGroup" value={data.bloodGroup} onChange={change} className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required>
                                        <option value="" className='text-gray-800'>Select Blood Group</option>
                                        <option value="any" className='text-gray-800'>Any Group</option>
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
                                <label className="block text-sm font-medium mb-1" htmlFor="deadlineRQ">Deadline</label>
                                <input className="block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="date" id="deadlineRQ" name="deadline" value={data.deadline} onChange={change} required />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between w-full">
                            <button className="px-4 w-full py-2 rounded-md hover:shadow-md bg-[#b9003a] text-white hover:bg-[#e2034b]" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <button id="reqb" title='Add New Request' className='fixed flex top-[90%] left-[90%] bg-[#b9003a] p-4 rounded-full shadow-md border-none hover:bg-[#e2034b] text-white' onClick={hideB}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    )
}

export default Request
