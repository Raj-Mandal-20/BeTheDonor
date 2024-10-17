"use client"
import React, { useState, useEffect } from 'react';
import BloodRequest from './BloodRequest';
import LoadingBar from 'react-top-loading-bar';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchAllRequests = (props) => {
    const [allBloodRequests, setAllBloodRequests] = useState(props.allBloodRequests);
    const [currentUser, setCurrentUser] = useState(props.currentUser);
    const [noOfAcceptors, setNoOfAcceptors] = useState(props.noOfAcceptors);
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState({ city: "", state: "", district: "", pin: "" });

    useEffect(() => {
        document.getElementById('stateS').innerHTML = '<option value="" class="hidden">--select state--</option>';
        document.getElementById('districtS').innerHTML = '<option value="" class="hidden">--select district--</option>';
        document.getElementById('cityS').innerHTML = '<option value="" class="hidden">--select city--</option>';
        document.getElementById('pinS').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateS").appendChild(option)
        }
    }, [props.data]);

    const change = (e) => {
        if (e.target.name == 'state') {
            setData({ ...data, state: e.target.value, district: '', city: '', pin: '' });
            const temp = props.allBloodRequests.filter((request) => {
                return request.state.trim() == e.target.value.trim();
            })
            setAllBloodRequests(temp);
            document.getElementById('districtS').innerHTML = '<option value="" class="hidden">--select district--</option>';
            document.getElementById('cityS').innerHTML = '<option value="" class="hidden">--select city--</option>';
            document.getElementById('pinS').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
            for (let state in props.data) {
                if (state == e.target.value) {
                    for (let district in props.data[state]) {
                        let option = document.createElement("option");
                        option.innerHTML = `${district}`
                        option.setAttribute("value", `${district}`);
                        option.setAttribute("class", 'text-gray-800');
                        document.getElementById("districtS").appendChild(option)
                    }
                }
            }
        }
        if (e.target.name == 'district') {
            setData({ ...data, district: e.target.value, city: '', pin: '' });
            const temp = props.allBloodRequests.filter((request) => {
                if (request.state.trim() == data.state.trim() && request.district.trim() == e.target.value.trim()) {
                    return request;
                }
            })
            setAllBloodRequests(temp);
            document.getElementById('cityS').innerHTML = '<option value="" class="hidden">--select city--</option>';
            document.getElementById('pinS').innerHTML = '<option value="" class="hidden">--select pincode--</option>';

            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == e.target.value) {
                            for (let city in props.data[state][district]) {
                                let option1 = document.createElement("option");
                                option1.innerHTML = `${city}`
                                option1.setAttribute("value", `${city}`);
                                option1.setAttribute("class", 'text-gray-800');
                                document.getElementById("cityS").appendChild(option1);
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
                                document.getElementById("pinS").appendChild(option2);
                            }
                        }
                    }
                }
            }
        }
        if (e.target.name == 'city') {
            const temp = props.allBloodRequests.filter((request) => {
                if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim() && request.city.trim() == e.target.value.trim()) {
                    return request;
                }
            })
            setAllBloodRequests(temp);
            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == data.district) {
                            for (let city in props.data[state][district]) {
                                if (city == e.target.value) {
                                    let zip = props.data[state][district][city];
                                    document.getElementById("pinS").value = zip;
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
            const temp = props.allBloodRequests.filter((request) => {
                if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim() && request.pin.trim() == e.target.value.trim()) {
                    return request;
                }
            })
            setAllBloodRequests(temp);
            document.getElementById('cityS').innerHTML = '<option value="" class="hidden">--select city--</option>';
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
                                    document.getElementById("cityS").appendChild(option);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const clearState = () => {
        document.getElementById('stateS').value = '';
        document.getElementById('districtS').innerHTML = '<option value="" class="hidden">--select district--</option>';
        document.getElementById('cityS').innerHTML = '<option value="" class="hidden">--select city--</option>';
        document.getElementById('pinS').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
        setData({ ...data, state: '', district: '', city: '', pin: '' });
        setAllBloodRequests(props.allBloodRequests);
    };

    const clearDistrict = () => {
        document.getElementById('districtS').value = '';
        document.getElementById('cityS').innerHTML = '<option value="" class="hidden">--select city--</option>';
        document.getElementById('pinS').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
        setData({ ...data, district: '', city: '', pin: '' });
        const temp = props.allBloodRequests.filter((request) => {
            return request.state.trim() == data.state.trim();
        })
        setAllBloodRequests(temp);
    };

    const clearCity = () => {
        document.getElementById('pinS').value = '';
        setData({ ...data, city: '', pin: '' });
        document.getElementById('cityS').innerHTML = `<option value="" class="hidden">--select city--</option>`;
        for (let state in props.data) {
            if (state == data.state) {
                for (let district in props.data[state]) {
                    if (district == data.district) {
                        for (let city in props.data[state][district]) {
                            let option = document.createElement("option");
                            option.innerHTML = `${city}`;
                            option.setAttribute("value", `${city}`);
                            option.setAttribute("class", 'text-gray-800');
                            document.getElementById("cityS").appendChild(option);
                        }
                    }
                }
            }
        }
        const temp = props.allBloodRequests.filter((request) => {
            if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim()) {
                return request;
            }
        })
        setAllBloodRequests(temp);
    };

    const clearPin = () => {
        document.getElementById('pinS').value = '';
        setData({ ...data, pin: '' });
        document.getElementById('cityS').innerHTML = `<option value="" class="hidden">--select city--</option>`;
        for (let state in props.data) {
            if (state == data.state) {
                for (let district in props.data[state]) {
                    if (district == data.district) {
                        for (let city in props.data[state][district]) {
                            let option = document.createElement("option");
                            option.innerHTML = `${city}`;
                            option.setAttribute("value", `${city}`);
                            option.setAttribute("class", 'text-gray-800');
                            document.getElementById("cityS").appendChild(option);
                        }
                    }
                }
            }
        }
        const temp = props.allBloodRequests.filter((request) => {
            if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim()) {
                return request;
            }
        })
        setAllBloodRequests(temp);
    };

    return (
        <div className={`flex flex-col gap-4 items-center min-h-screen w-full`}>
            <LoadingBar
                color='#b9003a'
                progress={progress}
                height={4}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className="flex gap-8 p-8 w-full justify-center flex-wrap">
                <div className='flex w-[20rem]'>
                    <select name="state" onChange={change} id="stateS" title='Center State' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                    </select>
                    <button title='Clear State' onClick={clearState} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className='flex w-[20rem]'>
                    <select name="district" onChange={change} id="districtS" title='Center District' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                    </select>
                    <button title='Clear District' onClick={clearDistrict} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className='flex w-[20rem]'>
                    <select name="city" onChange={change} id="cityS" title='Center City' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                    </select>
                    <button title='Clear City' onClick={clearCity} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className='flex w-[20rem]'>
                    <select name="pin" onChange={change} id="pinS" title='Center Pincode' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                    </select>
                    <button title='Clear Pincode' onClick={clearPin} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </div>
            <div className='flex flex-wrap gap-8 p-8 justify-center w-full'>
                {
                    allBloodRequests?.length > 0 ? (
                        allBloodRequests.map((request, index) => (
                            <BloodRequest key={index} request={request} currentUser={currentUser} setCurrentUser={setCurrentUser} noOfAcceptors={noOfAcceptors} setNoOfAcceptors={setNoOfAcceptors} setProgress={setProgress} />
                        ))
                    ) : (
                        <div className="text-white p-4 text-center nano:text-sm">
                            No Blood Requests Found
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchAllRequests;