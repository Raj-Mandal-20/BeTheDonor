"use client"

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import LoadingBar from 'react-top-loading-bar';
import { createRequest } from '@/app/actions/requests';

const CreateRequest = (props) => {
    const { push } = useRouter();
    const [progress, setProgress] = useState(0);
    const [disable, setDisable] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [data, setData] = useState({ donationCenter: "", state: "", district: "", city: "", pin: "", bloodUnit: "", bloodGroup: "any", deadline: "" });

    useEffect(() => {
        document.getElementById('stateRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('districtRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('cityRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('pinRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateRQ").appendChild(option)
        }
        setDateRestrictions();
    }, [props.data]);

    const setDateRestrictions = () => {
        const today = new Date();
        const minDate = new Date();
        setMinDate(minDate.toISOString().split('T')[0]);
        const maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() + 1);
        setMaxDate(maxDate.toISOString().split('T')[0]);
    };

    const change = (e) => {
        if (e.target.name === 'state') {
            setData({ ...data, state: e.target.value, district: '', city: '', pin: '' });
            document.getElementById('districtRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
            document.getElementById('cityRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
            document.getElementById('pinRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
            for (let state in props.data) {
                if (state == e.target.value) {
                    for (let district in props.data[state]) {
                        let option = document.createElement("option");
                        option.innerHTML = `${district}`
                        option.setAttribute("value", `${district}`);
                        option.setAttribute("class", 'text-gray-800');
                        document.getElementById("districtRQ").appendChild(option);
                    }
                }
            }
        } else if (e.target.name === 'district') {
            setData({ ...data, district: e.target.value, city: "", pin: "" });
            document.getElementById('cityRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
            document.getElementById('pinRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == e.target.value) {
                            for (let city in props.data[state][district]) {
                                let option1 = document.createElement("option");
                                option1.innerHTML = `${city}`;
                                option1.setAttribute("value", `${city}`);
                                option1.setAttribute("class", 'text-gray-800');
                                document.getElementById("cityRQ").appendChild(option1);
                            }
                            let cityPinObj = props.data[state][district];
                            let pins = Object.values(cityPinObj);
                            let uniquePins = [...new Set(pins)];
                            uniquePins.sort((a, b) => a - b);
                            for (let zip of uniquePins) {
                                let option2 = document.createElement("option");
                                option2.innerHTML = `${zip}`;
                                option2.setAttribute("value", `${zip}`);
                                option2.setAttribute("class", 'text-gray-800');
                                document.getElementById("pinRQ").appendChild(option2);
                            }
                        }
                    }
                }
            }
        } else if (e.target.name === 'city') {
            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == data.district) {
                            for (let city in props.data[state][district]) {
                                if (city == e.target.value) {
                                    let zip = props.data[state][district][city];
                                    document.getElementById("pinRQ").value = zip;
                                    setData({ ...data, city: e.target.value, pin: zip });
                                }
                            }
                        }
                    }
                }
            }
        } else if (e.target.name === 'pin') {
            setData({ ...data, pin: e.target.value });
            document.getElementById('cityRQ').innerHTML = `<option value="" class="hidden">--select--</option>`;
            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == data.district) {
                            for (let city in props.data[state][district]) {
                                if (props.data[state][district][city] == e.target.value) {
                                    let option = document.createElement("option");
                                    option.innerHTML = `${city}`;
                                    option.setAttribute("value", `${city}`);
                                    option.setAttribute("class", 'text-gray-800');
                                    document.getElementById("cityRQ").appendChild(option);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };

    const clearState = () => {
        document.getElementById('stateRQ').value = '';
        document.getElementById('districtRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('cityRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('pinRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
        setData({ ...data, state: '', district: '', city: '', pin: '' });
    };

    const clearDistrict = () => {
        document.getElementById('districtRQ').value = '';
        document.getElementById('cityRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('pinRQ').innerHTML = '<option value="" class="hidden">--select--</option>';
        setData({ ...data, district: '', city: '', pin: '' });
    };

    const clearCity = () => {
        document.getElementById('pinRQ').value = '';
        setData({ ...data, city: '', pin: '' });
        document.getElementById('cityRQ').innerHTML = `<option value="" class="hidden">--select--</option>`;
        for (let state in props.data) {
            if (state == data.state) {
                for (let district in props.data[state]) {
                    if (district == data.district) {
                        for (let city in props.data[state][district]) {
                            let option = document.createElement("option");
                            option.innerHTML = `${city}`;
                            option.setAttribute("value", `${city}`);
                            option.setAttribute("class", 'text-gray-800');
                            document.getElementById("cityRQ").appendChild(option);
                        }
                    }
                }
            }
        }
    };

    const clearPin = () => {
        document.getElementById('pinRQ').value = '';
        setData({ ...data, pin: '' });
        document.getElementById('cityRQ').innerHTML = `<option value="" class="hidden">--select--</option>`;
        for (let state in props.data) {
            if (state == data.state) {
                for (let district in props.data[state]) {
                    if (district == data.district) {
                        for (let city in props.data[state][district]) {
                            let option = document.createElement("option");
                            option.innerHTML = `${city}`;
                            option.setAttribute("value", `${city}`);
                            option.setAttribute("class", 'text-gray-800');
                            document.getElementById("cityRQ").appendChild(option);
                        }
                    }
                }
            }
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setDisable(true);
        setProgress(10);
        const response = await createRequest(data);
        setProgress(50);
        if (!response.bloodRequest) {
            toast.error(response.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setDisable(false);
            setProgress(100);
        }
        else {
            toast.success(response.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setDisable(false);
            setOpenModal(false);
            setProgress(100);
            push('/myprofile/myrequests');
        }
    };

    return (
        <>
            <div className={`create-request-modal h-screen overflow-auto w-full absolute z-40 bg-[#161618] bg-opacity-80 ${openModal ? 'flex flex-col items-center p-20' : 'hidden'}`}>
                <LoadingBar
                    color='#b9003a'
                    progress={progress}
                    height={4}
                    onLoaderFinished={() => setProgress(0)}
                />
                <div className="flex flex-col gap-4 w-1/2 p-12 text-white rounded-md bg-[#1c1c1f] shadow-lg shadow-black">
                    <div className='flex justify-between w-full items-center'>
                        <p className="text-xl font-bold mb-2">Request For Donation</p>
                        <button title='Close This Modal' disabled={disable} onClick={() => { setOpenModal(false); }} className={`${disable ? 'text-gray-400 cursor-not-allowed' : 'text-white hover:text-gray-300'} text-xl`}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <p className="text-gray-400">Fill out this form to make a request for new blood donations.</p>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-8 py-4 w-full">
                            <div className='flex w-full relative'>
                                <input id='dcRQ' type="text" name="donationCenter" value={data.donationCenter} onChange={change} className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                                <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="dcRQ">Donation Center</label>
                            </div>
                            <div className="flex gap-4">
                                <div className='flex w-1/2 relative'>
                                    <select name="state" onChange={change} id="stateRQ" title='Center State' className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none rounded-r-none border-r-0' required>
                                    </select>
                                    <button title="Clear State" onClick={clearState} className='border-2 border-solid border-gray-400 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                    <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="stateRQ">State</label>
                                </div>
                                <div className='flex w-1/2 relative'>
                                    <select name="district" onChange={change} id="districtRQ" title='Center District' className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none rounded-r-none border-r-0' required>
                                    </select>
                                    <button title="Clear District" onClick={clearDistrict} className='border-2 border-solid border-gray-400 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                    <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="districtRQ">District</label>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className='flex w-1/2 relative'>
                                    <select name="city" onChange={change} id="cityRQ" title='Center City' className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none rounded-r-none border-r-0' required>
                                    </select>
                                    <button title="Clear City" onClick={clearCity} className='border-2 border-solid border-gray-400 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                    <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="cityRQ">City</label>
                                </div>
                                <div className='flex w-1/2 relative'>
                                    <select name="pin" onChange={change} id="pinRQ" title='Center Pincode' className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none rounded-r-none border-r-0' required>
                                    </select>
                                    <button title="Clear Pincode" onClick={clearPin} className='border-2 border-solid border-gray-400 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                    <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="pinRQ">Pincode</label>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className='flex w-1/2 relative'>
                                    <input className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' type="number" min={1} max={15} id="bloodUnitRQ" name="bloodUnit" value={data.bloodUnit} onChange={change} required />
                                    <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="bloodUnitRQ">Blood Unit</label>
                                </div>
                                <div className='flex w-1/2 relative'>
                                    <select id='bloodGroupRQ' title='Required Blood Group' name="bloodGroup" value={data.bloodGroup} onChange={change} className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
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
                                    <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="bloodGroupRQ">Blood Group</label>
                                </div>
                            </div>
                            <div className='flex relative'>
                                <input className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none date-input' type="date" id="deadlineRQ" name="deadline" value={data.deadline} min={minDate} max={maxDate} onChange={change} required />
                                <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="deadlineRQ">Deadline</label>
                            </div>
                        </div>
                        <button disabled={disable} className={`${disable ? 'bg-[#48484a] cursor-wait' : 'bg-[#b9003a] hover:bg-[#e2034b]'} px-4 py-2 w-full rounded-md hover:shadow-md text-white`} type="submit">{disable ? 'Processing...' : 'Submit'}</button>
                    </form>
                </div>
            </div>
            <button title='Create New Request' className={`fixed ${openModal ? 'hidden' : 'flex'} top-[90%] left-[90%] bg-[#b9003a] p-4 rounded-full shadow-lg shadow-black hover:bg-[#e2034b] text-white z-10`} onClick={() => { setOpenModal(true); }}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </>
    )
}

export default CreateRequest;