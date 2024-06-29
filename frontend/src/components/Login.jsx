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
        console.log(res);
        setProgress(70)
        if (data.message) {
            toast.error(res.message, {
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
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(res.token)
            setProgress(100)
            // setTimeout(() => { refresh() }, 100)
            // push("/menu");
        }
    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <div className='p-4, small:px-0 flex flex-col gap-5 items-center bg-gradient-to-r from-[#253d6c] to-[#182e58] overflow-auto bg-[#051a39] rounded-lg shadow-md  shadow-black'>
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
                <form onSubmit={submit} className='flex flex-col gap-3'>
                    <div>
                        <input type="email" name="email" autoComplete='username' value={data.email} placeholder='Email Address' onChange={change} className='bg-slate-200 py-1 px-2 shadow rounded' required />
                    </div>
                    <div>
                        <input type="password" name="password" autoComplete='current-password' value={data.password} placeholder='Password' onChange={change} className='bg-slate-200 py-1 px-2 shadow rounded' required />
                    </div>
                    <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 hover:shadow-blue-200 hover:shadow text-white font-bold p-3 rounded-lg'>Login</button>
                </form>
            </div>
            <div className='p-5 text-sm text-white'>Don&apos;t have an account? <Link href={"/register"} className='underline'>Register</Link></div>
        </div>
    )
}

export default Login