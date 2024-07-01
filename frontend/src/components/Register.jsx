
"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
// import { setCookie } from 'nookies'
import Link from 'next/link'
// import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

const Register = (props) => {
    const [progress, setProgress] = useState(0)
    const [password, setPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false);
    const { push, refresh } = useRouter();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        state: "",
        district: "",
        city: "",
        pin: "",
        phoneNumber: "",
        available: false,
        bloodGroup: ""

    })

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
    }

    const changeP = (e) => {
        setPassword(e.target.value)
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        setData({ ...data, available: e.target.checked });
    }

    return (
        <form onSubmit={submit} className='p-4 small:px-0 flex flex-col gap-5 items-center bg-gradient-to-r from-[#253d6c] to-[#182e58] overflow-auto rounded-lg shadow-md  shadow-black'>
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
            <h1 className='p-1 text-xl font-bold text-white'>Register as a Donor</h1>
            <div className='flex flex-col gap-5 p-5 small:p-2'>

                <div className='flex gap-5'>

                    <input type="text" name="name" value={data.name} placeholder='Name' onChange={change} className='bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white micro:w-2/3 self-center outline-none' required />

                    <input type="email" name="email" value={data.email} placeholder='Email' onChange={change} className='bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white micro:w-2/3 self-center outline-none' required />
                </div>

                {/* <input type="text" name="fname" value={data.fname} placeholder='First Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' required />
                    <input type="text" name="fname" value={data.fname} placeholder='First Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' required /> */}


                <div className='flex gap-5'>

                    <input type="text" name="state" value={data.state} placeholder='State' onChange={change} className='bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white micro:w-2/3 self-center outline-none' required />
                    <input type="text" name="district" value={data.district} placeholder='District' onChange={change} className='bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white micro:w-2/3 self-center outline-none' required />
                </div>
                <div className='flex gap-5'>
                    <input type="text" name="city" value={data.city} placeholder='City' onChange={change} className='bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white micro:w-2/3 self-center outline-none' required />

                    <input type="text" name="pin" value={data.pin} placeholder='Pincode' onChange={change} className='bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white micro:w-2/3 self-center outline-none' required />
                </div>
                <div className='flex gap-5'>
                    <input type="text" name="phoneNumber" value={data.phoneNumber} placeholder='Contact Number' onChange={change} className='bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white micro:w-2/3 self-center outline-none' required />

                    <select name="bloodGroup" value={data.bloodGroup} onChange={change} className='w-1/2 bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white outline-none'>
                        <option value="" className='bg-blue-900'>Select Blood Group</option>
                        <option value="A+" className='bg-blue-900'>A+</option>
                        <option value="B+" className='bg-blue-900'>B+</option>
                        <option value="O+" className='bg-blue-900'>O+</option>
                        <option value="A-" className='bg-blue-900'>A-</option>
                        <option value="B-" className='bg-blue-900'>B-</option>
                        <option value="O-" className='bg-blue-900'>O-</option>
                        <option value="AB+" className='bg-blue-900'>AB+</option>
                        <option value="AB-" className='bg-blue-900'>AB-</option>
                    </select>

                </div>
                <div className='flex gap-5'>
                    <input type="password" name="password" value={data.password} placeholder='Password' onChange={change} className='bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white micro:w-2/3 self-center outline-none' required />

                    <input type="password" name="cpassword" value={password} placeholder='Confirm Password' onChange={changeP} className='bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white micro:w-2/3 self-center outline-none' required />

                </div>

                {/* <div className="form-group col-md-4">
                    {/* <label for="state">State</label>
                    <select className="form-control" id="state" name='state'>
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
                <div className="form-group col-md-4">
                    <label for="inputDistrict">District</label>
                    <select className="form-control" id="inputDistrict" name='district'>
                        <option value="">-- select one -- </option>
                    </select>
                </div> */}

                <div className='flex gap-2'>
                    <input type="checkbox" id="available" checked={isChecked} onChange={handleCheckboxChange} />
                    <label htmlFor="available" className='text-white'>Available to Donate ? </label>
                </div>
                <div className='text-gray-300'>This will allow others to see your contact information.</div>

                <button type="submit" className='w-full bg-[#b9003a] hover:bg-[#e2034b] shadow-sm text-white font-bold p-3 rounded-lg '>Register</button>
            </div>
            <div className='p-5 text-sm text-white'>Already have an account? <Link href={"/login"} className='underline text-white'>Login</Link></div>
        </form>
    )
}

export default Register;
