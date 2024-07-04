"use client";

import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
const RequestHistory = (props) => {
  return (
    <div className="h-fit p-4 flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4 text-white rounded-lg shadow-lg card-gradient flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-12 w-12 rounded-full bg-white p-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="#17c9d2"
            />
          </svg>
        </div>
        <div className="ml-4 flex-1">
          <h2 className="text-xl font-bold">
            {props.request.city}, {props.request.state}
          </h2>
          <p className="text-gray-200">Request Location</p>
          <div className="flex items-center mt-2">
            <div className="flex -space-x-1">
              <svg
                className="h-6 w-6 rounded-full border-2 border-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                  fill="#B3B3B3"
                />
                <path
                  d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z"
                  fill="#B3B3B3"
                />
              </svg>

              <svg
                className="h-6 w-6 rounded-full border-2 border-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                  fill="#B3B3B3"
                />
                <path
                  d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z"
                  fill="#B3B3B3"
                />
              </svg>
              <svg
                className="h-6 w-6 rounded-full border-2 border-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                  fill="#B3B3B3"
                />
                <path
                  d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z"
                  fill="#B3B3B3"
                />
              </svg>
            </div>
            <span className="text-gray-200 ml-2">+2 more</span>
          </div>
        </div>
        <div className="ml-auto text-right">
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Active
          </span>
          <p className="mt-2 text-gray-200">
            {props.request.donors.length > 0
              ? props.request.donors.length
              : "No"}{" "}
            Acceptors
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestHistory;
