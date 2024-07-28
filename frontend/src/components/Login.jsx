"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { setCookie } from 'nookies'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEye,
    faEyeSlash
} from "@fortawesome/free-regular-svg-icons";

const Login = (props) => {
    const [data, setData] = useState({ "email": "", "password": "" })
    const { push, refresh } = useRouter();
    const [progress, setProgress] = useState(0);
    const [showpassword, setShowpassword] = useState('password');

    const submit = async (e) => {
        document.getElementById('sbLog').disabled = true;
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
            document.getElementById('sbLog').disabled = false;
            setProgress(100);
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

    const showp = () => {
        setShowpassword('text');
        document.getElementById('showplog').style.display = 'none';
        document.getElementById('hideplog').style.display = 'block';
    };
    const hidep = () => {
        setShowpassword('password');
        document.getElementById('showplog').style.display = 'block';
        document.getElementById('hideplog').style.display = 'none';
    };

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <div className='p-4 text-white border w-1/4 border-gray-800 bg-[#1c1c1f] shadow-black flex flex-col gap-5 items-center rounded-lg shadow-lg card-gradient'>
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
            <form onSubmit={submit} className='flex flex-col gap-5 p-5 w-full'>
                <div className='flex relative'>
                    <input id='emailLog' type="email" name="email" value={data.email} onChange={change} className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                    <label id='elLog' className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="emailLog">E-Mail Address</label>
                </div>
                <div className='flex relative w-full'>
                    <input id='pwLog' type={showpassword} name="password" value={data.password} onChange={change} className='block w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none border-r-0 rounded-r-none' required />
                    <div className='flex border-2 border-solid border-gray-400 rounded-md rounded-l-none border-l-0 items-center px-4' id='peye'>
                        <FontAwesomeIcon icon={faEye} id='showplog' onClick={showp} />
                        <FontAwesomeIcon icon={faEyeSlash} className='hidden' id='hideplog' onClick={hidep} />
                    </div>
                    <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="pwLog">Password</label>
                </div>
                <button id='sbLog' type="submit" className='px-4 w-full py-2 rounded-md hover:shadow-md bg-[#b9003a] text-white hover:bg-[#e2034b]'>Login</button>
            </form>
            <div className='p-2 text-sm text-gray-400'>Don&apos;t have an account? <Link href={"/register"} className='underline text-white'>Register</Link></div>
        </div>
    )
}

export default Login