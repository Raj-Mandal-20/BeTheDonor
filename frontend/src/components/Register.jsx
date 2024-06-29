
"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { setCookie } from 'nookies'
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
// import {allStates, allDistricts} from "state-district-component";

const Register = (props) => {
    const [progress, setProgress] = useState(0)
    const [password, setPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false);
    // const getStateValue = (value) => {
    //     // for geting  the input value pass the function in oChnage props and you will get value back from component
    //     setState(value);
    //   };
    //   const getDistrictValue = (value) => {
    //     setDistrict(value);
    //   };
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        state: "",
        district: "",
        city: "",
        pin: "",
        contact: "",
        available: true,
        bloodGroup: ""

    })
    const { push, refresh } = useRouter();

    const submit = async (e) => {
        e.preventDefault();
        console.log(password)
        console.log(data)
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
            const token = await response.json();
            setProgress(70)
            if (token.error) {
                toast.error('User with same email id already exists', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setProgress(100)
            }
            else {
                setCookie(null, "usertoken", token.userToken, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                })
                toast.success("Successfully signed in", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setProgress(100)
                setTimeout(() => { refresh() }, 100)
                // push("/menu");
            }
        } else {
            toast.error('Passwords do not page', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const changeP = (e) => {
        setPassword(e.target.value)
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        setData({ ...data, available: e.target.checked });
    }

    // function checkValue() {
    //     var checkbox = document.getElementById("myCheckbox");
    // }

    //     var stateDistricts = {
    //         "Andra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Prakasam", "Nellore", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"],
    //         "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kra Daadi", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Namsai", "Papum Pare", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Itanagar"],
    //         // Add other states and their respective districts here...
    //     };

    //     document.getElementById('state')?.addEventListener('change', function () {
    //         var stateSelected = this.value;
    //         var districtSelect = document.getElementById('inputDistrict');
    //         districtSelect.innerHTML = "";

    //         if (stateDistricts[stateSelected]) {
    //             var optionsList = stateDistricts[stateSelected];
    //             optionsList.forEach(function (district) {
    //                 var option = document.createElement('option');
    //                 option.value = district;
    //                 option.text = district;
    //                 districtSelect.appendChild(option);
    //             });
    //         } else {
    //             var defaultOption = document.createElement('option');
    //             defaultOption.value = "";
    //             defaultOption.text = "-- select one --";
    //             districtSelect.appendChild(defaultOption);
    //         }
    //     });

    // // const 

    return (
        <form onSubmit={submit} className='p-4 small:px-0 flex flex-col gap-5 items-center bg-gradient-to-r from-[#253d6c] to-[#182e58] overflow-auto bg-[#051a39] rounded-lg shadow-md  shadow-black'>
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
                theme="light"
            />
            <h1 className='p-1 text-xl font-bold text-white'>Register as a Donor</h1>
            <div className='flex flex-col gap-4 p-5 small:p-2'>

                <div className='flex gap-2'>

                <input type="text" name="name" value={data.name} placeholder='Name' onChange={change} className='bg-slate-200 p-1 shadow text-black  rounded micro:w-2/3 self-center ' required />

            <input type="email" name="email" value={data.email} placeholder='Email' onChange={change} className='bg-slate-200 p-1 shadow rounded micro:w-2/3 self-center' required />
                </div>

                    {/* <input type="text" name="fname" value={data.fname} placeholder='First Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' required />
                    <input type="text" name="fname" value={data.fname} placeholder='First Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' required /> */}


                <div className='flex gap-2'>

                    <input type="text" name="state" value={data.state} placeholder='State' onChange={change} className='bg-slate-200 p-1 shadow rounded micro:w-2/3 self-center' required />
                    <input type="text" name="district" value={data.district} placeholder='District' onChange={change} className='bg-slate-200 p-1 shadow rounded micro:w-2/3 self-center' required />
                </div>
                <div className='flex gap-2'>
                    <input type="text" name="city" value={data.city} placeholder='City' onChange={change} className='bg-slate-200 p-1 shadow rounded micro:w-2/3 self-center ' required />

                    <input type="text" name="pin" value={data.pin} placeholder='Pincode' onChange={change} className='bg-slate-200 p-1 shadow rounded micro:w-2/3 self-center ' required />
                </div>
                <div className='flex gap-2'>
                <input type="tel" name="contact" value={data.contact} placeholder='Contact Number' onChange={change} className='bg-slate-200 p-1 shadow rounded micro:w-2/3 self-center ' required />

                        <select name="bloodGroup" id="bg" value={data.bloodGroup} onChange={change} className='w-1/2'>
                        <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="B+">B+</option>
                            <option value="O+">O+</option>
                            <option value="A-">A-</option>
                            <option value="B-">B-</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>

                </div>
                <div className='flex gap-2'>
                    <input type="password" name="password" value={data.password} placeholder='Password' onChange={change} className='bg-slate-200 p-1 shadow rounded micro:w-2/3 self-center ' required />

                    <input type="password" name="cpassword" value={password} placeholder='Confirm Password' onChange={changeP} className='bg-slate-200 p-1 shadow rounded micro:w-2/3 self-center ' required />

                </div>

                {/* <div class="form-group col-md-4">
                    {/* <label for="state">State</label>
                    <select class="form-control" id="state" name='state'>
                        <option value="SelectState">Select State</option>
                        <option value="Andra Pradesh">Andra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madya Pradesh">Madya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Orissa">Orissa</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttaranchal">Uttaranchal</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                        <option disabled style="background-color:#aaa; color:#fff">UNION Territories</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadeep">Lakshadeep</option>
                        <option value="Pondicherry">Pondicherry</option>
                    </select> */}
                {/* <States onChange={getStateValue} />
                    <Districts state={state} onChange={getDistrictValue} /> */}
                {/* </div>
                <div class="form-group col-md-4">
                    <label for="inputDistrict">District</label>
                    <select class="form-control" id="inputDistrict" name='district'>
                        <option value="">-- select one -- </option>
                    </select>
                </div> */}

<div className='flex gap-2'>
            <input type="checkbox" id="available" checked={isChecked} onChange={handleCheckboxChange} />
            <label htmlFor="available" className='text-white'>Available to Donate ? </label>
        </div>
            <div className='text-gray-300'>This will allow others to see your contact information.</div>

            <button type="submit" className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 hover:shadow-blue-200 hover:shadow-sm text-white font-bold p-3 rounded-lg '>Sign Up</button>
            </div>
            <div className='p-5 text-sm text-white'>Already have an account? <Link href={"/login"} className='underline text-white'>Login</Link></div>
        </form>
    )
}

export default Register;
