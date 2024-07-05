"use client";

import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import RequestHistory from "./RequestHistory";
import HashLoader from "react-spinners/HashLoader";
import MoonLoader from "react-spinners/MoonLoader";

const MyProfile = (props) => {
  const cookies = parseCookies();
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [profile, setProfile] = useState({});

  const [history, setHistory] = useState();

  useEffect(() => {
    const fetchRequests = async () => {
      const getHistory = await fetch(`${props.HOST}/v1/request-history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies["usertoken"],
        },
      });
      const hist = await getHistory.json();
      console.log(hist.bloodRequests);
      setHistory(hist.bloodRequests);
      setLoading2(false);
    };
    return () => {
      fetchRequests();
    };
  }, [history]);

  useEffect(() => {
    const fetchUser = async () => {
      const getProfile = await fetch(`${props.HOST}/v1/my-profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies["usertoken"],
        },
      });
      const profile = await getProfile.json();
      console.log(profile.myProfile);
      setProfile(profile.myProfile);
      setLoading1(false);
    };
    return () => {
      fetchUser();
    };
  }, [profile]);

  return (
    <div className="bg-[rgb(5,26,57)] flex items-start p-4 justify-center min-h-screen">
      {loading1 && (
        <HashLoader
          color={"white"}
          loading={loading1}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {!loading1 && (
        <div className="bg-white w-2/3 p-6 rounded-lg shadow-lg ">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-2xl font-bold">JD</span>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {profile.name}
              </h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center text-green-600">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {profile.available === true ? "Available" : "Not Available"}
            </span>
            <button className="text-blue-500 font-semibold">Update</button>
          </div>
          <div className="mb-4">
            <h3 className="text-gray-700">Phone</h3>
            <p className="text-gray-900">{profile.phoneNumber}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-gray-700">Address</h3>
            <p className="text-gray-900">
              {profile.city}, {profile.district}, {profile.state}, {profile.pin}
            </p>
          </div>
          <div>
            <h3 className="text-gray-700">Blood Group</h3>
            <p className="text-gray-900 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm4-1h6a1 1 0 000-2H7a1 1 0 100 2zM5 11a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {profile.bloodGroup}
            </p>
          </div>

          <h1 className="text-lg text-black  p-6 font-bold">Request History</h1>
          {loading2 && (
            <div  className="flex justify-center pb-20"> 
              <MoonLoader
                color={"black"}
                loading={loading2}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          {!loading2 && (
            <>
              {history?.length > 0 &&
                history?.map((request, index) => {
                  return (
                    <RequestHistory
                      key={index}
                      request={request}
                      HOST={props.HOST}
                    />
                  );
                })}
              {profile.requests?.length === 0 && (
                <div className="text-black text-2xl]">No Request History</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
