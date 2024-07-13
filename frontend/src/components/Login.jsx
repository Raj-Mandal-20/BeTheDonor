"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { setCookie } from 'nookies'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

const Login = (props) => {
    const [data, setData] = useState({ "email": "", "password": "" })
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
        const res = await response.json();
        setProgress(70)
        if (res.message) {
            toast.error(res.message, {
                position: "top-center",
                autoClose: 1000,
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
            setCookie(null, "usertoken", res.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            setCookie(null, "userId", res.userId, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            toast.success("Successfully logged in", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setProgress(100)
            setTimeout(() => { refresh() }, 3000)
            setTimeout(() => { push("/allrequest") }, 2000)
        }
    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <div className='p-4 text-white flex flex-col gap-5 items-center rounded-lg shadow-lg card-gradient'>
            <LoadingBar
                color='#3b82f6'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <h1 className='p-1 text-2xl font-bold text-white'>User Login</h1>
            <form onSubmit={submit} className='flex flex-col gap-5 p-5'>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="emailLog">E-Mail</label>
                    <input id='emailLog' type="email" name="email" value={data.email} placeholder='Enter Your Email Address' onChange={change} className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="pwLog">Password</label>
                    <input id='pwLog' type="password" name="password" value={data.password} placeholder='Enter Your Password' onChange={change} className='block w-full outline-cyan-500 px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300' required />
                </div>
                <button type="submit" className='px-4 w-full py-2 rounded-md hover:shadow-md bg-[#b9003a] text-white hover:bg-[#e2034b]'>Login</button>
            </form>
            <div className='p-3 text-sm text-white'>Don&apos;t have an account? <Link href={"/register"} className='underline'>Register</Link></div>
        </div>
    )
}

export default Login