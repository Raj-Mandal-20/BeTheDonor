"use client";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import MoonLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash
} from "@fortawesome/free-solid-svg-icons";

const RequestHistory = (props) => {
  const [loading, setLoading] = useState(true);
  // const cookies = parseCookies();
  const createdAt = new Date(props.request.createdAt).toDateString();
  const lastDate = new Date(props.request.deadline).toDateString();
  const [status, setStatus] = useState(true);

  const fetchStatus = async () => {
    setLoading(true);
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
    fetchStatus();
  }, [props.request]);

  const showAcceptors = async (e) => {
    e.preventDefault();
    props.setRID(props.request._id);
  };

  //   const accept = async (e) => {
  //     e.preventDefault();
  //     props.setProgress(10);
  //     let res = await fetch(`${props.HOST}/v1/donation`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + cookies["usertoken"],
  //       },
  //       body: JSON.stringify({ requestId: props.request._id }),
  //     });
  //     props.setProgress(25);
  //     const newCard = await res.json();
  //     if (newCard.bloodRequest) {
  //       props.setProgress(50);
  //       props.toast.success(newCard.message, {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //       props.setProgress(75);
  //       props.setDonors({ ...props.donors, [props.request._id]: newCard.bloodRequest.donors?.length });
  //       setAccepted(true);
  //       props.setProgress(100);
  //     } else {
  //       props.setProgress(50);
  //       props.toast.error('Failed to accept the request!', {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //       props.setProgress(100)
  //     }
  //   };

  return (
    <>
      {loading && (
        <div className={`card bg-[#1c1c1f] shadow-lg shadow-black rounded-lg p-4 h-[474.4px] max-w-lg text-white w-[20rem] flex justify-center items-center`}>
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
        <div className={`card h-fit bg-[#1c1c1f] shadow-xl shadow-black rounded-lg flex flex-col text-white w-[20rem]`}>
          <div className="flex gap-2 justify-between items-center w-full bg-[#39393b] p-4">
            <div className="flex justify-center">
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
            <button id="drbmr" title="Delete Request" className="text-red-500 p-2 text-xs border border-red-500 rounded-md">
              <FontAwesomeIcon icon={faTrash} />
            </button>
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
                <p>{props.request.donors?.length}</p>
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
          <div className="flex w-full">
            <button onClick={showAcceptors} className="px-4 py-2 w-full bg-green-300 text-black">Show Acceptors</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestHistory;











// "use client";

// import React, { useEffect, useState } from "react";
// import { parseCookies } from "nookies";
// const RequestHistory = (props) => {
//   return (
//     <div className="h-fit p-4 flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-4 text-white rounded-lg shadow-lg card-gradient flex items-center">
//         <div className="flex-shrink-0">
//           <svg
//             className="h-12 w-12 rounded-full bg-white p-2"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
//               fill="#17c9d2"
//             />
//           </svg>
//         </div>
//         <div className="ml-4 flex-1">
//           <h2 className="text-xl font-bold">
//             {props.request.city}, {props.request.state}
//           </h2>
//           <p className="text-gray-200">Request Location</p>
//           <div className="flex items-center mt-2">
//             <div className="flex -space-x-1">
//               <svg
//                 className="h-6 w-6 rounded-full border-2 border-white"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
//                 <path
//                   d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
//                   fill="#B3B3B3"
//                 />
//                 <path
//                   d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z"
//                   fill="#B3B3B3"
//                 />
//               </svg>

//               <svg
//                 className="h-6 w-6 rounded-full border-2 border-white"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
//                 <path
//                   d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
//                   fill="#B3B3B3"
//                 />
//                 <path
//                   d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z"
//                   fill="#B3B3B3"
//                 />
//               </svg>
//               <svg
//                 className="h-6 w-6 rounded-full border-2 border-white"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
//                 <path
//                   d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
//                   fill="#B3B3B3"
//                 />
//                 <path
//                   d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z"
//                   fill="#B3B3B3"
//                 />
//               </svg>
//             </div>
//             <span className="text-gray-200 ml-2">+2 more</span>
//           </div>
//         </div>
//         <div className="ml-auto text-right">
//           <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//             Active
//           </span>
//           <p className="mt-2 text-gray-200">
//             {props.request.donors.length > 0
//               ? props.request.donors.length
//               : "No"}{" "}
//             Acceptors
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestHistory;
