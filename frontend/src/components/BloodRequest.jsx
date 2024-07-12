"use client";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import MoonLoader from "react-spinners/MoonLoader";
import LoadingBar from 'react-top-loading-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faHospital,
  faBell
} from "@fortawesome/free-regular-svg-icons";
import {
  faPhone,
  faLocationCrosshairs,
  faLocationDot,
  faHandHoldingDroplet
} from "@fortawesome/free-solid-svg-icons";

const BloodRequest = (props) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const cookies = parseCookies();
  const currentUser = cookies["userId"];
  const createdAt = new Date(props.request.createdAt).toDateString();
  const lastDate = new Date(props.request.deadline).toDateString();
  const [donors, setDonors] = useState(props.request.donors?.length);
  const [status, setStatus] = useState(true);
  const [progress, setProgress] = useState(0)

  const fetchUser = async () => {
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
    for (let acceptor of props.request.donors) {
      if (acceptor == currentUser) {
        setAccepted(true)
      }
    }
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
    console.log("finish")
  };

  useEffect(() => {
    // return () => {
    //   console.log("start")
    //   fetchUser();
    // };
    fetchUser();
  }, []);
  // cookies, currentUser, props.HOST, props.request.deadline, props.request.donors, props.request.userId

  const accept = async (e) => {
    e.preventDefault();
    setProgress(10);
    let res = await fetch(`${props.HOST}/v1/donation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies["usertoken"],
      },
      body: JSON.stringify({ requestId: props.request._id }),
    });
    setProgress(25);
    const newCard = await res.json();
    if (newCard.bloodRequest) {
      setProgress(50);
      setProgress(75);
      setDonors(newCard.bloodRequest.donors?.length);
      setAccepted(true);
      setProgress(100);
    } else {
      setProgress(50);
      setProgress(100)
    }
  };

  return (
    <>
      <LoadingBar
        color='#3b82f6'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {loading && (

        <div className="card h-fit rounded-lg p-6 w-full max-w-lg shadow-sm text-white flex justify-center items-center">
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
        <div className="card h-fit rounded-lg hover:-translate-y-1 p-6 w-full max-w-lg shadow-xl text-white">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex items-center">
              <div className="logo-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
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
              <div className="flex flex-col">
                <h3 className="text-xl font-bold ml-3">{user.name}</h3>
                {accepted ?
                  <h4 className="text-sm text-gray-300 ml-3 flex gap-2 items-center">
                    <div className="flex gap-1 items-center">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <p>{user.email},</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <FontAwesomeIcon icon={faPhone} />
                      <p>{user.phoneNumber}</p>
                    </div>
                  </h4> :
                  <h4 className="text-sm text-gray-300 ml-3 flex gap-2 items-center invisible">
                    <div className="flex gap-1 items-center">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <p>{user.email},</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <FontAwesomeIcon icon={faPhone} />
                      <p>{user.phoneNumber}</p>
                    </div>
                  </h4>
                }
              </div>
            </div>
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
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-col gap-2 items-start">
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faHospital} />
                <p>Donation Center</p>
              </div>
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faLocationDot} />
                <p>District, {props.request.state}</p>
              </div>
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faLocationCrosshairs} />
                <p>{props.request.city}, {props.request.pin}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faHandHoldingDroplet} />
                <p>{props.request.bloodGroup}</p>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#e7eded]"
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
                <span className="text-xl font-bold">
                  {props.request.bloodUnit}
                </span>
                <span className="text-gray-300">Unit(s)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span className="text-xl font-bold">{donors}</span>
                <span className="text text-gray-300">Acceptor(s)</span>
              </div>
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faBell} />
                <p>{lastDate}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <div>
              {currentUser !== props.request.userId && (
                status ?
                  (accepted ?
                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-300 text-black font-extrabold">
                      Allready Accecpted By You
                    </div> :
                    <button
                      onClick={accept}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-black hover:bg-gray-300 font-extrabold"
                    >
                      Accept Request
                    </button>) :
                  <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-300 text-black font-extrabold">
                    Request Closed
                  </div>
              )}
              {currentUser === props.request.userId && (
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-300 text-black font-extrabold">
                  Requested By You
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span className="text-sm">{createdAt}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BloodRequest;
