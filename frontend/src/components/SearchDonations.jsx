"use client"
import React, { useState, useEffect } from 'react';
import Donation from './Donation';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchDonations = (props) => {
    const [allDonations, setAllDonations] = useState(props.allDonations);
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState({
        city: "",
        state: "",
        district: "",
        pin: ""
    })
    useEffect(() => {
        document.getElementById('stateMyD').innerHTML = '<option value="" class="text-gray-800">Select State</option>';
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateMyD").appendChild(option)
        }
    }, [props.data])
    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        if (e.target.name == 'state') {
            const temp = props.allDonations.filter((request) => {
                return request.state == e.target.value || e.target.value == '';
            })
            setAllDonations(temp);
            document.getElementById('districtMyD').innerHTML = '<option value="" class="text-gray-800">Select District</option>';
            document.getElementById('cityMyD').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
            document.getElementById('pinMyD').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';
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
            const temp = props.allDonations.filter((request) => {
                if (request.state == data.state && (request.district == e.target.value || e.target.value == '')) {
                    return request;
                }
            })
            setAllDonations(temp);
            document.getElementById('cityMyD').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
            document.getElementById('pinMyD').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';

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
                                let zip = props.data[state][district][city];
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
            const temp = props.allDonations.filter((request) => {
                if (request.state == data.state && request.district == data.district && (request.city == e.target.value || e.target.value == '')) {
                    return request;
                }
            })
            setAllDonations(temp);
            document.getElementById('pinMyD').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';
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
                                    document.getElementById("pinMyD").appendChild(option);
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
                                    document.getElementById("pinMyD").innerHTML = `<option value='${zip}' class="text-gray-800">${zip}</option>`;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (e.target.name == 'pin') {
            const temp = props.allDonations.filter((request) => {
                if (request.state == data.state && request.district == data.district && (request.pin == e.target.value || e.target.value == '')) {
                    return request;
                }
            })
            setAllDonations(temp);
            document.getElementById('cityMyD').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
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
                                    document.getElementById("cityMyD").appendChild(option);
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
                                    document.getElementById("cityMyD").innerHTML = `<option value='${city}' class="text-gray-800">${city}</option>`;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return (
        <div className={`mt-4 flex flex-col gap-4 items-center min-h-screen w-[85%]`}>
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
                <div className='w-[15rem]'>
                    <select name="state" onChange={change} id="stateMyD" title='Center State' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                        <option value="" className='text-gray-800'>Select State</option>
                    </select>
                </div>
                <div className='w-[15rem]'>
                    <select name="district" onChange={change} id="districtMyD" title='Center District' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                        <option value="" className='text-gray-800'>Select District</option>
                    </select>
                </div>
                <div className='w-[15rem]'>
                    <select name="city" onChange={change} id="cityMyD" title='Center City' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                        <option value="" className='text-gray-800'>Select City</option>
                    </select>
                </div>
                <div className='w-[15rem]'>
                    <select name="pin" onChange={change} id="pinMyD" title='Center Pincode' className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-500 focus:border-red-500 outline-none' required>
                        <option value="" className='text-gray-800'>Select Pincode</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-wrap gap-4 p-4 justify-center w-full'>
                {
                    allDonations?.length > 0 ? (
                        allDonations.map((request, index) => (
                            <Donation key={index} i={index} request={request} HOST={props.host} setProgress={setProgress} toast={toast} />
                        ))
                    ) : (
                        <div className="text-white text-2xl col-span-2 text-center">
                            No Previous Donations Found
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchDonations;