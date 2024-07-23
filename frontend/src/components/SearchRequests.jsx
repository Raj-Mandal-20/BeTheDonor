"use client"
import React, { useState, useEffect } from 'react';
import BloodRequest from './BloodRequest';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchRequests = (props) => {
    const [allBloodRequest, setAllBloodRequest] = useState(props.allBloodRequest);
    const [progress, setProgress] = useState(0);
    const [donors, setDonors] = useState(props.donors);
    const [data, setData] = useState({
        city: "",
        state: "",
        district: "",
        pin: ""
    })
    useEffect(() => {
        document.getElementById('stateS').innerHTML = '<option value="" class="text-gray-800">Select State</option>';
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateS").appendChild(option)
        }
    }, [props.data])
    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        if (e.target.name == 'state') {
            const temp = props.allBloodRequest.filter((request) => {
                return request.state == e.target.value || e.target.value == '';
            })
            setAllBloodRequest(temp);
            document.getElementById('districtS').innerHTML = '<option value="" class="text-gray-800">Select District</option>';
            document.getElementById('cityS').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
            document.getElementById('pinS').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';
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
            const temp = props.allBloodRequest.filter((request) => {
                if (request.state == data.state && (request.district == e.target.value || e.target.value == '')) {
                    return request;
                }
            })
            setAllBloodRequest(temp);
            document.getElementById('cityS').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
            document.getElementById('pinS').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';

            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == e.target.value) {
                            for (let city in props.data[state][district]) {
                                let option = document.createElement("option");
                                option.innerHTML = `${city}`
                                option.setAttribute("value", `${city}`);
                                option.setAttribute("class", 'text-gray-800');
                                document.getElementById("cityS").appendChild(option)
                            }
                        }
                    }
                }
            }
        }
        if (e.target.name == 'city') {
            const temp = props.allBloodRequest.filter((request) => {
                if (request.state == data.state && request.district == data.district && (request.city == e.target.value || e.target.value == '')) {
                    return request;
                }
            })
            setAllBloodRequest(temp);
            document.getElementById('pinS').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';

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
                                    document.getElementById("pinS").appendChild(option)
                                }
                            }
                        }
                    }
                }
            }
        }
        if (e.target.name == 'pin') {
            const temp = props.allBloodRequest.filter((request) => {
                if (request.state == data.state && request.district == data.district && request.city == data.city && (request.pin == e.target.value || e.target.value == '')) {
                    return request;
                }
            })
            setAllBloodRequest(temp);
        }
    }
    return (
        <div className={`mt-10 flex flex-col gap-8 items-center min-h-screen w-full`}>
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
            <div className="flex gap-8 w-full justify-center flex-wrap">
                <div className='w-[20rem]'>
                    <select name="state" onChange={change} id="stateS" title='Center State' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                        <option value="" className='text-gray-800'>Select State</option>
                    </select>
                </div>
                <div className='w-[20rem]'>
                    <select name="district" onChange={change} id="districtS" title='Center District' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                        <option value="" className='text-gray-800'>Select District</option>
                    </select>
                </div>
                <div className='w-[20rem]'>
                    <select name="city" onChange={change} id="cityS" title='Center City' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                        <option value="" className='text-gray-800'>Select City</option>
                    </select>
                </div>
                <div className='w-[20rem]'>
                    <select name="pin" onChange={change} id="pinS" title='Center Pincode' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                        <option value="" className='text-gray-800'>Select Pincode</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-wrap gap-8 p-12 justify-center w-full'>
                {
                    allBloodRequest?.length > 0 ? (
                        allBloodRequest.map((request, index) => (
                            <BloodRequest key={index} i={index} request={request} HOST={props.host} setProgress={setProgress} toast={toast} donors={donors} setDonors={setDonors}/>
                        ))
                    ) : (
                        <div className="text-white text-3xl col-span-2 text-center">
                            No Blood Requests
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchRequests;