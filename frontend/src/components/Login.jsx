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
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setProgress(100)
            refresh()
            setTimeout(()=>{push("/allrequest")}, 2000)
        }
    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <div className='p-4 small:px-0 flex flex-col gap-5 items-center bg-gradient-to-r from-[#253d6c] to-[#182e58] overflow-auto bg-[#051a39] rounded-lg shadow-md  shadow-black'>
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
            <h1 className='p-1 text-xl font-bold text-white'>User Login</h1>
            <div className='p-5'>
                <form onSubmit={submit} className='flex flex-col gap-5 p-4'>
                    <div>
                        <input type="email" name="email" autoComplete='username' value={data.email} placeholder='Email Address' onChange={change} className='bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white micro:w-2/3 self-center outline-none' required />
                    </div>
                    <div>
                        <input type="password" name="password" autoComplete='current-password' value={data.password} placeholder='Password' onChange={change} className='bg-transparent py-1 border-b-2 border-cyan-500 placeholder-white text-white micro:w-2/3 self-center outline-none' required />
                    </div>
                    <button type="submit" className='w-full bg-[#b9003a] hover:bg-[#e2034b] shadow-sm text-white font-bold p-3 rounded-lg '>Login</button>
                </form>
            </div>
            <div className='p-5 text-sm text-white'>Don&apos;t have an account? <Link href={"/register"} className='underline'>Register</Link></div>
        </div>
    )
}

export default Login