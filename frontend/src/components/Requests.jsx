"use client";
import { useState } from "react";
// import { parseCookies } from "nookies";
import BloodRequest from "./BloodRequest";

const Requests = (props) => {
  const [allRequests, setAllRequests] = useState(props.allBloodRequest);

  return (
    <div className={`bg-[#051a39] p-5 h-full flex flex-wrap gap-8 justify-center pb-20  min-h-screen`}>
      {
        allRequests.length > 0 ? (
          allRequests.map((request, index) => (
            <BloodRequest key={index} request={request} HOST={props.HOST} />
          ))
        ) : (
          <div className="text-white text-2xl h-[23rem]">
            No Blood Requests
          </div>
        )}
    </div>
  );
};

export default Requests;
