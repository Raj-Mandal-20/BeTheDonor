"use client";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import MoonLoader from "react-spinners/MoonLoader";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faEnvelope,
//   faHospital,
//   faBell
// } from "@fortawesome/free-regular-svg-icons";
// import {
//   faPhone,
//   faLocationCrosshairs,
//   faLocationDot
// } from "@fortawesome/free-solid-svg-icons";

const BloodRequest = (props) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const cookies = parseCookies();
  const currentUser = cookies["userId"];
  const createdAt = new Date(props.request.createdAt).toDateString();
  const lastDate = new Date(props.request.deadline).toDateString();
  const [status, setStatus] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    const getUser = await fetch(`${props.HOST}/v1/fetchUserByUserId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies["usertoken"],
      },
      body: JSON.stringify({ userId: props.request.userId }),
    });
    const fetchedUser = await getUser.json();
    setUser(fetchedUser.user);
    const acceptor = await fetch(`${props.HOST}/v1/donor?requestId=${props.request._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies["usertoken"],
      },
    });
    const fetchedAcceptor = await acceptor.json();
    setAccepted(fetchedAcceptor.isDonated);
    let c = new Date();
    let d = new Date(props.request.deadline);
    let year = d.getFullYear() - c.getFullYear();
    let month = d.getMonth() - c.getMonth();
    let day = d.getDate() - c.getDate();
    if (year > 0) {
      setStatus(true)
    } else if (year == 0) {
      if (month > 0) {
        setStatus(true)
      } else if (month == 0) {
        if (day > 0) {
          setStatus(true)
        } else if (day == 0) {
          setStatus(true)
        } else {
          setStatus(false)
        }
      } else {
        setStatus(false)
      }
    } else {
      setStatus(false)
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [props.request]);
  const accept = async (e) => {
    e.preventDefault();
    props.setProgress(10);
    let res = await fetch(`${props.HOST}/v1/donation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies["usertoken"],
      },
      body: JSON.stringify({ requestId: props.request._id }),
    });
    props.setProgress(25);
    const newCard = await res.json();
    if (newCard.bloodRequest) {
      props.setProgress(50);
      props.toast.success(newCard.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      props.setProgress(75);
      props.setDonors({ ...props.donors, [props.request._id]: newCard.bloodRequest.donors?.length });
      setAccepted(true);
      props.setProgress(100);
    } else {
      props.setProgress(50);
      props.toast.error('Failed to accept the request!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      props.setProgress(100)
    }
  };

  return (
    <>
      {loading && (
        <div className={`card bg-[#1c1c1f] shadow-lg shadow-black rounded-lg p-4 h-[658.4px] max-w-lg text-white w-[20rem] ${props.i % 2 === 0 ? 'justify-self-end' : 'justify-self-start'} flex justify-center items-center`}>
          <MoonLoader
            color={"white"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {!loading && (
        <div id={`${props.i}`} className={`card h-fit bg-[#1c1c1f] shadow-xl shadow-black rounded-lg flex flex-col text-white w-[20rem] ${props.i % 2 === 0 ? 'justify-self-end' : 'justify-self-start'} `}>
          <div className="flex flex-col gap-2 items-center w-full bg-[#39393b] p-4">
            <div className="w-full flex justify-end">
              {
                status && (
                  <div className="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-green-600 bg-white text-green-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 -translate-x-1 text-green-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle className="blinkOpen" cx="12" cy="12" r="10"></circle>
                    </svg>
                    Open
                  </div>
                )
              }
              {
                !status && (
                  <div className="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-red-500 bg-white text-red-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 -translate-x-1 text-red-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle className="blinkClose" cx="12" cy="12" r="10"></circle>
                    </svg>
                    Closed
                  </div>
                )
              }
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              <div className="logo-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                  <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                </svg>
              </div>
              <div className="text-2xl font-bold flex text-center">{user.name}</div>
              {accepted || (currentUser == props.request.userId) ?
                <div className="text-xs text-gray-300 flex flex-col gap-1 items-center">
                  <p>{user.email}</p>
                  <p>{user.phoneNumber}</p>
                </div> :
                <div className="text-xs text-gray-300 flex flex-col gap-1 items-center">
                  <p>xxxx@xxx.xxx</p>
                  <p>xxxxx xxxxx</p>
                </div>
              }
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full p-4 text-sm">
            <div className="flex flex-col gap-2 w-full py-4 border-b border-gray-600">
              <div className="flex justify-between items-center">
                <p className="text-gray-300">Center</p>
                <p>{props.request.donationCenter}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-300">State</p>
                <p>{props.request.state}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-300">District</p>
                <p>{props.request.district}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-300">City</p>
                <p>{props.request.city}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-300">Pincode</p>
                <p>{props.request.pin}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full py-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-300">Blood Group</p>
                <p>{props.request.bloodGroup}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-300">Blood Unit</p>
                <p>{props.request.bloodUnit}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-300">Acceptors</p>
                <p>{props.donors[props.request._id]}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-300">Created at</p>
                <p>{createdAt}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-300">Deadline</p>
                <p>{lastDate}</p>
              </div>
            </div>
          </div>
          <div className="flex  w-full">
            {currentUser !== props.request.userId && (
              status ?
                (accepted ?
                  <button className="px-4 py-2 w-full bg-red-300 text-black hover:cursor-not-allowed">Accepted By You</button>
                  :
                  <button onClick={accept} className="px-4 py-2 w-full bg-green-300 text-black hover:bg-green-200">Accept Request</button>
                ) :
                <button className="px-4 py-2 w-full bg-orange-300 text-black hover:cursor-not-allowed">Request Closed</button>
            )}
            {currentUser === props.request.userId && (
              <button className="px-4 py-2 w-full bg-blue-300 text-black hover:cursor-not-allowed">Requested By You</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BloodRequest;
