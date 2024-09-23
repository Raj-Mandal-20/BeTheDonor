"use client"

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { register } from '@/app/actions/user';

const Register = (props) => {
    const { push } = useRouter();
    const [progress, setProgress] = useState(0);
    const [password, setPassword] = useState("");
    const [showpassword, setShowpassword] = useState('password');
    const [showcpassword, setShowcpassword] = useState('password');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [disable, setDisable] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
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
    });

    useEffect(() => {
        document.getElementById('stateRg').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('districtRg').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('cityRg').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('pinRg').innerHTML = '<option value="" class="hidden">--select--</option>';
        for (let state in props.data) {
            let option = document.createElement("option");
            option.innerHTML = `${state}`
            option.setAttribute("value", `${state}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("stateRg").appendChild(option)
        }
        setDateRestrictions();
    }, [props.data]);

    const setDateRestrictions = () => {
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 65);
        setMinDate(minDate.toISOString().split('T')[0]);
        const maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() - 18);
        setMaxDate(maxDate.toISOString().split('T')[0]);
    };

    const submit = async (e) => {
        e.preventDefault();
        setDisable(true);
        if (data.password === password) {
            setProgress(10)
            const result = await register(data);
            setProgress(70);
            if (result.message != 'Verification Email Sent Successfully!') {
                toast.error(result.message, {
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
                toast.success(result.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setIsEmailSent(true);
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
            setDisable(false);
        }
    };

    const change = (e) => {
        if (e.target.name === 'name') {
            setData({ ...data, name: e.target.value });
            if (/^[A-Za-z\s]+$/.test(e.target.value)) {
                e.target.setCustomValidity('');
            } else {
                e.target.setCustomValidity('Must have characters and blank spaces only!');
            }
        } else if (e.target.name === 'available') {
            setData({ ...data, available: e.target.checked });
        } else if (e.target.name === 'phoneNumber') {
            setData({ ...data, phoneNumber: e.target.value });
            if (!(/[^0-9]/.test(e.target.value)) && (e.target.value.length == 10 || e.target.value.length == 8)) {
                e.target.setCustomValidity('');
            } else {
                e.target.setCustomValidity('Must have 10 or 8 digits only!');
            }
        } else if (e.target.name === 'password') {
            setData({ ...data, password: e.target.value });
            if (/[A-Z]/.test(e.target.value) && /[a-z]/.test(e.target.value) && /[0-9]/.test(e.target.value) && /[^a-zA-Z0-9]/.test(e.target.value) && !(/[\s]/.test(e.target.value)) && e.target.value.length >= 8) {
                e.target.setCustomValidity('');
            } else {
                e.target.setCustomValidity('Must have 1 lowercase, uppercase, number, special character, no space & 8 characters or more');
            }
        } else if (e.target.name === 'state') {
            setData({ ...data, state: e.target.value, district: '', city: '', pin: '' });
            document.getElementById('districtRg').innerHTML = '<option value="" class="hidden">--select--</option>';
            document.getElementById('cityRg').innerHTML = '<option value="" class="hidden">--select--</option>';
            document.getElementById('pinRg').innerHTML = '<option value="" class="hidden">--select--</option>';
            for (let state in props.data) {
                if (state == e.target.value) {
                    for (let district in props.data[state]) {
                        let option = document.createElement("option");
                        option.innerHTML = `${district}`
                        option.setAttribute("value", `${district}`);
                        option.setAttribute("class", 'text-gray-800');
                        document.getElementById("districtRg").appendChild(option);
                    }
                }
            }
        } else if (e.target.name === 'district') {
            setData({ ...data, district: e.target.value, city: "", pin: "" });
            document.getElementById('cityRg').innerHTML = '<option value="" class="hidden">--select--</option>';
            document.getElementById('pinRg').innerHTML = '<option value="" class="hidden">--select--</option>';
            for (let state in props.data) {
                if (state == data.state) {
                    for (let district in props.data[state]) {
                        if (district == e.target.value) {
                            for (let city in props.data[state][district]) {
                                let option1 = document.createElement("option");
                                option1.innerHTML = `${city}`;
                                option1.setAttribute("value", `${city}`);
                                option1.setAttribute("class", 'text-gray-800');
                                document.getElementById("cityRg").appendChild(option1);
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
                                document.getElementById("pinRg").appendChild(option2);
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
                                    document.getElementById("pinRg").value = zip;
                                    setData({ ...data, city: e.target.value, pin: zip });
                                }
                            }
                        }
                    }
                }
            }
        } else if (e.target.name === 'pin') {
            setData({ ...data, pin: e.target.value });
            document.getElementById('cityRg').innerHTML = `<option value="" class="hidden">--select--</option>`;
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
                                    document.getElementById("cityRg").appendChild(option);
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
        document.getElementById('stateRg').value = '';
        document.getElementById('districtRg').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('cityRg').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('pinRg').innerHTML = '<option value="" class="hidden">--select--</option>';
        setData({ ...data, state: '', district: '', city: '', pin: '' });
    };

    const clearDistrict = () => {
        document.getElementById('districtRg').value = '';
        document.getElementById('cityRg').innerHTML = '<option value="" class="hidden">--select--</option>';
        document.getElementById('pinRg').innerHTML = '<option value="" class="hidden">--select--</option>';
        setData({ ...data, district: '', city: '', pin: '' });
    };

    const clearCity = () => {
        document.getElementById('pinRg').value = '';
        setData({ ...data, city: '', pin: '' });
        document.getElementById('cityRg').innerHTML = `<option value="" class="hidden">--select--</option>`;
        for (let state in props.data) {
            if (state == data.state) {
                for (let district in props.data[state]) {
                    if (district == data.district) {
                        for (let city in props.data[state][district]) {
                            let option = document.createElement("option");
                            option.innerHTML = `${city}`;
                            option.setAttribute("value", `${city}`);
                            option.setAttribute("class", 'text-gray-800');
                            document.getElementById("cityRg").appendChild(option);
                        }
                    }
                }
            }
        }
    };

    const clearPin = () => {
        document.getElementById('pinRg').value = '';
        setData({ ...data, pin: '' });
        document.getElementById('cityRg').innerHTML = `<option value="" class="hidden">--select--</option>`;
        for (let state in props.data) {
            if (state == data.state) {
                for (let district in props.data[state]) {
                    if (district == data.district) {
                        for (let city in props.data[state][district]) {
                            let option = document.createElement("option");
                            option.innerHTML = `${city}`;
                            option.setAttribute("value", `${city}`);
                            option.setAttribute("class", 'text-gray-800');
                            document.getElementById("cityRg").appendChild(option);
                        }
                    }
                }
            }
        }
    };

    const changeP = (e) => {
        setPassword(e.target.value)
        if (e.target.name === 'cpassword') {
            if (/[A-Z]/.test(e.target.value) && /[a-z]/.test(e.target.value) && /[0-9]/.test(e.target.value) && /[^a-zA-Z0-9]/.test(e.target.value) && !(/[\s]/.test(e.target.value)) && e.target.value.length >= 8) {
                // document.getElementById('cpwRg').style.color = '#22c55e';
                // document.getElementById('cpwRg').style.borderColor = '#22c55e';
                // document.getElementById('cplRg').style.color = '#22c55e';
                // document.getElementById('cpeye').style.color = '#22c55e';
                // document.getElementById('cpeye').style.borderColor = '#22c55e';
                // document.getElementById('cpeye').style.color = '#22c55e';
                e.target.setCustomValidity('');
            } else {
                // document.getElementById('cpwRg').style.color = '#e2034b';
                // document.getElementById('cpwRg').style.borderColor = '#e2034b';
                // document.getElementById('cplRg').style.color = '#e2034b';
                // document.getElementById('cpeye').style.color = '#e2034b';
                // document.getElementById('cpeye').style.borderColor = '#e2034b';
                // document.getElementById('cpeye').style.color = '#e2034b';
                e.target.setCustomValidity('Must have 1 lowercase, 1 uppercase, 1 number, 8 characters or more');
                // e.target.reportValidity();
            }
        }
    }

    const showp = () => {
        setShowpassword('text');
        document.getElementById('showpr').style.display = 'none';
        document.getElementById('hidepr').style.display = 'block';
    };
    const hidep = () => {
        setShowpassword('password');
        document.getElementById('showpr').style.display = 'block';
        document.getElementById('hidepr').style.display = 'none';
    };
    const showcp = () => {
        setShowcpassword('text');
        document.getElementById('showcpr').style.display = 'none';
        document.getElementById('hidecpr').style.display = 'block';
    };
    const hidecp = () => {
        setShowcpassword('password');
        document.getElementById('showcpr').style.display = 'block';
        document.getElementById('hidecpr').style.display = 'none';
    };

    return (
        <form onSubmit={submit} className='p-4 w-1/2 text-white border border-gray-800 bg-[#1c1c1f] shadow-black flex flex-col gap-5 items-center rounded-lg shadow-lg'>
            <LoadingBar
                color='#b9003a'
                progress={progress}
                height={4}
                onLoaderFinished={() => setProgress(0)}
            />
            <h1 className='pt-4 text-2xl font-bold text-white'>Register as a Donor</h1>
            <div className='flex flex-col gap-8 p-8 w-full'>
                <div className='flex relative'>
                    <input id='nameRg' type="text" name="name" value={data.name} onChange={change} className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                    <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="nameRg">User Name</label>
                </div>
                <div className='flex gap-4'>
                    <div className='w-1/2 flex relative'>
                        <input id='emailRg' type="email" name="email" value={data.email} onChange={change} className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                        <label id='elRg' className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="emailRg">E-mail Address</label>
                    </div>
                    <div className='w-1/2 flex relative'>
                        <input id='cRg' type="tel" name="phoneNumber" value={data.phoneNumber} onChange={change} className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' maxLength={10} required />
                        <label id='clRg' className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="cRg">Contact Number</label>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='flex w-1/3 relative'>
                        <select name="gender" onChange={change} id="gRg" title='Your Gender' className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                            <option value="" className='hidden'>--select--</option>
                            <option value="male" className='text-gray-800'>Male</option>
                            <option value="female" className='text-gray-800'>Female</option>
                            <option value="others" className='text-gray-800'>Others</option>
                        </select>
                        <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="gRg">Gender</label>
                    </div>
                    <div className='flex w-1/3 relative'>
                        <input className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none date-input ' type="date" id="dobRg" name="dob" value={data.dob} min={minDate} max={maxDate} onChange={change} required />
                        <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 left-4 px-1 bg-[#1c1c1f]" htmlFor="dobRg">Date of Birth</label>
                    </div>
                    <div className='flex w-1/3 relative'>
                        <select id='bRg' name="bloodGroup" value={data.bloodGroup} title='Your Blood Group' onChange={change} className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required>
                            <option value="" className='hidden'>--select--</option>
                            <option value="A+" className='text-gray-800'>A+</option>
                            <option value="B+" className='text-gray-800'>B+</option>
                            <option value="O+" className='text-gray-800'>O+</option>
                            <option value="A-" className='text-gray-800'>A-</option>
                            <option value="B-" className='text-gray-800'>B-</option>
                            <option value="O-" className='text-gray-800'>O-</option>
                            <option value="AB+" className='text-gray-800'>AB+</option>
                            <option value="AB-" className='text-gray-800'>AB-</option>
                        </select>
                        <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="bRg">Blood Group</label>
                    </div>
                </div>
                <div className='flex gap-4 w-full'>
                    <div className='flex w-1/4 relative'>
                        <select name="state" onChange={change} id="stateRg" title='Your State' className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none rounded-r-none border-r-0' required>
                        </select>
                        <button title="Clear State" onClick={clearState} className='border-2 border-solid border-gray-400 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="stateRg">State</label>
                    </div>
                    <div className='flex w-1/4 relative'>
                        <select name="district" onChange={change} id="districtRg" title='Your District' className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none rounded-r-none border-r-0' required>
                        </select>
                        <button title="Clear District" onClick={clearDistrict} className='border-2 border-solid border-gray-400 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="districtRg">District</label>
                    </div>
                    <div className='flex w-1/4 relative'>
                        <select name="city" onChange={change} id="cityRg" title='Your City' className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none rounded-r-none border-r-0' required>
                        </select>
                        <button title="Clear City" onClick={clearCity} className='border-2 border-solid border-gray-400 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="cityRg">City</label>
                    </div>
                    <div className='flex w-1/4 relative'>
                        <select name="pin" onChange={change} id="pinRg" title='Your Pincode' className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none rounded-r-none border-r-0' required>
                        </select>
                        <button title="Clear Pincode" onClick={clearPin} className='border-2 border-solid border-gray-400 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="pinRg">Pincode</label>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='flex w-1/2 relative'>
                        <input id='pwRg' type={showpassword} name="password" value={data.password} onChange={change} className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none border-r-0 rounded-r-none' required />
                        <div className='flex border-2 border-solid border-gray-400 rounded-md rounded-l-none border-l-0 items-center px-4' id='peye'>
                            <FontAwesomeIcon icon={faEye} id='showpr' onClick={showp} />
                            <FontAwesomeIcon icon={faEyeSlash} className='hidden' id='hidepr' onClick={hidep} />
                        </div>
                        <label id='plRg' className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="pwRg">Password</label>
                    </div>
                    <div className='flex w-1/2 relative'>
                        <input id='cpwRg' type={showcpassword} name="cpassword" value={password} onChange={changeP} className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none border-r-0 rounded-r-none' required />
                        <div className='flex border-2 border-solid border-gray-400 rounded-md rounded-l-none border-l-0 items-center px-4' id='cpeye'>
                            <FontAwesomeIcon icon={faEye} id='showcpr' onClick={showcp} />
                            <FontAwesomeIcon icon={faEyeSlash} className='hidden' id='hidecpr' onClick={hidecp} />
                        </div>
                        <label id='cplRg' className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="cpwRg">Confirm Password</label>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='flex gap-1 items-center'>
                        <input type="checkbox" id="available" name='available' checked={data.available} onChange={change} className='accent-cyan-500' />
                        <label htmlFor="available" className='text-white'>Available to Donate ? </label>
                    </div>
                    <div className='text-gray-400 text-sm'>This will allow others to see your contact information.</div>
                </div>
                <button disabled={disable} type="submit" className={`px-4 py-2 w-full rounded-md text-white hover:shadow-md ${disable? isEmailSent? 'bg-green-700 cursor-not-allowed' : 'bg-[#48484a] cursor-wait' : 'bg-[#b9003a] hover:bg-[#e2034b]'}`}>{disable? isEmailSent? 'E-Mail Sent' : 'Processing' : 'Register'}</button>
            </div>
            <div className='p-2 text-sm text-gray-400'>Already have an account? <Link href={"/login"} className='underline text-white'>Login</Link></div>
        </form>
    )
}

export default Register;
