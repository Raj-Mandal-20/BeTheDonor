"use client";
import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faEnvelope, faLocationDot, faDroplet, faPeopleGroup, faPhoneVolume, faHandHoldingDroplet, faHandSparkles, faDropletSlash, faCheck, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { acceptRequest } from "@/app/actions/requests";
import { getUser } from "@/app/actions/user";
import { toast } from "react-toastify";

const BloodRequest = (props) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [isClosed, setIsClosed] = useState(props.request.isClosed);
  const [logo, setLogo] = useState('');
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

  const fetchUser = async () => {
    setLoading(true);
    try {
      const fetchedUser = await getUser(props.request.userId);
      if (fetchedUser.user) {
        setUser(fetchedUser.user);
      } else {
        setUser({});
        toast.error(`Failed to fetch user for request Id: ${props.request._id}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      setUser({});
      toast.error(`Server timed out for request Id: ${props.request._id}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    const isDeadlineMissed = await checkIfDeadlineIsMissed();
    if (isDeadlineMissed) {
      setIsClosed(true);
    } else {
      setIsClosed(props.request.isClosed);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [props.request]);

  useEffect(() => {
    if (!user.name) {
      setLogo('');
      return;
    }
    let logo = '';
    let temp = user.name.trim().split(" ");
    let index = 0;
    for (let e of temp) {
      if (index == 2) break;
      logo = logo + e[0];
      index++;
    }
    setLogo(logo.toUpperCase());
  }, [user]);

  const accept = async (e) => {
    try {
      e.preventDefault();
      setDisabled(true);
      props.setProgress(10);
      const isDeadlineMissed = await checkIfDeadlineIsMissed();
      if (isDeadlineMissed) {
        toast.error('Deadline has been missed', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        props.setProgress(75);
        setDisabled(false);
        props.setProgress(100);
      } else {
        const newCard = await acceptRequest(props.request._id);
        props.setProgress(50);
        if (newCard.bloodRequest) {
          toast.success(newCard.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          props.setProgress(75);
          props.setNoOfAcceptors({ ...props.noOfAcceptors, [props.request._id]: newCard.bloodRequest.donors?.length });
          props.setCurrentUser(prevState => ({ ...prevState, donates: [...prevState.donates, props.request._id] }));
          setDisabled(false);
          props.setProgress(100);
        } else {
          toast.error('Failed to accept the request', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          props.setProgress(75);
          setDisabled(false);
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
      props.setProgress(75);
      setDisabled(false);
      props.setProgress(100);
    }
  };

  return (
    <>
      {loading && (
        <div className={`card bg-[#1c1c1f] shadow-lg shadow-black rounded-lg p-4 h-[272.8px] text-white w-[20rem] flex justify-center items-center`}>
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
        <div className='h-[272.8px] nano:h-fit bg-[#1c1c1f] shadow-xl shadow-black rounded-lg flex flex-col justify-between gap-4 text-white w-[20rem] pt-4'>
          <div className='flex flex-col gap-1 px-4'>
            <div className='flex gap-2 items-center'>
              <p className='text-lg nano:text-base'>{props.request.donationCenter}</p>
              <div className='flex text-xs'>
                {
                  !isClosed && (
                    <div title="Open" className={`text-blue-500`}><FontAwesomeIcon icon={faLockOpen} /></div>
                  )
                }
                {
                  isClosed && (
                    <div title="Closed" className={`text-yellow-500`}><FontAwesomeIcon icon={faLock} /></div>
                  )
                }
              </div>
            </div>
            <div className='flex nano:flex-col gap-1'>
              <div className='flex gap-1 items-center user_name relative'>
                <p className='text-xs text-gray-400 italic'>by</p>
                <p className="text-xs italic underline hover:cursor-pointer">{user.name}</p>
                <div className='user_details absolute bg-[#1c1c1f] z-10 p-4 rounded-md shadow-xl shadow-black hidden flex-col gap-2 w-[18rem] nano:w-[12rem]'>
                  <p className="text-gray-500 text-sm bg-gray-200 rounded-full p-2 w-8 h-8 flex justify-center items-center">{logo}</p>
                  <div className='flex flex-col gap-1'>
                    <div className='flex gap-1 items-center'>
                      <p className='text-xs text-gray-400'><FontAwesomeIcon icon={faUser} /></p>
                      <p className='text-xs text-gray-400 italic'>User Name</p>
                    </div>
                    <p className='text-white text-xs'>{user.name}</p>
                  </div>
                  {
                    props.currentUser.donates.includes(props.request._id) || (props.currentUser._id == props.request.userId) ? (
                      <>
                        <div className='flex flex-col gap-1'>
                          <div className='flex gap-1 items-center'>
                            <p className='text-xs text-gray-400'><FontAwesomeIcon icon={faPhoneVolume} /></p>
                            <p className='text-xs text-gray-400 italic'>Phone Number</p>
                          </div>
                          <p className='text-white text-xs'>{user.phoneNumber}</p>
                        </div>
                        <div className='flex flex-col gap-1 break-all'>
                          <div className='flex gap-1 items-center'>
                            <p className='text-xs text-gray-400'><FontAwesomeIcon icon={faEnvelope} /></p>
                            <p className='text-xs text-gray-400 italic'>E-Mail Address</p>
                          </div>
                          <p className='text-white text-xs'>{user.email}</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs text-gray-400 italic">
                        You need to accept the request to see the user's e-mail & phone number
                      </p>
                    )
                  }
                </div>
              </div>
              <p className='text-xs text-gray-400 italic'>{createdAt}</p>
            </div>
          </div>
          <div className='flex flex-col gap-1 px-4'>
            <div className='flex gap-1 items-center'>
              <p className='text-xs text-gray-400'><FontAwesomeIcon icon={faLocationDot} /></p>
              <p className='text-xs text-gray-400 italic'>Address</p>
            </div>
            <p className='text-xs'>{props.request.city}, {props.request.district}, {props.request.state}, {props.request.pin}</p>
          </div>
          <div className='flex pico:flex-col pico:gap-2 w-full justify-between px-4'>
            <div className='flex items-center gap-1'>
              <div className='flex gap-1 items-center'>
                <p className='text-xs text-gray-400'><FontAwesomeIcon icon={faDroplet} /></p>
                <p className='text-xs text-gray-400 italic'>Blood Group</p>
              </div>
              <p className='text-xs'>{props.request.bloodGroup}</p>
            </div>
            <div className='flex items-center gap-1'>
              <div className='flex gap-1 items-center'>
                <p className='text-xs text-gray-400'><FontAwesomeIcon icon={faDroplet} /></p>
                <p className='text-xs text-gray-400 italic'>Blood Units</p>
              </div>
              <p className='text-xs'>{props.request.bloodUnit}</p>
            </div>
          </div>
          <div className='flex pico:flex-col pico:gap-2 w-full justify-between px-4'>
            <div className='flex items-center gap-1'>
              <div className='flex gap-1 items-center'>
                <p className='text-xs text-gray-400'><FontAwesomeIcon icon={faCalendar} /></p>
                <p className='text-xs text-gray-400 italic'>Deadline</p>
              </div>
              <p className='text-xs'>{lastDate}</p>
            </div>
            <div className='flex items-center gap-1'>
              <div className='flex gap-1 items-center'>
                <p className='text-xs text-gray-400'><FontAwesomeIcon icon={faPeopleGroup} /></p>
                <p className='text-xs text-gray-400 italic'>Acceptors</p>
              </div>
              <p className='text-xs'>{props.noOfAcceptors[props.request._id]}</p>
            </div>
          </div>
          {
            props.currentUser._id !== props.request.userId && (
              !isClosed ? (
                props.currentUser.donates.includes(props.request._id) ? (
                  <button title='Accepted by you' className={`rounded-b-md pt-2 pb-4 border-t border-solid border-[#39393b] text-sm text-green-500 hover:bg-[#232323] hover:cursor-not-allowed`}><FontAwesomeIcon icon={faCheck} /> accepted</button>
                ) : (
                  <button title='Accept the request' disabled={disabled} onClick={accept} className={`rounded-b-md pt-2 pb-4 border-t border-solid border-[#39393b] text-sm ${disabled ? 'text-gray-400 cursor-wait' : 'text-green-500 hover:bg-[#232323]'}`}><FontAwesomeIcon icon={faHandHoldingDroplet} />{disabled ? ' accepting...' : ' accept'}</button>
                )
              ) : (
                <button title='Request is closed' className="rounded-b-md pt-2 pb-4 border-t border-solid border-[#39393b] hover:bg-[#232323] text-sm text-yellow-500 hover:cursor-not-allowed"><FontAwesomeIcon icon={faDropletSlash} /> closed</button>
              )
            )
          }
          {
            props.currentUser._id === props.request.userId && (
              <button title='Requested by you' className="rounded-b-md pt-2 pb-4 border-t border-solid border-[#39393b] hover:bg-[#232323] text-sm text-blue-500 hover:cursor-not-allowed"><FontAwesomeIcon icon={faHandSparkles} /> your request</button>
            )
          }
        </div >
      )}
    </>
  );
};

export default BloodRequest;
