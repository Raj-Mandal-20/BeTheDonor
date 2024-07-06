"use client";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import MoonLoader from "react-spinners/MoonLoader";

const BloodRequest = (props) => {
  const [user, setUser] = useState({});
  console.log(props);
  const [loading, setLoading] = useState(true);

  const cookies = parseCookies();
  const createdAt = new Date(props.request.createdAt).toDateString();
  const currentUser = cookies["userId"];

  const [donors, setDonors] = useState(props.request.donors?.length);

  useEffect(() => {
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
      console.log(fetchedUser);
      setUser(fetchedUser.user);
      setLoading(false);
    };
    return () => {
      fetchUser();
    };
  }, [props.HOST, cookies, props.request.userId, user]);

  const submit = async (e) => {
    e.preventDefault();
    let donation = await fetch(`${props.HOST}/v1/donation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies["usertoken"],
      },
      body: JSON.stringify({ requestId: props.request._id }),
    });
    const res = await donation.json();
    console.log(res);
    console.log("Response Object");
    console.log(res.bloodRequest.donors?.length);
    setDonors(res.bloodRequest.donors?.length);
  };

  return (
    <>
      {loading && (
         <div className="card h-fit rounded-lg border p-6 w-full max-w-lg shadow-sm text-white flex justify-center items-center">
          <div className="h-[120px]"> </div>
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
        <div className="card h-fit rounded-lg border p-6 w-full max-w-lg shadow-sm text-white">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex items-center">
              <div className="logo-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                  <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold ml-3">{user.name}</h3>
                <h5 className="text font-bold ml-3">
                  {props.request.state} | {props.request.city}
                </h5>
              </div>
            </div>
            <div className="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-green-600 bg-white text-green-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 -translate-x-1 text-green-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle className="blink" cx="12" cy="12" r="10"></circle>
              </svg>
              Open
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#e7eded]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
              </svg>
              <span className="text-2xl font-bold">
                {props.request.bloodUnit}
              </span>
              <span className="text-sm text-gray-400">Blood Units</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span className="text-2xl font-bold">{donors}</span>
              <span className="text-sm text-gray-400">Acceptors</span>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <form onSubmit={submit}>
              <input type="hidden" value={props.request._id} name="requestId" />
              {currentUser !== props.request.userId && (
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-black hover:bg-gray-300 font-extrabold"
                >
                  Accept Donation
                </button>
              )}
              {currentUser === props.request.userId && (
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-300 text-black font-extrabold">
                  Requested By You
                </div>
              )}
            </form>

            <div className="flex items-center space-x-2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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
