"use client"
import React, { useState, useEffect } from 'react';
import MyRequest from './MyRequest';
import LoadingBar from 'react-top-loading-bar';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchPosts = (props) => {
    const [myRequestsProps, setMyRequestsProps] = useState(props.myRequests);
    const [myRequests, setMyRequests] = useState(props.myRequests);
    const [isSliderOpened, setIsSliderOpened] = useState(false);
    const [progress, setProgress] = useState(0);
    const [acceptors, setAcceptors] = useState([]);
    const [data, setData] = useState({ city: "", state: "", district: "", pin: "" });

    useEffect(() => {
        document.getElementById('stateMyR').innerHTML = '<option value="" class="hidden">--select state--</option>';
        document.getElementById('districtMyR').innerHTML = '<option value="" class="hidden">--select district--</option>';
        document.getElementById('cityMyR').innerHTML = '<option value="" class="hidden">--select city--</option>';
        document.getElementById('pinMyR').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateMyR").appendChild(option)
        }
    }, [props.data]);

    const change = (e) => {
        if (e.target.name == 'state') {
            setData({ ...data, state: e.target.value, district: '', city: '', pin: '' });
            const temp = myRequestsProps.filter((request) => {
                return request.state.trim() == e.target.value.trim();
            })
            setMyRequests(temp);
            document.getElementById('districtMyR').innerHTML = '<option value="" class="hidden">--select district--</option>';
            document.getElementById('cityMyR').innerHTML = '<option value="" class="hidden">--select city--</option>';
            document.getElementById('pinMyR').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
            for (let state in props.data) {
                if (state == e.target.value) {
                    for (let district in props.data[state]) {
                        let option = document.createElement("option");
                        option.innerHTML = `${district}`
                        option.setAttribute("value", `${district}`);
                        option.setAttribute("class", 'text-gray-800');
                        document.getElementById("districtMyR").appendChild(option)
                    }
                }
            }
        }
        if (e.target.name == 'district') {
            setData({ ...data, district: e.target.value, city: '', pin: '' });
            const temp = myRequestsProps.filter((request) => {
                if (request.state.trim() == data.state.trim() && request.district.trim() == e.target.value.trim()) {
                    return request;
                }
            })
            setMyRequests(temp);
            document.getElementById('cityMyR').innerHTML = '<option value="" class="hidden">--select city--</option>';
            document.getElementById('pinMyR').innerHTML = '<option value="" class="hidden">--select pincode--</option>';

            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == e.target.value) {
                            for (let city in props.data[state][district]) {
                                let option1 = document.createElement("option");
                                option1.innerHTML = `${city}`
                                option1.setAttribute("value", `${city}`);
                                option1.setAttribute("class", 'text-gray-800');
                                document.getElementById("cityMyR").appendChild(option1);
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
                                document.getElementById("pinMyR").appendChild(option2);
                            }
                        }
                    }
                }
            }
        }
        if (e.target.name == 'city') {
            const temp = myRequestsProps.filter((request) => {
                if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim() && request.city.trim() == e.target.value.trim()) {
                    return request;
                }
            })
            setMyRequests(temp);
            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == data.district) {
                            for (let city in props.data[state][district]) {
                                if (city == e.target.value) {
                                    let zip = props.data[state][district][city];
                                    document.getElementById("pinMyR").value = zip;
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
            const temp = myRequestsProps.filter((request) => {
                if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim() && request.pin.trim() == e.target.value.trim()) {
                    return request;
                }
            })
            setMyRequests(temp);
            document.getElementById('cityMyR').innerHTML = '<option value="" class="hidden">--select city--</option>';
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
                                    document.getElementById("cityMyR").appendChild(option);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const clearState = () => {
        document.getElementById('stateMyR').value = '';
        document.getElementById('districtMyR').innerHTML = '<option value="" class="hidden">--select district--</option>';
        document.getElementById('cityMyR').innerHTML = '<option value="" class="hidden">--select city--</option>';
        document.getElementById('pinMyR').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
        setData({ ...data, state: '', district: '', city: '', pin: '' });
        setMyRequests(myRequestsProps);
    };

    const clearDistrict = () => {
        document.getElementById('districtMyR').value = '';
        document.getElementById('cityMyR').innerHTML = '<option value="" class="hidden">--select city--</option>';
        document.getElementById('pinMyR').innerHTML = '<option value="" class="hidden">--select pincode--</option>';
        setData({ ...data, district: '', city: '', pin: '' });
        const temp = myRequestsProps.filter((request) => {
            return request.state.trim() == data.state.trim();
        })
        setMyRequests(temp);
    };

    const clearCity = () => {
        document.getElementById('pinMyR').value = '';
        setData({ ...data, city: '', pin: '' });
        document.getElementById('cityMyR').innerHTML = `<option value="" class="hidden">--select city--</option>`;
        for (let state in props.data) {
            if (state == data.state) {
                for (let district in props.data[state]) {
                    if (district == data.district) {
                        for (let city in props.data[state][district]) {
                            let option = document.createElement("option");
                            option.innerHTML = `${city}`;
                            option.setAttribute("value", `${city}`);
                            option.setAttribute("class", 'text-gray-800');
                            document.getElementById("cityMyR").appendChild(option);
                        }
                    }
                }
            }
        }
        const temp = myRequestsProps.filter((request) => {
            if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim()) {
                return request;
            }
        })
        setMyRequests(temp);
    };

    const clearPin = () => {
        document.getElementById('pinMyR').value = '';
        setData({ ...data, pin: '' });
        document.getElementById('cityMyR').innerHTML = `<option value="" class="hidden">--select city--</option>`;
        for (let state in props.data) {
            if (state == data.state) {
                for (let district in props.data[state]) {
                    if (district == data.district) {
                        for (let city in props.data[state][district]) {
                            let option = document.createElement("option");
                            option.innerHTML = `${city}`;
                            option.setAttribute("value", `${city}`);
                            option.setAttribute("class", 'text-gray-800');
                            document.getElementById("cityMyR").appendChild(option);
                        }
                    }
                }
            }
        }
        const temp = myRequestsProps.filter((request) => {
            if (request.state.trim() == data.state.trim() && request.district.trim() == data.district.trim()) {
                return request;
            }
        })
        setMyRequests(temp);
    };

    return (
        <div className='relative w-[85%] flex'>
            <div className={`flex flex-col gap-4 items-center h-screen w-full overflow-auto`}>
                <LoadingBar
                    color='#b9003a'
                    progress={progress}
                    height={4}
                    onLoaderFinished={() => setProgress(0)}
                />
                <div className="flex gap-4 w-full justify-center flex-wrap pt-8">
                    <div className='flex w-[12rem]'>
                        <select name="state" onChange={change} id="stateMyR" title='Center State' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                        </select>
                        <button title='Clear State' onClick={clearState} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className='flex w-[12rem]'>
                        <select name="district" onChange={change} id="districtMyR" title='Center District' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                        </select>
                        <button title='Clear District' onClick={clearDistrict} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className='flex w-[12rem]'>
                        <select name="city" onChange={change} id="cityMyR" title='Center City' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                        </select>
                        <button title='Clear City' onClick={clearCity} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className='flex w-[12rem]'>
                        <select name="pin" onChange={change} id="pinMyR" title='Center Pincode' className='w-full h-[2rem] rounded-md bg-transparent text-white border-2 border-solid border-gray-500 outline-none border-r-0 rounded-r-none' required>
                        </select>
                        <button title='Clear Pincode' onClick={clearPin} className='h-[2rem] px-2 rounded-md bg-transparent text-white text-base border-2 border-solid border-gray-500 outline-none border-l-0 rounded-l-none'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
                <div className='flex flex-wrap gap-4 p-4 justify-center w-full'>
                    {
                        myRequests?.length > 0 ? (
                            myRequests.map((request, index) => (
                                <MyRequest key={index} request={request} setAcceptors={setAcceptors} setIsSliderOpened={setIsSliderOpened} setProgress={setProgress} myRequests={myRequests} setMyRequests={setMyRequests} myRequestsProps={myRequestsProps} setMyRequestsProps={setMyRequestsProps} />
                            ))
                        ) : (
                            <div className="text-white p-4 text-center">
                                No Previous Requests Found
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={`flex flex-col h-screen overflow-hidden absolute bg-[#161618] ${isSliderOpened ? 'w-full' : 'w-0'} border-r  border-gray-800 transition-all ease-linear duration-500 z-20`}>
                <button title='Close Slider' onClick={() => setIsSliderOpened(false)} className='text-white py-4 px-8 text-2xl text-right'>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className='flex flex-wrap w-full overflow-auto justify-center items-center p-12 gap-4'>
                    {
                        acceptors?.length > 0 ? (
                            acceptors.map((acceptor, index) => (
                                <div key={index} className="p-4 w-[30rem] bg-[#1c1c1f] shadow-lg shadow-black border flex flex-col gap-2 border-[#1c1c1f]">
                                    <div className="flex w-full justify-between">
                                        <p className='text-white text-sm'>{acceptor.name}</p>
                                        <p className="text-red-500 text-sm">{acceptor.blooodGroup}</p>
                                    </div>
                                    <div className='flex flex-col text-gray-400 text-xs'>
                                        <span>{acceptor.email}</span>
                                        <span>{acceptor.phoneNumber}</span>
                                    </div>
                                    <div className='flex text-gray-400 text-xs flex-wrap'>
                                        <span>{acceptor.state}</span>
                                        <span>, {acceptor.district}</span>
                                        <span>, {acceptor.city}</span>
                                        <span>, {acceptor.pin}</span>
                                    </div>
                                    <div className='flex text-gray-400 text-xs'>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-white p-4 text-center">
                                No Acceptors Found
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchPosts;