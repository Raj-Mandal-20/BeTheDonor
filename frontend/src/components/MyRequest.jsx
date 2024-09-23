"use client";
import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { toggleRequestStatus, deleteRequest, getAcceptors } from "@/app/actions/requests";

const MyRequest = (props) => {
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  const [isFetchingAcceptors, setIsFetchingAcceptors] = useState(false);
  const [isClosed, setIsClosed] = useState(props.request.isClosed);
  const createdAt = new Date(props.request.createdAt).toDateString();
  const lastDate = new Date(props.request.deadline).toDateString();

  const checkIfDeadlineIsMissed = async () => {
    let c = new Date();
    let d = new Date(props.request.deadline);
    let year = d.getFullYear() - c.getFullYear();
    let month = d.getMonth() - c.getMonth();
    let day = d.getDate() - c.getDate();
    if (year > 0) {
      return false;
    } else if (year == 0) {
      if (month > 0) {
        return false;
      } else if (month == 0) {
        if (day >= 0) {
          return false;
        } else { return true; }
      } else { return true; }
    } else { return true; }
  };

  const fetchStatus = async () => {
    setLoading(true);
    const isDeadlineMissed = await checkIfDeadlineIsMissed();
    if (isDeadlineMissed) {
      setIsClosed(true);
    } else {
      setIsClosed(props.request.isClosed);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
  }, [props.request]);

  const showAcceptors = async (e) => {
    e.preventDefault();
    setIsFetchingAcceptors(true);
    props.setProgress(10);
    const response = await getAcceptors(props.request._id);
    props.setProgress(50);
    if (response.statusCode == 200) {
      const acceptors = response.donors.filter(request => request != null);
      acceptors.reverse();
      props.setProgress(75);
      props.setIsSliderOpened(true);
      props.setAcceptors(acceptors);
      toast.success(response.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      props.setProgress(100);
      setIsFetchingAcceptors(false);
    }
    else {
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
      props.setProgress(100);
      setIsFetchingAcceptors(false);
    }
  };

  const deleteCurrentRequest = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    props.setProgress(10);
    const deleteRequestParsedResponse = await deleteRequest(props.request._id);
    props.setProgress(50);
    if (deleteRequestParsedResponse.statusCode == 200) {
      const newMyRequests = props.myRequests.filter((request) => request._id !== props.request._id);
      props.setMyRequests(newMyRequests);
      const newMyRequestsProps = props.myRequestsProps.filter((request) => request._id !== props.request._id);
      props.setMyRequestsProps(newMyRequestsProps);
      props.setProgress(75);
      toast.success(deleteRequestParsedResponse.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      props.setProgress(100);
      setIsDeleting(false);
    } else {
      toast.error(deleteRequestParsedResponse.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      props.setProgress(100);
      setIsDeleting(false);
    }
  }

  const toggleStatus = async (e) => {
    e.preventDefault();
    props.setProgress(10);
    setIsTogglingStatus(true);
    const isDeadlineMissed = await checkIfDeadlineIsMissed();
    props.setProgress(20);
    if (isDeadlineMissed) {
      toast.warn("Deadline has been missed!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsTogglingStatus(false);
      props.setProgress(100);
    } else {
      const toggleRequestStatusParsedResponse = await toggleRequestStatus(props.request._id);
      props.setProgress(50);
      if (toggleRequestStatusParsedResponse.statusCode === 200) {
        const newMyRequests = props.myRequests.map((request) => {
          if (request._id === props.request._id) { return { ...request, isClosed: !request.isClosed }; }
          return request;
        });
        props.setMyRequests(newMyRequests);
        const newMyRequestsProps = props.myRequestsProps.map((request) => {
          if (request._id === props.request._id) { return { ...request, isClosed: !request.isClosed }; }
          return request;
        });
        props.setMyRequestsProps(newMyRequestsProps);
        props.setProgress(75);
        toast.success(toggleRequestStatusParsedResponse.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsTogglingStatus(false);
        props.setProgress(100);
      } else {
        toast.error(toggleRequestStatusParsedResponse.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsTogglingStatus(false);
        props.setProgress(100);
      }
    }
  }

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
                !isClosed && (
                  <button title="Toggle Status" disabled={isTogglingStatus} onClick={toggleStatus} className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${isTogglingStatus ? 'border-black text-black cursor-wait' : 'border-green-600 text-green-900'} bg-white`}>
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
                      <circle className={`${isTogglingStatus ? 'blinkT' : 'blinkOpen'}`} cx="12" cy="12" r="10"></circle>
                    </svg>
                    Open
                  </button>
                )
              }
              {
                isClosed && (
                  <button title="Toggle Status" disabled={isTogglingStatus} onClick={toggleStatus} className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${isTogglingStatus ? 'border-black text-black cursor-wait' : 'border-red-500 text-red-900'} bg-white`}>
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
                      <circle className={`${isTogglingStatus ? 'blinkT' : 'blinkClose'}`} cx="12" cy="12" r="10"></circle>
                    </svg>
                    Closed
                  </button>
                )
              }
            </div>
            <button id="drbmr" disabled={isDeleting} onClick={deleteCurrentRequest} title="Delete Request" className={`p-2 text-xs border rounded-md ${isDeleting ? 'text-white border-gray-500 cursor-wait' : 'text-red-500 border-red-500 hover:text-white hover:bg-red-500'}`}>
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
            <button disabled={isFetchingAcceptors} onClick={showAcceptors} className={`px-4 py-2 w-full ${isFetchingAcceptors ? 'bg-[#48484a] text-white cursor-wait' : 'bg-green-300 hover:bg-green-200 text-black'}`}>{isFetchingAcceptors ? 'Processing...' : 'Show Acceptors'}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyRequest;