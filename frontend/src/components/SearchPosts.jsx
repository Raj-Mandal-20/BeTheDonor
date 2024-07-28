"use client"
import React, { useState, useEffect } from 'react';
import RequestHistory from './RequestHistory';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from "nookies";
import MoonLoader from "react-spinners/MoonLoader";

const SearchPosts = (props) => {
    const cookies = parseCookies();
    const [myRequests, setMyRequests] = useState(props.myRequests);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [acceptors, setAcceptors] = useState([]);
    const [RID, setRID] = useState("");
    const [data, setData] = useState({
        city: "",
        state: "",
        district: "",
        pin: ""
    })
    useEffect(() => {
        document.getElementById('stateMyR').innerHTML = '<option value="" class="text-gray-800">Select State</option>';
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateMyR").appendChild(option)
        }
    }, [props.data]);
    const fetchAcceptors = async () => {
        setLoading(true);
        setProgress(10);
        const getAcceptors = await fetch(`${props.HOST}/v1/donorlist/${RID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + cookies["usertoken"],
            }
        });
        setProgress(50);
        const response = await getAcceptors.json();
        setProgress(75);
        if (response.statusCode == 200) {
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
            setAcceptors(response.donors);
            setProgress(100);
            setLoading(false);
        }
        else {
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
            setAcceptors([]);
            setProgress(100);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (RID != "") {
            fetchAcceptors();
        }
    }, [RID]);
    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        if (e.target.name == 'state') {
            const temp = props.myRequests.filter((request) => {
                return request.state == e.target.value || e.target.value == '';
            })
            setMyRequests(temp);
            document.getElementById('districtMyR').innerHTML = '<option value="" class="text-gray-800">Select District</option>';
            document.getElementById('cityMyR').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
            document.getElementById('pinMyR').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';
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
            const temp = props.myRequests.filter((request) => {
                if (request.state == data.state && (request.district == e.target.value || e.target.value == '')) {
                    return request;
                }
            })
            setMyRequests(temp);
            document.getElementById('cityMyR').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
            document.getElementById('pinMyR').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';

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
                                let zip = props.data[state][district][city];
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
            const temp = props.myRequests.filter((request) => {
                if (request.state == data.state && request.district == data.district && (request.city == e.target.value || e.target.value == '')) {
                    return request;
                }
            })
            setMyRequests(temp);
            document.getElementById('pinMyR').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';
            if (e.target.value == '') {
                for (let state in props.data) {
                    if (state == data.state) {
                        for (let district in props.data[state]) {
                            if (district == data.district) {
                                for (let city in props.data[state][district]) {
                                    let zip = props.data[state][district][city];
                                    let option = document.createElement("option");
                                    option.innerHTML = `${zip}`;
                                    option.setAttribute("value", `${zip}`);
                                    option.setAttribute("class", 'text-gray-800');
                                    document.getElementById("pinMyR").appendChild(option);
                                }
                            }
                        }
                    }
                }
            }
            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == data.district) {
                            for (let city in props.data[state][district]) {
                                if (city == e.target.value) {
                                    let zip = props.data[state][district][city];
                                    document.getElementById("pinMyR").innerHTML = `<option value='${zip}' class="text-gray-800">${zip}</option>`;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (e.target.name == 'pin') {
            const temp = props.myRequests.filter((request) => {
                if (request.state == data.state && request.district == data.district && (request.pin == e.target.value || e.target.value == '')) {
                    return request;
                }
            })
            setMyRequests(temp);
            document.getElementById('cityMyR').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
            if (e.target.value == '') {
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
            }
            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == data.district) {
                            for (let city in props.data[state][district]) {
                                if (props.data[state][district][city] == e.target.value) {
                                    document.getElementById("cityMyR").innerHTML = `<option value='${city}' class="text-gray-800">${city}</option>`;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return (
        <>
            <div className={`mt-4 flex flex-col gap-4 items-center min-h-screen w-[60%]`}>
                <LoadingBar
                    color='#b9003a'
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                />
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
                <div className="flex gap-4 w-full justify-center flex-wrap">
                    <div className='w-[12rem]'>
                        <select name="state" onChange={change} id="stateMyR" title='Center State' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                            <option value="" className='text-gray-800'>Select State</option>
                        </select>
                    </div>
                    <div className='w-[12rem]'>
                        <select name="district" onChange={change} id="districtMyR" title='Center District' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                            <option value="" className='text-gray-800'>Select District</option>
                        </select>
                    </div>
                    <div className='w-[12rem]'>
                        <select name="city" onChange={change} id="cityMyR" title='Center City' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                            <option value="" className='text-gray-800'>Select City</option>
                        </select>
                    </div>
                    <div className='w-[12rem]'>
                        <select name="pin" onChange={change} id="pinMyR" title='Center Pincode' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                            <option value="" className='text-gray-800'>Select Pincode</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-wrap gap-4 p-4 justify-center w-full'>
                    {
                        myRequests?.length > 0 ? (
                            myRequests.map((request, index) => (
                                <RequestHistory key={index} i={index} request={request} HOST={props.host} setProgress={setProgress} toast={toast} setRID={setRID} />
                            ))
                        ) : (
                            <div className="text-white text-2xl col-span-2 text-center">
                                No Previous Requests Found
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={`flex min-h-screen w-[25%] border-l border-gray-800`}>
                <div className='flex flex-col w-full items-center h-screen overflow-scroll'>
                    {
                        !loading && (acceptors?.length > 0 ? (
                            acceptors.map((acceptor, index) => (
                                <div key={index} className="p-4 w-full bg-[#1c1c1f] border flex flex-col gap-2 border-gray-800">
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
                                {RID == "" ? "Select a Request" : "No Acceptors Found"}
                            </div>
                        ))
                    }
                    {
                        loading && (
                            <div className='flex p-4'>
                                <MoonLoader
                                color={"white"}
                                loading={loading}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default SearchPosts;