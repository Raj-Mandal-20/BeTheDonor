"use client"
import React, { useState, useEffect } from 'react';
import AcceptedRequest from './AcceptedRequest';
import LoadingBar from 'react-top-loading-bar';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchAcceptedRequests = (props) => {
    const [acceptedRequests, setAcceptedRequests] = useState(props.acceptedRequests);
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState({ city: "", state: "", district: "", pin: "", bloodGroup: "all", status: "all" });

    useEffect(() => {
        document.getElementById('stateMyD').innerHTML = '<option value="" class="hidden">--select state--</option>';
        document.getElementById('districtMyD').innerHTML = '<option value="" class="hidden">--select district--</option>';
        document.getElementById('cityMyD').innerHTML = '<option value="" class="hidden">--select city--</option>';
        document.getElementById('pinMyD').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateMyD").appendChild(option)
        }
    }, [props.data]);

    const change = (e) => {
        if (e.target.name == 'state') {
            setData({ ...data, state: e.target.value, district: '', city: '', pin: '' });
            const temp = props.acceptedRequests.filter((request) => {
                return (request.state.trim() == e.target.value.trim() && (request.bloodGroup.trim() == data.bloodGroup.trim() || request.bloodGroup.trim().toLowerCase() == 'any' || data.bloodGroup.trim() == 'all') && ((data.status == 'opened' && !isClosed(request)) || (data.status == 'closed' && isClosed(request)) || data.status == 'all'));
            })
            setAcceptedRequests(temp);
            document.getElementById('districtMyD').innerHTML = '<option value="" class="hidden">--select district--</option>';
            document.getElementById('cityMyD').innerHTML = '<option value="" class="hidden">--select city--</option>';
            document.getElementById('pinMyD').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
            for (let state in props.data) {
                if (state == e.target.value) {
                    for (let district in props.data[state]) {
                        let option = document.createElement("option");
                        option.innerHTML = `${district}`
                        option.setAttribute("value", `${district}`);
                        option.setAttribute("class", 'text-gray-800');
                        document.getElementById("districtMyD").appendChild(option)
                    }
                }
            }
        }
        if (e.target.name == 'district') {
            setData({ ...data, district: e.target.value, city: '', pin: '' });
            const temp = props.acceptedRequests.filter((request) => {
                if (request.state.trim() == data.state.trim() && request.district.trim() == e.target.value.trim() && (request.bloodGroup.trim() == data.bloodGroup.trim() || request.bloodGroup.trim().toLowerCase() == 'any' || data.bloodGroup.trim() == 'all') && ((data.status == 'opened' && !isClosed(request)) || (data.status == 'closed' && isClosed(request)) || data.status == 'all')) {
                    return request;
                }
            })
            setAcceptedRequests(temp);
            document.getElementById('cityMyD').innerHTML = '<option value="" class="hidden">--select city--</option>';
            document.getElementById('pinMyD').innerHTML = '<option value="" class="hidden">--select pincode--</option>';

            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == e.target.value) {
                            for (let city in props.data[state][district]) {
                                let option1 = document.createElement("option");
                                option1.innerHTML = `${city}`
                                option1.setAttribute("value", `${city}`);
                                option1.setAttribute("class", 'text-gray-800');
                                document.getElementById("cityMyD").appendChild(option1);
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
                                document.getElementById("pinMyD").appendChild(option2);
                            }
                        }
                    }
                }
            }
        }
        if (e.target.name == 'city') {
            const temp = props.acceptedRequests.filter((request) => {
                if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim() && request.city.trim() == e.target.value.trim() && (request.bloodGroup.trim() == data.bloodGroup.trim() || request.bloodGroup.trim().toLowerCase() == 'any' || data.bloodGroup.trim() == 'all') && ((data.status == 'opened' && !isClosed(request)) || (data.status == 'closed' && isClosed(request)) || data.status == 'all')) {
                    return request;
                }
            })
            setAcceptedRequests(temp);
            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == data.district) {
                            for (let city in props.data[state][district]) {
                                if (city == e.target.value) {
                                    let zip = props.data[state][district][city];
                                    document.getElementById("pinMyD").value = zip;
                                    setData({ ...data, city: e.target.value, pin: zip });
                                }
                            }
                        }
                    }
                }
            }
        }
        if (e.target.name == 'pin') {
            setData({ ...data, pin: e.target.value });
            const temp = props.acceptedRequests.filter((request) => {
                if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim() && request.pin.trim() == e.target.value.trim() && (request.bloodGroup.trim() == data.bloodGroup.trim() || request.bloodGroup.trim().toLowerCase() == 'any' || data.bloodGroup.trim() == 'all') && ((data.status == 'opened' && !isClosed(request)) || (data.status == 'closed' && isClosed(request)) || data.status == 'all')) {
                    return request;
                }
            })
            setAcceptedRequests(temp);
            document.getElementById('cityMyD').innerHTML = '<option value="" class="hidden">--select city--</option>';
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
                                    document.getElementById("cityMyD").appendChild(option);
                                }
                            }
                        }
                    }
                }
            }
        }
        if (e.target.name === 'bloodGroup') {
            setData({ ...data, bloodGroup: e.target.value });
            const temp = props.acceptedRequests.filter((request) => {
                if ((request.bloodGroup.trim() == e.target.value.trim() || request.bloodGroup.trim().toLowerCase() == 'any' || e.target.value == 'all') && (request.state.trim() == data.state.trim() || data.state.trim() == '') && (request.district.trim() == data.district.trim() || data.district.trim() == '') && (request.pin.trim() == data.pin.trim() || data.pin.trim() == '') && ((data.status == 'opened' && !isClosed(request)) || (data.status == 'closed' && isClosed(request)) || data.status == 'all')) {
                    return request;
                }
            })
            setAcceptedRequests(temp);
        }
        if (e.target.name === 'status') {
            setData({ ...data, status: e.target.value });
            const temp = props.acceptedRequests.filter((request) => {
                if (((e.target.value == 'opened' && !isClosed(request)) || (e.target.value == 'closed' && isClosed(request)) || e.target.value == 'all') && (request.bloodGroup.trim() == data.bloodGroup.trim() || request.bloodGroup.trim().toLowerCase() == 'any' || data.bloodGroup.trim() == 'all') && (request.state.trim() == data.state.trim() || data.state.trim() == '') && (request.district.trim() == data.district.trim() || data.district.trim() == '') && (request.pin.trim() == data.pin.trim() || data.pin.trim() == '')) {
                    return request;
                }
            })
            setAcceptedRequests(temp);
        }
    }

    const clearState = () => {
        document.getElementById('stateMyD').value = '';
        document.getElementById('districtMyD').innerHTML = '<option value="" class="hidden">--select district--</option>';
        document.getElementById('cityMyD').innerHTML = '<option value="" class="hidden">--select city--</option>';
        document.getElementById('pinMyD').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
        setData({ ...data, state: '', district: '', city: '', pin: '' });
        const temp = props.acceptedRequests.filter((request) => {
            return (request.bloodGroup.trim() == data.bloodGroup.trim() || request.bloodGroup.trim().toLowerCase() == 'any' || data.bloodGroup.trim() == 'all') && ((data.status == 'opened' && !isClosed(request)) || (data.status == 'closed' && isClosed(request)) || data.status == 'all');
        })
        setAcceptedRequests(temp);
    };

    const clearDistrict = () => {
        document.getElementById('districtMyD').value = '';
        document.getElementById('cityMyD').innerHTML = '<option value="" class="hidden">--select city--</option>';
        document.getElementById('pinMyD').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
        setData({ ...data, district: '', city: '', pin: '' });
        const temp = props.acceptedRequests.filter((request) => {
            return (request.state.trim() == data.state.trim() && (request.bloodGroup.trim() == data.bloodGroup.trim() || request.bloodGroup.trim().toLowerCase() == 'any' || data.bloodGroup.trim() == 'all') && ((data.status == 'opened' && !isClosed(request)) || (data.status == 'closed' && isClosed(request)) || data.status == 'all'));
        })
        setAcceptedRequests(temp);
    };

    const clearCity = () => {
        document.getElementById('pinMyD').value = '';
        setData({ ...data, city: '', pin: '' });
        document.getElementById('cityMyD').innerHTML = `<option value="" class="hidden">--select city--</option>`;
        for (let state in props.data) {
            if (state == data.state) {
                for (let district in props.data[state]) {
                    if (district == data.district) {
                        for (let city in props.data[state][district]) {
                            let option = document.createElement("option");
                            option.innerHTML = `${city}`;
                            option.setAttribute("value", `${city}`);
                            option.setAttribute("class", 'text-gray-800');
                            document.getElementById("cityMyD").appendChild(option);
                        }
                    }
                }
            }
        }
        const temp = props.acceptedRequests.filter((request) => {
            if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim() && (request.bloodGroup.trim() == data.bloodGroup.trim() || request.bloodGroup.trim().toLowerCase() == 'any' || data.bloodGroup.trim() == 'all') && ((data.status == 'opened' && !isClosed(request)) || (data.status == 'closed' && isClosed(request)) || data.status == 'all')) {
                return request;
            }
        })
        setAcceptedRequests(temp);
    };

    const clearPin = () => {
        document.getElementById('pinMyD').value = '';
        setData({ ...data, pin: '' });
        document.getElementById('cityMyD').innerHTML = `<option value="" class="hidden">--select city--</option>`;
        for (let state in props.data) {
            if (state == data.state) {
                for (let district in props.data[state]) {
                    if (district == data.district) {
                        for (let city in props.data[state][district]) {
                            let option = document.createElement("option");
                            option.innerHTML = `${city}`;
                            option.setAttribute("value", `${city}`);
                            option.setAttribute("class", 'text-gray-800');
                            document.getElementById("cityMyD").appendChild(option);
                        }
                    }
                }
            }
        }
        const temp = props.acceptedRequests.filter((request) => {
            if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim() && (request.bloodGroup.trim() == data.bloodGroup.trim() || request.bloodGroup.trim().toLowerCase() == 'any' || data.bloodGroup.trim() == 'all') && ((data.status == 'opened' && !isClosed(request)) || (data.status == 'closed' && isClosed(request)) || data.status == 'all')) {
                return request;
            }
        })
        setAcceptedRequests(temp);
    };

    const isClosed = (request) => {
        let c = new Date();
        let d = new Date(request.deadline);
        let year = d.getFullYear() - c.getFullYear();
        let month = d.getMonth() - c.getMonth();
        let day = d.getDate() - c.getDate();
        if (year > 0) {
            return request.isClosed;
        } else if (year == 0) {
            if (month > 0) {
                return request.isClosed;
            } else if (month == 0) {
                if (day >= 0) {
                    return request.isClosed;
                } else { return true; }
            } else { return true; }
        } else { return true; }
    };

    return (
        <div className={`flex flex-col gap-4 items-center h-screen overflow-auto w-[80%] mini:w-full`}>
            <LoadingBar
                color='#b9003a'
                progress={progress}
                height={4}
                onLoaderFinished={() => setProgress(0)}
            />
            <p className='hidden mini:block text-lg text-white italic pt-8 px-4'>My Accepted Requests</p>
            <div className="flex gap-4 p-4 w-full justify-center flex-wrap pt-8 mini:pt-4">
                <div className='flex w-[12rem]'>
                    <select name="state" onChange={change} id="stateMyD" title='Center State' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                    </select>
                    <button title='Clear State' onClick={clearState} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className='flex w-[12rem]'>
                    <select name="district" onChange={change} id="districtMyD" title='Center District' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                    </select>
                    <button title='Clear District' onClick={clearDistrict} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className='flex w-[12rem]'>
                    <select name="city" onChange={change} id="cityMyD" title='Center City' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                    </select>
                    <button title='Clear City' onClick={clearCity} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className='flex w-[12rem]'>
                    <select name="pin" onChange={change} id="pinMyD" title='Center Pincode' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                    </select>
                    <button title='Clear Pincode' onClick={clearPin} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className='flex w-[12rem]'>
                    <select title='Required Blood Group' name="bloodGroup" value={data.bloodGroup} onChange={change} className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none' required>
                        <option value="all" className='text-gray-800'>All Blood Groups</option>
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
                <div className='flex w-[12rem]'>
                    <select title='Request Activation Status' name="status" value={data.status} onChange={change} className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none' required>
                        <option value="all" className='text-gray-800'>All Requests</option>
                        <option value="opened" className='text-gray-800'>Opened</option>
                        <option value="closed" className='text-gray-800'>Closed</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-wrap gap-4 p-4 justify-center w-full'>
                {
                    acceptedRequests?.length > 0 ? (
                        acceptedRequests.map((request, index) => (
                            <AcceptedRequest key={index} request={request} setProgress={setProgress} />
                        ))
                    ) : (
                        <div className="text-white p-4 text-center micro:text-sm">
                            No Accepted Requests Found
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchAcceptedRequests;