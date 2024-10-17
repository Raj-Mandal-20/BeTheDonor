"use client";
import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faLock, faLockOpen, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
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
    try {
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
    } catch (error) {
      toast.error("Server Timed Out", {
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
    try {
      e.preventDefault();
      setIsDeleting(true);
      props.setProgress(10);
      const isDeadlineMissed = await checkIfDeadlineIsMissed();
      props.setProgress(20);
      if (isDeadlineMissed) {
        toast.error("Deadline has been missed", {
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
    } catch (error) {
      toast.error("Server Timed Out", {
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
    try {
      e.preventDefault();
      props.setProgress(10);
      setIsTogglingStatus(true);
      const isDeadlineMissed = await checkIfDeadlineIsMissed();
      props.setProgress(20);
      if (isDeadlineMissed) {
        toast.error("Deadline has been missed", {
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
    } catch (error) {
      toast.error("Server Timed Out", {
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

  return (
    <>
      {loading && (
        <div className={`card bg-[#1c1c1f] shadow-lg shadow-black rounded-lg p-4 h-[256px] nano:h-[292px] text-white w-[20rem] nano:w-[14rem] flex justify-center items-center`}>
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
        <div className='h-[264px] nano:h-[308px] bg-[#1c1c1f] shadow-xl shadow-black rounded-lg flex flex-col justify-between gap-4 text-white w-[20rem] nano:w-[14rem] p-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-lg nano:text-base'>{props.request.donationCenter}</p>
            <div className='flex gap-2 items-center'>
              <p className='text-xs text-gray-400 italic'>{createdAt}</p>
              {
                !isClosed && (
                  <button title="Close Request" disabled={isTogglingStatus} onClick={toggleStatus} className={`${isTogglingStatus ? 'text-gray-400 cursor-wait' : 'text-blue-600 hover:text-blue-500'} text-xs`}><FontAwesomeIcon icon={faLockOpen} /></button>
                )
              }
              {
                isClosed && (
                  <button title="Open Request" disabled={isTogglingStatus} onClick={toggleStatus} className={`${isTogglingStatus ? 'text-gray-400 cursor-wait' : 'text-yellow-500 hover:text-yellow-400'} text-xs`}><FontAwesomeIcon icon={faLock} /></button>
                )
              }
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-xs text-gray-400 italic'>Address</p>
            <p className='text-xs'>{props.request.city}, {props.request.district}, {props.request.state}, {props.request.pin}</p>
          </div>
          <div className='flex w-full justify-between'>
            <div className='flex items-center gap-1'>
              <p className='text-xs text-gray-400 italic'>Blood Group</p>
              <p className='text-xs'>{props.request.bloodGroup}</p>
            </div>
            <div className='flex items-center gap-1'>
              <p className='text-xs text-gray-400 italic'>Blood Units</p>
              <p className='text-xs'>{props.request.bloodUnit}</p>
            </div>
          </div>
          <div className='flex nano:flex-col-reverse nano:gap-2 w-full justify-between'>
            <div className='flex items-center gap-1'>
              <p className='text-xs text-gray-400 italic'>Deadline</p>
              <p className='text-xs'>{lastDate}</p>
            </div>
            <div className='flex items-center gap-1'>
              <p className='text-xs text-gray-400 italic'>Acceptors</p>
              <p className='text-xs'>{props.request.donors?.length}</p>
            </div>
          </div>
          <div className='flex w-full justify-between items-center'>
            <div className='flex text-sm'>
              <button disabled={isDeleting} onClick={deleteCurrentRequest} title="Delete Request" className={`${isDeleting ? 'text-gray-400 cursor-wait' : 'text-red-600 hover:text-red-500'}`}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
            <div className='flex text-sm'>
              <button disabled={isFetchingAcceptors} onClick={showAcceptors} title='Show Acceptors' className={`${isFetchingAcceptors ? 'text-gray-400 cursor-wait' : 'text-green-600 hover:text-green-500'}`}><FontAwesomeIcon icon={faPeopleGroup} /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyRequest;