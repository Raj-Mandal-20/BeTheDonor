"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
import { createSession } from "../app/actions/auth";
import { login } from '@/app/actions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { forgetPassword } from '@/app/actions/user';

const Login = () => {
    const [data, setData] = useState({ "email": "", "password": "" })
    const [progress, setProgress] = useState(0);
    const [showpassword, setShowpassword] = useState('password');
    const [pending, setPending] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const { push } = useRouter();

    const submit = async (e) => {
        try {
            e.preventDefault();
            setPending(true);
            setProgress(10);
            const res = await login(data.email, data.password);
            setProgress(70);
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
                setPending(false);
                setProgress(100);
            }
            else {
                const responseAfterSettingCookie = await createSession(res.token);
                setProgress(85);
                if (responseAfterSettingCookie.statusCode === 200) {
                    toast.success(responseAfterSettingCookie.message, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setIsLoggedIn(true);
                    setProgress(100);
                    push("/allrequests");
                } else {
                    toast.error(responseAfterSettingCookie.message, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setPending(false);
                    setProgress(100);
                }
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setPending(false);
            setProgress(100);
        }
    };

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
    };

    const changeEmail = (e) => {
        setEmail(e.target.value);
    };

    const submitEmail = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setProgress(10);
        const response = await forgetPassword(email);
        setProgress(70);
        if (response.statusCode === 200) {
            toast.success(`Link has been sent to the given e-mail address!`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setProgress(100);
            setDisabled(false);
            setOpenModal(false);
        } else {
            toast.error(response.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setProgress(100);
            setDisabled(false);
        }
    };

    return (
        <div className='flex flex-col relative min-h-screen w-full'>
            <LoadingBar
                color='#b9003a'
                progress={progress}
                height={4}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className='h-screen overflow-auto w-full items-start p-12 flex justify-center'>
                <div className='p-4 text-white border w-[30%] border-gray-800 bg-[#1c1c1f] shadow-black flex flex-col gap-5 items-center rounded-lg shadow-lg'>
                    <h1 className='pt-4 text-2xl font-bold text-white'>User Login</h1>
                    <form onSubmit={submit} className='flex flex-col gap-5 p-5 w-full'>
                        <div className='flex relative'>
                            <input id='emailLog' type="email" name="email" value={data.email} onChange={change} className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                            <label id='elLog' className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="emailLog">E-Mail Address</label>
                        </div>
                        <div className='flex relative w-full'>
                            <input id='pwLog' type={showpassword} name="password" value={data.password} onChange={change} className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none border-r-0 rounded-r-none' required />
                            <div className='flex border-2 border-solid border-gray-400 rounded-md rounded-l-none border-l-0 items-center px-4' id='peye'>
                                <FontAwesomeIcon icon={faEye} id='showplog' onClick={showp} />
                                <FontAwesomeIcon icon={faEyeSlash} className='hidden' id='hideplog' onClick={hidep} />
                            </div>
                            <label className="text-sm rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="pwLog">Password</label>
                        </div>
                        <div className='flex justify-end'>
                            <p onClick={() => { setOpenModal(true); }} className='text-sm cursor-pointer text-gray-400 hover:text-white'>Forgot Password?</p>
                        </div>
                        <button disabled={pending} id='sbLog' type="submit" className={`px-4 w-full py-2 rounded-md hover:shadow-md text-white ${pending ? isLoggedIn ? 'bg-green-700 cursor-not-allowed' : 'bg-[#48484a] cursor-wait' : 'bg-[#b9003a] hover:bg-[#e2034b]'}`}>
                            {pending ? isLoggedIn ? 'Logged In' : 'Processing...' : 'Login'}
                        </button>
                    </form>
                    <div className='p-2 text-sm text-gray-400'>Don&apos;t have an account? <Link href={"/register"} className='underline text-white'>Register</Link></div>
                </div>
            </div>
            <div className={`absolute h-screen w-full overflow-auto z-20 bg-[#161618] bg-opacity-80 ${openModal ? 'flex justify-center items-start p-16' : 'hidden'}`}>
                <div className="flex flex-col gap-4 bg-[#1c1c1f] shadow-lg shadow-black rounded-md p-8 w-[30%] h-fit">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-white text-xl">Reset Password</p>
                        <button disabled={disabled} title="Close This Modal" onClick={() => { setOpenModal(false); }} className={`${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-white hover:text-gray-300'} text-lg`}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                    <p className="text-gray-400 text-sm">Enter the valid e-mail address to get the link to reset the password.</p>
                    <form onSubmit={submitEmail} className="flex flex-col gap-4">
                        <div className='flex relative'>
                            <input id='emailLog-fp' type="email" name="email-fp" value={email} onChange={changeEmail} className='w-full px-4 py-2 rounded-md bg-transparent text-white border-2 border-solid border-gray-400 outline-none' required />
                            <label id='elLog-fp' className="text-sm text-white rounded-md absolute top-0 -translate-y-1/2 bg-[#1c1c1f] px-1 left-4" htmlFor="emailLog-fp">E-Mail Address</label>
                        </div>
                        <button disabled={disabled} type="submit" className={`${disabled ? 'bg-[#48484a] cursor-wait' : 'bg-[#b9003a] hover:bg-[#e2034b]'} text-white px-4 py-2 rounded-md`}>{disabled ? 'Processing...' : 'Submit E-mail'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login