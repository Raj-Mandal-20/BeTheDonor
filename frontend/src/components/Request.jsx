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
    const [data, setData] = useState({ userId: cookies["userId"], donationCenter: "", city: "", state: "", district: "", pin: "", bloodUnit: "", bloodGroup: "any", deadline: "" })
    const { push } = useRouter();
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        document.getElementById('stateRQ').innerHTML = '<option value="" class="hidden"></option>';
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateRQ").appendChild(option)
        }
    }, [props.data])

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
            document.getElementById('districtRQ').innerHTML = '<option value="" class="hidden"></option>';
            document.getElementById('cityRQ').innerHTML = '<option value="" class="hidden"></option>';
            document.getElementById('pinRQ').innerHTML = '<option value="" class="hidden"></option>';
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
            document.getElementById('cityRQ').innerHTML = '<option value="" class="hidden"></option>';
            document.getElementById('pinRQ').innerHTML = '<option value="" class="hidden"></option>';

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
            document.getElementById('pinRQ').innerHTML = '<option value="" class="hidden"></option>';

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
                color='#b9003a'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div id='req' className="hidden fixed h-full w-full items-center justify-center z-20 before:bg-black before:opacity-90 before:h-full before:w-full before:absolute before:-z-10">
                <div className="w-2/5 p-12 text-white rounded-lg bg-[#1c1c1f] card-gradient">
                    <div className='flex justify-between w-full items-center '>
                        <h2 className="text-2xl font-bold mb-2">Request For Donation</h2>
                        <button title='Close' onClick={hideReq} className='flex bg-transparent p-2 hover:bg-blue-100 hover:text-blue-950 rounded-full cursor-pointer text-white'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <p className="mb-4 text-gray-400">Fill out the form to request for new donations.</p>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-8 py-8 w-full">
                            <div className='flex relative'>
                                <input id='dcRQ' type="text" name="donationCenter" value={data.donationCenter} onChange={change} className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                                <label className="labels text-sm rounded-md" htmlFor="dcRQ">Donation Center</label>
                            </div>
                            <div className="flex gap-4">
                                <div className='flex w-1/2 relative'>
                                    <select name="state" onChange={change} id="stateRQ" title='Center State' className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                                        <option value="" className='hidden'></option>
                                    </select>
                                    <label className="labels text-sm rounded-md" htmlFor="stateRQ">State</label>
                                </div>
                                <div className='flex w-1/2 relative'>
                                    <select name="district" onChange={change} id="districtRQ" title='Center District' className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                                        <option value="" className='hidden'></option>
                                    </select>
                                    <label className="labels text-sm rounded-md" htmlFor="districtRQ">District</label>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className='flex w-1/2 relative'>
                                    <select name="city" onChange={change} id="cityRQ" title='Center City' className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                                        <option value="" className='hidden'></option>
                                    </select>
                                    <label className="labels text-sm rounded-md" htmlFor="cityRQ">City</label>
                                </div>
                                <div className='flex w-1/2 relative'>
                                    <select name="pin" onChange={change} id="pinRQ" title='Center Pincode' className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                                        <option value="" className='hidden'></option>
                                    </select>
                                    <label className="labels text-sm rounded-md" htmlFor="pinRQ">Pincode</label>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className='flex w-1/2 relative'>
                                    <input className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none date-input' type="number" min={1} id="bloodUnitRQ" name="bloodUnit" value={data.bloodUnit} onChange={change} required />
                                    <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 left-4 px-1 bg-[#1c1c1f]" htmlFor="bloodUnitRQ">Blood Unit</label>
                                </div>
                                <div className='flex w-1/2 relative'>
                                    <select id='bloodGroupRQ' title='Required Blood Group' name="bloodGroup" value={data.bloodGroup} onChange={change} className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
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
                                    <label className="labels text-sm rounded-md" htmlFor="bloodGroupRQ">Blood Group</label>
                                </div>
                            </div>
                            <div className='flex relative'>
                                <input className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none date-input' type="date" id="deadlineRQ" name="deadline" value={data.deadline} onChange={change} required />
                                <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 left-4 px-1 bg-[#1c1c1f]" htmlFor="deadlineRQ">Deadline</label>
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
