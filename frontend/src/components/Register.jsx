"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';

const Register = (props) => {
    const [progress, setProgress] = useState(0)
    const [password, setPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false);
    const { push, refresh } = useRouter();
    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        age: "",
        gender: "",
        bloodGroup: "",
        state: "",
        district: "",
        city: "",
        pin: "",
        password: "",
        available: false
    })

    useEffect(() => {
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateRg").appendChild(option)
        }
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        if (data.password === password) {
            setProgress(10)
            let response = await fetch(`${props.HOST}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            setProgress(40)
            const result = await response.json();
            setProgress(70)
            if (!result.userId) {
                toast.error(result.message, {
                    position: "top-center",
                    autoClose: 3000,
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
                toast.success(result.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setProgress(100)
                refresh();
                push("/login");
            }
        } else {
            toast.error('Please type the passwords correctly!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        if (e.target.name == 'state') {
            document.getElementById('districtRg').innerHTML = '<option value="" class="text-gray-800">Select District</option>';
            document.getElementById('cityRg').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
            document.getElementById('pinRg').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';
            for (let state in props.data) {
                if (state == e.target.value) {
                    for (let district in props.data[state]) {
                        let option = document.createElement("option");
                        option.innerHTML = `${district}`
                        option.setAttribute("value", `${district}`);
                        option.setAttribute("class", 'text-gray-800');
                        document.getElementById("districtRg").appendChild(option)
                    }
                }
            }
        }
        if (e.target.name == 'district') {
            document.getElementById('cityRg').innerHTML = '<option value="" class="text-gray-800">Select City</option>';
            document.getElementById('pinRg').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';

            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == e.target.value) {
                            for (let city in props.data[state][district]) {
                                let option = document.createElement("option");
                                option.innerHTML = `${city}`
                                option.setAttribute("value", `${city}`);
                                option.setAttribute("class", 'text-gray-800');
                                document.getElementById("cityRg").appendChild(option)
                            }
                        }
                    }
                }
            }
        }
        if (e.target.name == 'city') {
            document.getElementById('pinRg').innerHTML = '<option value="" class="text-gray-800">Select Pincode</option>';

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
                                    document.getElementById("pinRg").appendChild(option)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const changeP = (e) => {
        setPassword(e.target.value)
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        setData({ ...data, available: e.target.checked });
    }

    return (
        <form onSubmit={submit} className='p-4 text-white flex flex-col gap-5 items-center rounded-lg shadow-lg card-gradient'>
            <LoadingBar
                color='#3b82f6'
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
            <h1 className='p-1 text-2xl font-bold text-white'>Register as a Donor</h1>
            <div className='flex flex-col gap-5 p-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="nameRg">Name</label>
                        <input id='nameRg' type="text" name="name" value={data.name} placeholder='Enter Your Name' onChange={change} className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="emailRg">E-Mail</label>
                        <input id='emailRg' type="email" name="email" value={data.email} placeholder='Enter Your Email' onChange={change} className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="cRg">Contact Number</label>
                        <input id='cRg' type="tel" name="phoneNumber" value={data.phoneNumber} placeholder='Enter Your Contact No' onChange={change} className='block outline-cyan-500 w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="ageRg">Age</label>
                        <input id='ageRg' type="number" min={18} max={65} name="age" value={data.age} placeholder='Enter Your Age' onChange={change} className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="gRg">Gender</label>
                        <select name="gender" onChange={change} id="gRg" title='Your Gender' className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required>
                            <option value="" className='text-gray-800'>Select Gender</option>
                            <option value="male" className='text-gray-800'>Male</option>
                            <option value="female" className='text-gray-800'>Female</option>
                            <option value="others" className='text-gray-800'>Others</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="bRg">Blood Group</label>
                        <select id='bRg' name="bloodGroup" value={data.bloodGroup} title='Your Blood Group' onChange={change} className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required>
                            <option value="" className='text-gray-800'>Select Blood Group</option>
                            <option value="A+" className='text-gray-800'>A+</option>
                            <option value="B+" className='text-gray-800'>B+</option>
                            <option value="O+" className='text-gray-800'>O+</option>
                            <option value="A-" className='text-gray-800'>A-</option>
                            <option value="B-" className='text-gray-800'>B-</option>
                            <option value="O-" className='text-gray-800'>O-</option>
                            <option value="AB+" className='text-gray-800'>AB+</option>
                            <option value="AB-" className='text-gray-800'>AB-</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="stateRg">State</label>
                        <select name="state" onChange={change} id="stateRg" title='Your State' className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required>
                            <option value="" className='text-gray-800'>Select State</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="districtRg">District</label>
                        <select name="district" onChange={change} id="districtRg" title='Your District' className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required>
                            <option value="" className='text-gray-800'>Select District</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="cityRg">City</label>
                        <select name="city" onChange={change} id="cityRg" title='Your City' className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required>
                            <option value="" className='text-gray-800'>Select City</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="pinRg">Pincode</label>
                        <select name="pin" onChange={change} id="pinRg" title='Your Pincode' className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required>
                            <option value="" className='text-gray-800'>Select Pincode</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="pwRg">Password</label>
                        <input id='pwRg' type="password" name="password" value={data.password} placeholder='Create a Password' onChange={change} className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="cpwRg">Confirm Password</label>
                        <input id='cpwRg' type="password" name="cpassword" value={password} placeholder='Confirm Your Password' onChange={changeP} className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required />
                    </div>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" id="available" checked={isChecked} onChange={handleCheckboxChange} className='accent-cyan-500'/>
                    <label htmlFor="available" className='text-white'>Available to Donate ? </label>
                </div>
                <div className='text-gray-300'>This will allow others to see your contact information.</div>
                <button type="submit" className='px-4 w-full py-2 rounded-md hover:shadow-md bg-[#b9003a] text-white hover:bg-[#e2034b]'>Register</button>
            </div>
            <div className='p-3 text-sm text-white'>Already have an account? <Link href={"/login"} className='underline text-white'>Login</Link></div>
        </form>
    )
}

export default Register;
