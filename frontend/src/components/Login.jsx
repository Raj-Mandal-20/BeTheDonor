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
        <div className='p-4 text-white border border-gray-800 bg-[#1c1c1f] shadow-black flex flex-col gap-5 items-center rounded-lg shadow-lg card-gradient'>
            <LoadingBar
                color='#b9003a'
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
                <div className='flex relative'>
                    <input id='emailLog' type="email" name="email" value={data.email} onChange={change} className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                    <label id='elLog' className="labels text-sm rounded-md" htmlFor="emailLog">E-Mail Address</label>
                </div>
                <div className='flex relative'>
                    <input id='pwLog' type="password" name="password" value={data.password} onChange={change} className='block inputs w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                    <label className="labels text-sm rounded-md" htmlFor="pwLog">Password</label>
                </div>
                <button type="submit" className='px-4 w-full py-2 rounded-md hover:shadow-md bg-[#b9003a] text-white hover:bg-[#e2034b]'>Login</button>
            </form>
            <div className='p-2 text-sm text-gray-400'>Don&apos;t have an account? <Link href={"/register"} className='underline text-white'>Register</Link></div>
        </div>
    )
}

export default Login