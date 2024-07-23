"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
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
        dob: "",
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
        document.getElementById('stateRg').innerHTML = '<option value="" class="hidden"></option>';
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateRg").appendChild(option)
        }
    }, [props.data])

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
            if (result.message != 'Verification Email Sent Successfully!') {
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
                setProgress(100);
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
                setProgress(100);
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
        if (e.target.name === 'password') {
            if (/[A-Z]/.test(e.target.value) && /[a-z]/.test(e.target.value) && /[0-9]/.test(e.target.value) && e.target.value.length >= 8) {
                document.getElementById('pwRg').style.color = '#22c55e';
                document.getElementById('pwRg').style.borderColor = '#22c55e';
                document.getElementById('plRg').style.color = '#22c55e';
                e.target.setCustomValidity('');
            } else {
                document.getElementById('pwRg').style.color = '#e2034b';
                document.getElementById('pwRg').style.borderColor = '#e2034b';
                document.getElementById('plRg').style.color = '#e2034b';
                e.target.setCustomValidity('Must have 1 lowercase, 1 uppercase, 1 number, 8 characters or more');
                e.target.reportValidity();
            }
        }
        if (e.target.name == 'state') {
            document.getElementById('districtRg').innerHTML = '<option value="" class="hidden"></option>';
            document.getElementById('cityRg').innerHTML = '<option value="" class="hidden"></option>';
            document.getElementById('pinRg').innerHTML = '<option value="" class="hidden"></option>';
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
            document.getElementById('cityRg').innerHTML = '<option value="" class="hidden"></option>';
            document.getElementById('pinRg').innerHTML = '<option value="" class="hidden"></option>';

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
            document.getElementById('pinRg').innerHTML = '<option value="" class="hidden"></option>';

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
        if (e.target.name === 'cpassword') {
            if (/[A-Z]/.test(e.target.value) && /[a-z]/.test(e.target.value) && /[0-9]/.test(e.target.value) && e.target.value.length >= 8) {
                document.getElementById('cpwRg').style.color = '#22c55e';
                document.getElementById('cpwRg').style.borderColor = '#22c55e';
                document.getElementById('cplRg').style.color = '#22c55e';
                e.target.setCustomValidity('');
            } else {
                document.getElementById('cpwRg').style.color = '#e2034b';
                document.getElementById('cpwRg').style.borderColor = '#e2034b';
                document.getElementById('cplRg').style.color = '#e2034b';
                e.target.setCustomValidity('Must have 1 lowercase, 1 uppercase, 1 number, 8 characters or more');
                e.target.reportValidity();
            }
        }
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        setData({ ...data, available: e.target.checked });
    }

    return (
        <form onSubmit={submit} className='p-4 w-1/2 text-white border border-gray-800 bg-[#1c1c1f] shadow-black flex flex-col gap-5 items-center rounded-lg shadow-lg card-gradient'>
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
            <h1 className='p-1 text-2xl font-bold text-white'>Register as a Donor</h1>
            <div className='flex flex-col gap-8 p-8 w-full'>
                <div className='flex relative'>
                    <input id='nameRg' type="text" name="name" value={data.name} onChange={change} className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required/>
                    <label className="labels text-sm rounded-md" htmlFor="nameRg">User Name</label>
                </div>
                <div className='flex gap-4'>
                    <div className='w-1/2 flex relative'>
                        <input id='emailRg' type="email" name="email" value={data.email} placeholder='' onChange={change} className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                        <label id='elRg' className="labels text-sm rounded-md" htmlFor="emailRg">E-mail Address</label>
                    </div>
                    <div className='w-1/2 flex relative'>
                        <input id='cRg' type="tel" name="phoneNumber" value={data.phoneNumber} onChange={change} className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' minLength={8} maxLength={10} required />
                        <label id='clRg' className="labels text-sm rounded-md" htmlFor="cRg">Contact Number</label>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='flex w-1/3 relative'>
                        <select name="gender" onChange={change} id="gRg" title='Your Gender' className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                            <option value="" className='hidden'></option>
                            <option value="male" className='text-gray-800'>Male</option>
                            <option value="female" className='text-gray-800'>Female</option>
                            <option value="others" className='text-gray-800'>Others</option>
                        </select>
                        <label className="labels text-sm rounded-md" htmlFor="gRg">Gender</label>
                    </div>
                    <div className='flex w-1/3 relative'>
                        <input className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none date-input' type="date" id="dobRg" name="dob" value={data.dob}  onChange={change} required />
                        <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 left-4 px-1 bg-[#1c1c1f]" htmlFor="dobRg">Date of Birth</label>
                    </div>
                    <div className='flex w-1/3 relative'>
                        <select id='bRg' name="bloodGroup" value={data.bloodGroup} title='Your Blood Group' onChange={change} className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                            <option value="" className='hidden'></option>
                            <option value="A+" className='text-gray-800'>A+</option>
                            <option value="B+" className='text-gray-800'>B+</option>
                            <option value="O+" className='text-gray-800'>O+</option>
                            <option value="A-" className='text-gray-800'>A-</option>
                            <option value="B-" className='text-gray-800'>B-</option>
                            <option value="O-" className='text-gray-800'>O-</option>
                            <option value="AB+" className='text-gray-800'>AB+</option>
                            <option value="AB-" className='text-gray-800'>AB-</option>
                        </select>
                        <label className="labels text-sm rounded-md" htmlFor="bRg">Blood Group</label>
                    </div>
                </div>
                <div className='flex gap-4 w-full'>
                    <div className='flex w-1/4 relative'>
                        <select name="state" onChange={change} id="stateRg" title='Your State' className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                            <option value="" className='hidden'></option>
                        </select>
                        <label className="labels text-sm rounded-md" htmlFor="stateRg">State</label>
                    </div>
                    <div className='flex w-1/4 relative'>
                        <select name="district" onChange={change} id="districtRg" title='Your District' className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                            <option value="" className='hidden'></option>
                        </select>
                        <label className="labels text-sm rounded-md" htmlFor="districtRg">District</label>
                    </div>
                    <div className='flex w-1/4 relative'>
                        <select name="city" onChange={change} id="cityRg" title='Your City' className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                            <option value="" className='hidden'></option>
                        </select>
                        <label className="labels text-sm rounded-md" htmlFor="cityRg">City</label>
                    </div>
                    <div className='flex w-1/4 relative'>
                        <select name="pin" onChange={change} id="pinRg" title='Your Pincode' className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                            <option value="" className='hidden'></option>
                        </select>
                        <label className="labels text-sm rounded-md" htmlFor="pinRg">Pincode</label>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='flex w-1/2 relative'>
                        <input id='pwRg' type="password" name="password" value={data.password} onChange={change} className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                        <label id='plRg' className="labels text-sm rounded-md" htmlFor="pwRg">Password</label>
                    </div>
                    <div className='flex w-1/2 relative'>
                        <input id='cpwRg' type="password" name="cpassword" value={password} onChange={changeP} className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                        <label id='cplRg' className="labels text-sm rounded-md" htmlFor="cpwRg">Confirm Password</label>
                    </div>
                </div>
                <div className='flex gap-1 items-center'>
                    <input type="checkbox" id="available" checked={isChecked} onChange={handleCheckboxChange} className='accent-cyan-500' />
                    <label htmlFor="available" className='text-white'>Available to Donate ? </label>
                    <div className='text-gray-400 text-sm'>This will allow others to see your contact information.</div>
                </div>
                <button type="submit" className='px-4 w-full py-2 rounded-md hover:shadow-md bg-[#b9003a] text-white hover:bg-[#e2034b]'>Register</button>
            </div>
            <div className='p-2 text-sm text-gray-400'>Already have an account? <Link href={"/login"} className='underline text-white'>Login</Link></div>
        </form>
    )
}

export default Register;
