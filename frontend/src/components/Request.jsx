"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { setCookie } from 'nookies'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

const Request = (props) => {
    const [data, setData] = useState({ name: "", city: "", state: "", zip: "", bloodUnit: "", phoneNumber: "", email: "", timeTag: "" })
    const { push, refresh } = useRouter();
    const [progress, setProgress] = useState(0)

    const submit = async (e) => {
        e.preventDefault();
        setProgress(10)
        let response = await fetch(`${props.HOST}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: data.email, password: data.password })
        });
        setProgress(40)
        const token = await response.json();
        console.log(token);
        setProgress(70)
        if (token.message) {
            toast.error(token.message, {
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
            setCookie(null, "usertoken", token.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            toast.success("Successfully logged in", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(token.token)
            setProgress(100)
            // setTimeout(() => { refresh() }, 100)
            // push("/menu");
        }
    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

        const [isOpen, setIsOpen] = useState(false);
      
        const toggleMenu = () => {
          setIsOpen(!isOpen);
        };

    return (
        <div>

{isOpen && (
        <div id="request" class="h-screen absolute flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 text-white rounded-lg shadow-lg card-gradient">
            <h2 className="text-2xl font-bold mb-2">Donate Blood</h2>
            <p className="mb-4 text-gray-400">Fill out the form to schedule your blood donation.</p>
            <form onSubmit={submit}>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                        <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="name" name="name" placeholder="Enter your name" value={data.name} onChange={change} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
                            <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="city" name="city" placeholder="City" value={data.city} onChange={change} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                            <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="state" name="state" placeholder="State" value={data.state} onChange={change} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="zip">Zip</label>
                            <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="zip" name="zip" placeholder="Zip" value={data.zip} onChange={change} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="bloodUnit">Blood Unit/Group</label>
                            <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="bloodUnit" name="bloodUnit" placeholder="Enter your blood unit/group" value={data.bloodUnit} onChange={change} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">Phone Number</label>
                            <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" value={data.phoneNumber} onChange={change} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="email" id="email" name="email" placeholder="Enter your email" value={data.email} onChange={change} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="timeTag">Time Tag</label>
                        <input className="block w-full px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300" type="text" id="timeTag" name="timeTag" placeholder="Enter time tag" value={data.timeTag} onChange={change} />
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <button className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600" type="submit">Submit</button>
                    <button className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600" type="button">Edit</button>
                </div>
            </form>
            <ToastContainer />
            <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
        </div>
        </div>
        )}
        <button 
        onClick={toggleMenu} 
        className="text-black text-3xl"
      >Click</button>
        </div>
    )
}

export default Request
