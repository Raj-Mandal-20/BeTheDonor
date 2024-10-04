"use client";

import React, { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faXmark, faTrash, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { updateProfile, deleteProfile, updateEmail, submitOTP } from "@/app/actions/user";
import { deleteSession } from "@/app/actions/auth";

const Dashboard = (props) => {
  const [progress, setProgress] = useState(0);
  const [originalUser, setOriginalUser] = useState({ ...props.user, dob: new Date(props.user.dob).toISOString().slice(0, 10) });
  const [user, setUser] = useState({ ...props.user, dob: new Date(props.user.dob).toISOString().slice(0, 10) });
  const [sectionID, setSectionID] = useState('');
  const [logo, setLogo] = useState('');
  const [editEmail, setEditEmail] = useState(false);
  const [editPrimary, setEditPrimary] = useState(false);
  const [editPersonal, setEditPersonal] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [disable, setDisable] = useState(false);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [otpID, setOtpID] = useState('');
  const [openOTPmodal, setOpenOTPmodal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [otp, setOtp] = useState({ digit1: '', digit2: '', digit3: '', digit4: '', digit5: '', digit6: '' });

  useEffect(() => {
    if (editAddress) {
      document.getElementById('stated').innerHTML = `<option value='' class='hidden'>--select--</option>`;
      for (let state in props.data) {
        let option = document.createElement("option");
        option.innerHTML = `${state}`
        option.setAttribute("value", `${state}`);
        option.setAttribute("class", 'text-gray-800');
        document.getElementById("stated").appendChild(option);
      }
      document.getElementById('stated').value = originalUser.state;

      document.getElementById('districtd').innerHTML = `<option value='' class='hidden'>--select--</option>`;
      for (let state in props.data) {
        if (state == originalUser.state) {
          for (let district in props.data[state]) {
            let option = document.createElement("option");
            option.innerHTML = `${district}`
            option.setAttribute("value", `${district}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("districtd").appendChild(option);
          }
        }
      }
      document.getElementById('districtd').value = originalUser.district;

      document.getElementById('cityd').innerHTML = `<option value='' class='hidden'>--select--</option>`
      for (let state in props.data) {
        if (state == originalUser.state) {
          for (let district in props.data[state]) {
            if (district == originalUser.district) {
              for (let city in props.data[state][district]) {
                let option = document.createElement("option");
                option.innerHTML = `${city}`
                option.setAttribute("value", `${city}`);
                option.setAttribute("class", 'text-gray-800');
                document.getElementById("cityd").appendChild(option);
              }
            }
          }
        }
      }
      document.getElementById('cityd').value = originalUser.city;

      document.getElementById('pind').innerHTML = `<option value='' class='hidden'>--select--</option>`
      for (let state in props.data) {
        if (state == originalUser.state) {
          for (let district in props.data[state]) {
            if (district == originalUser.district) {
              let cityPinObj = props.data[state][district];
              let pins = Object.values(cityPinObj);
              let uniquePins = [...new Set(pins)];
              uniquePins.sort((a, b) => a - b);
              for (let zip of uniquePins) {
                let option = document.createElement("option");
                option.innerHTML = `${zip}`;
                option.setAttribute("value", `${zip}`);
                option.setAttribute("class", 'text-gray-800');
                document.getElementById("pind").appendChild(option);
              }
            }
          }
        }
      }
      document.getElementById('pind').value = originalUser.pin;
    }
  }, [props.data, editAddress]);

  const setDateRestrictions = () => {
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 65);
    setMinDate(minDate.toISOString().split('T')[0]);
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 18);
    setMaxDate(maxDate.toISOString().split('T')[0]);
  };

  useEffect(() => {
    let logo = '';
    let temp = originalUser.name.trim().split(" ");
    let index = 0;
    for (let e of temp) {
      if (index == 2) break;
      logo = logo + e[0];
      index++;
    }
    setLogo(logo.toUpperCase());
    setDateRestrictions();
  }, [originalUser]);

  const closeEmail = () => {
    setEditEmail(false);
    setSectionID('');
    setUser(originalUser);
  };

  const closePrimary = () => {
    setEditPrimary(false);
    setSectionID('');
    setUser(originalUser);
  };

  const closePersonal = () => {
    setEditPersonal(false);
    setSectionID('');
    setUser(originalUser);
  };

  const closeAddress = () => {
    setEditAddress(false);
    setSectionID('');
    setUser(originalUser);
  };

  const close = () => {
    if (sectionID === '1') closePrimary();
    else if (sectionID === '2') closePersonal();
    else if (sectionID === '3') closeAddress();
    else if (sectionID === '0') closeEmail();
  }

  const openEmail = () => {
    close();
    setSectionID('0');
    setEditEmail(true);
  }

  const openPrimary = () => {
    close();
    setSectionID('1');
    setEditPrimary(true);
  };

  const openPersonal = () => {
    close();
    setSectionID('2');
    setEditPersonal(true);
  };

  const openAddress = () => {
    close();
    setSectionID('3');
    setEditAddress(true);
  };

  const change = (e) => {
    if (e.target.name === 'name') {
      setUser({ ...user, name: e.target.value });
      if (/^[A-Za-z\s]+$/.test(e.target.value)) {
        e.target.setCustomValidity('');
      } else {
        e.target.setCustomValidity('Must have characters and blank spaces only!');
      }
    } else if (e.target.name === 'available') {
      setUser({ ...user, available: e.target.checked });
    } else if (e.target.name === 'phoneNumber') {
      setUser({ ...user, phoneNumber: e.target.value });
      if (!(/[^0-9]/.test(e.target.value)) && (e.target.value.length == 10 || e.target.value.length == 8)) {
        e.target.setCustomValidity('');
      } else {
        e.target.setCustomValidity('Must have 10 or 8 digits only!');
      }
    } else if (e.target.name === 'dob') {
      const date = new Date(e.target.value);
      if (!isNaN(date.getTime())) {
        setUser({ ...user, dob: date.toISOString().slice(0, 10) });
      }
    } else if (e.target.name === 'state') {
      setUser({ ...user, state: e.target.value, district: '', city: '', pin: '' });
      document.getElementById('districtd').innerHTML = '<option value="" class="hidden">--select--</option>';
      document.getElementById('cityd').innerHTML = '<option value="" class="hidden">--select--</option>';
      document.getElementById('pind').innerHTML = '<option value="" class="hidden">--select--</option>';
      for (let state in props.data) {
        if (state == e.target.value) {
          for (let district in props.data[state]) {
            let option = document.createElement("option");
            option.innerHTML = `${district}`
            option.setAttribute("value", `${district}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("districtd").appendChild(option);
          }
        }
      }
    } else if (e.target.name === 'district') {
      setUser({ ...user, district: e.target.value, city: "", pin: "" });
      document.getElementById('cityd').innerHTML = '<option value="" class="hidden">--select--</option>';
      document.getElementById('pind').innerHTML = '<option value="" class="hidden">--select--</option>';
      for (let state in props.data) {
        if (state == user.state) {
          for (let district in props.data[state]) {
            if (district == e.target.value) {
              for (let city in props.data[state][district]) {
                let option1 = document.createElement("option");
                option1.innerHTML = `${city}`;
                option1.setAttribute("value", `${city}`);
                option1.setAttribute("class", 'text-gray-800');
                document.getElementById("cityd").appendChild(option1);
              }
              let cityPinObj = props.data[state][district];
              let pins = Object.values(cityPinObj);
              let uniquePins = [...new Set(pins)];
              uniquePins.sort((a, b) => a - b);
              for (let zip of uniquePins) {
                let option2 = document.createElement("option");
                option2.innerHTML = `${zip}`;
                option2.setAttribute("value", `${zip}`);
                option2.setAttribute("class", 'text-gray-800');
                document.getElementById("pind").appendChild(option2);
              }
            }
          }
        }
      }
    } else if (e.target.name === 'city') {
      for (let state in props.data) {
        if (state == user.state) {
          for (let district in props.data[state]) {
            if (district == user.district) {
              for (let city in props.data[state][district]) {
                if (city == e.target.value) {
                  let zip = props.data[state][district][city];
                  document.getElementById("pind").value = zip;
                  setUser({ ...user, city: e.target.value, pin: zip });
                }
              }
            }
          }
        }
      }
    } else if (e.target.name === 'pin') {
      setUser({ ...user, pin: e.target.value });
      document.getElementById('cityd').innerHTML = `<option value="" class="hidden">--select--</option>`;
      for (let state in props.data) {
        if (state == user.state) {
          for (let district in props.data[state]) {
            if (district == user.district) {
              for (let city in props.data[state][district]) {
                if (props.data[state][district][city] == e.target.value) {
                  let option = document.createElement("option");
                  option.innerHTML = `${city}`;
                  option.setAttribute("value", `${city}`);
                  option.setAttribute("class", 'text-gray-800');
                  document.getElementById("cityd").appendChild(option);
                }
              }
            }
          }
        }
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const clearState = () => {
    document.getElementById('stated').value = '';
    document.getElementById('districtd').innerHTML = '<option value="" class="hidden">--select--</option>';
    document.getElementById('cityd').innerHTML = '<option value="" class="hidden">--select--</option>';
    document.getElementById('pind').innerHTML = '<option value="" class="hidden">--select--</option>';
    setUser({ ...user, state: '', district: '', city: '', pin: '' });
  };

  const clearDistrict = () => {
    document.getElementById('districtd').value = '';
    document.getElementById('cityd').innerHTML = '<option value="" class="hidden">--select--</option>';
    document.getElementById('pind').innerHTML = '<option value="" class="hidden">--select--</option>';
    setUser({ ...user, district: '', city: '', pin: '' });
  };

  const clearCity = () => {
    document.getElementById('pind').value = '';
    setUser({ ...user, city: '', pin: '' });
    document.getElementById('cityd').innerHTML = `<option value="" class="hidden">--select--</option>`;
    for (let state in props.data) {
      if (state == user.state) {
        for (let district in props.data[state]) {
          if (district == user.district) {
            for (let city in props.data[state][district]) {
              let option = document.createElement("option");
              option.innerHTML = `${city}`;
              option.setAttribute("value", `${city}`);
              option.setAttribute("class", 'text-gray-800');
              document.getElementById("cityd").appendChild(option);
            }
          }
        }
      }
    }
  };

  const clearPin = () => {
    document.getElementById('pind').value = '';
    setUser({ ...user, pin: '' });
    document.getElementById('cityd').innerHTML = `<option value="" class="hidden">--select--</option>`;
    for (let state in props.data) {
      if (state == user.state) {
        for (let district in props.data[state]) {
          if (district == user.district) {
            for (let city in props.data[state][district]) {
              let option = document.createElement("option");
              option.innerHTML = `${city}`;
              option.setAttribute("value", `${city}`);
              option.setAttribute("class", 'text-gray-800');
              document.getElementById("cityd").appendChild(option);
            }
          }
        }
      }
    }
  };

  const save = async (e) => {
    try {
      e.preventDefault();
      setDisable(true);
      setProgress(10);
      const response = await updateProfile(user, sectionID);
      setProgress(50);
      if (response.message === 'Profile Updated Successfully') {
        setOriginalUser(user);
        if (sectionID === '1') {
          setEditPrimary(false);
          setSectionID('');
        } else if (sectionID === '2') {
          setEditPersonal(false);
          setSectionID('');
        } else {
          setEditAddress(false);
          setSectionID('');
        }
        setProgress(75);
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
        setProgress(100);
        setDisable(false);
      } else {
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
        setProgress(100);
        setDisable(false);
      }
    } catch (error) {
      toast.error("Server Timed Out!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setProgress(100);
      setDisable(false);
    }
  };

  const saveEmail = async (e) => {
    try {
      e.preventDefault();
      setDisable(true);
      setProgress(10);
      const response = await updateEmail(user.email);
      setProgress(50);
      if (response.statusCode === 200) {
        setOtpID(response.otpId);
        setOtp({ digit1: '', digit2: '', digit3: '', digit4: '', digit5: '', digit6: '' });
        setOpenOTPmodal(true);
        setProgress(75);
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
        setProgress(100);
        setDisable(false);
      } else {
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
        setProgress(100);
        setDisable(false);
      }
    } catch (error) {
      toast.error("Server Timed Out!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setProgress(100);
      setDisable(false);
    }
  };

  const changeOTP = (e) => {
    e.preventDefault();
    if (!(/[^0-9]/.test(e.target.value)) && e.target.value.length === 1) {
      setOtp({ ...otp, [e.target.name]: e.target.value });
      if (e.target.name === 'digit1') {
        document.getElementById('digit2').focus();
      } else if (e.target.name === 'digit2') {
        document.getElementById('digit3').focus();
      } else if (e.target.name === 'digit3') {
        document.getElementById('digit4').focus();
      } else if (e.target.name === 'digit4') {
        document.getElementById('digit5').focus();
      } else if (e.target.name === 'digit5') {
        document.getElementById('digit6').focus();
      }
    } else if (e.target.value.length === 0) {
      setOtp({ ...otp, [e.target.name]: e.target.value });
      if (e.target.name === 'digit6') {
        document.getElementById('digit5').focus();
      } else if (e.target.name === 'digit5') {
        document.getElementById('digit4').focus();
      } else if (e.target.name === 'digit4') {
        document.getElementById('digit3').focus();
      } else if (e.target.name === 'digit3') {
        document.getElementById('digit2').focus();
      } else if (e.target.name === 'digit2') {
        document.getElementById('digit1').focus();
      }
    }
  };

  const verifyOTP = async (e) => {
    try {
      e.preventDefault();
      setDisable(true);
      setProgress(10);
      const otpValue = otp.digit1 + otp.digit2 + otp.digit3 + otp.digit4 + otp.digit5 + otp.digit6;
      const response = await submitOTP(otpValue, otpID);
      setProgress(50);
      if (response.statusCode === 200) {
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
        setProgress(100);
        setOriginalUser(user);
        setEditEmail(false);
        setOpenOTPmodal(false);
        setDisable(false);
      } else {
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
        setProgress(100);
        setDisable(false);
      }
    } catch (error) {
      toast.error("Server Timed Out!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setProgress(100);
      setDisable(false);
    }
  };

  const deleteCurrentProfile = async () => {
    try {
      setDisable(true);
      setProgress(10);
      const response = await deleteProfile();
      setProgress(50);
      if (response.isAccountClosed) {
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
        setProgress(75);
        const responseAfterLogOut = await deleteSession();
        if (responseAfterLogOut.statusCode === 200) {
          setProgress(100);
          setDisable(false);
        } else {
          toast.error(responseAfterLogOut.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setProgress(100);
          setDisable(false);
        }
      } else {
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
        setProgress(100);
        setDisable(false);
      }
    } catch (error) {
      toast.error("Server Timed Out!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setProgress(100);
      setDisable(false);
    }
  };

  return (
    <div className="relative w-[85%] flex flex-col">
      <LoadingBar
        color='#b9003a'
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* Confirmation Modal */}

      <div className={`absolute h-screen overflow-auto w-full bg-[#161618] bg-opacity-80 z-20 ${openConfirmationModal ? 'flex justify-center p-16' : 'hidden'}`}>
        <div className="flex flex-col gap-4 bg-[#1c1c1f] shadow-lg shadow-black rounded-md p-8 w-2/5 h-fit">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 text-red-500 text-lg">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              <p className="text-red-500 text-xl">Delete Account</p>
            </div>
            <button title="Close This Modal" disabled={disable} onClick={() => { setOpenConfirmationModal(false); }} className={`${disable ? 'text-gray-400 cursor-not-allowed' : 'text-white hover:text-gray-300'} text-lg`}><FontAwesomeIcon icon={faXmark} /></button>
          </div>
          <p className="text-red-400 text-sm">This action cannot be undone. This will permanently delete your account and remove your data from our servers. Are you sure you want to delete your account?</p>
          <div className="flex w-full gap-4">
            <button onClick={() => { setOpenConfirmationModal(false); }} disabled={disable} className={`${disable ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'} text-black px-4 py-2 rounded-md w-full`}>Cancel</button>
            <button onClick={deleteCurrentProfile} disabled={disable} className={`${disable ? 'bg-[#48484a] cursor-wait' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-2 rounded-md w-full`}>{disable ? 'Processing...' : 'Delete'}</button>
          </div>
        </div>
      </div>

      {/* OTP Modal */}

      <div className={`absolute h-screen overflow-auto w-full bg-[#161618] bg-opacity-80 z-20 ${openOTPmodal ? 'flex justify-center p-16' : 'hidden'}`}>
        <div className="flex flex-col gap-4 bg-[#1c1c1f] shadow-lg shadow-black rounded-md p-8 w-2/5 h-fit">
          <div className="flex justify-between items-center w-full">
            <p className="text-white text-xl">Enter the OTP</p>
            <button disabled={disable} title="Close This Modal" onClick={() => { setOpenOTPmodal(false); }} className={`${disable ? 'text-gray-400 cursor-not-allowed' : 'text-white hover:text-gray-300'} text-lg`}><FontAwesomeIcon icon={faXmark} /></button>
          </div>
          <p className="text-gray-400">Enter the 6 digit OTP sent to your new e-mail address to complete this process.</p>
          <form onSubmit={verifyOTP} className="flex flex-col gap-4">
            <div className="flex justify-between gap-4">
              <input type="text" name="digit1" id="digit1" value={otp.digit1} onChange={changeOTP} className="w-1/6 h-10 text-center border-2 border-solid border-gray-500 rounded-md bg-transparent text-white" required />
              <input type="text" name="digit2" id="digit2" value={otp.digit2} onChange={changeOTP} className="w-1/6 h-10 text-center border-2 border-solid border-gray-500 rounded-md bg-transparent text-white" required />
              <input type="text" name="digit3" id="digit3" value={otp.digit3} onChange={changeOTP} className="w-1/6 h-10 text-center border-2 border-solid border-gray-500 rounded-md bg-transparent text-white" required />
              <input type="text" name="digit4" id="digit4" value={otp.digit4} onChange={changeOTP} className="w-1/6 h-10 text-center border-2 border-solid border-gray-500 rounded-md bg-transparent text-white" required />
              <input type="text" name="digit5" id="digit5" value={otp.digit5} onChange={changeOTP} className="w-1/6 h-10 text-center border-2 border-solid border-gray-500 rounded-md bg-transparent text-white" required />
              <input type="text" name="digit6" id="digit6" value={otp.digit6} onChange={changeOTP} className="w-1/6 h-10 text-center border-2 border-solid border-gray-500 rounded-md bg-transparent text-white" required />
            </div>
            <button disabled={disable} type="submit" className={`${disable ? 'bg-[#48484a] cursor-wait' : 'bg-[#b9003a] hover:bg-[#e2034b]'} text-white px-4 py-2 rounded-md`}>{disable ? 'Processing...' : 'Verify OTP'}</button>
          </form>
        </div>
      </div>

      {/* Dashboard card */}

      <div className="w-full flex justify-center items-start p-8 h-screen overflow-auto">
        <div className="bg-[#1c1c1f] w-[70%] py-8 px-12 rounded-lg shadow-lg shadow-black flex flex-col gap-8">
          <div className="w-full flex items-center gap-8">
            <div className="w-[10%]">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-2xl font-bold">{logo}</span>
              </div>
            </div>
            <div className="flex justify-between w-[90%]">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-white text-lg">{originalUser.donates?.length}</p>
                  <p className="text-gray-400 text-base">Total Accepts</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-white text-lg">{originalUser.requests?.length}</p>
                  <p className="text-gray-400 text-base">Total Requests</p>
                </div>
              </div>
              <div>
                <button onClick={() => { setOpenConfirmationModal(true); }} title="Delete Profile" disabled={disable} className={`${disable ? 'text-white border-gray-600 cursor-wait' : 'text-red-500 border-red-500'} text-xs p-2 border rounded-md`}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>

          {/* Email with OTP validation */}

          <form onSubmit={saveEmail} className="flex items-center w-full">
            <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">E-mail Address</p>
            <div className="flex w-3/5 justify-between">
              {
                editEmail ? (
                  <input type="email" name="email" value={user.email} onChange={change} className='w-2/3 border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md' required />
                ) : (
                  <p className="w-2/3 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f] text-white">
                    {user.email}
                  </p>
                )
              }
              {
                editEmail ?
                  <div className="flex gap-2">
                    <button disabled={disable} type="submit" className={`${disable ? 'text-white border-gray-600 cursor-wait' : 'text-green-500 border-green-500'} text-xs p-2 border rounded-md`}><FontAwesomeIcon icon={faCheck} /></button>
                    <button onClick={closeEmail} className="text-red-500 text-xs p-2 border border-red-500 rounded-md"><FontAwesomeIcon icon={faXmark} /></button>
                  </div>
                  :
                  <button onClick={openEmail} className="text-white text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faPen} /></button>
              }
            </div>
          </form>

          {/* Primary details consisting user name and availability */}

          <form onSubmit={save} className="flex flex-col gap-4">

            <div className="flex justify-between">
              <legend className="text-white text-lg">Primary details</legend>
              {
                editPrimary ? (
                  <div className="flex gap-2">
                    <button title="Save Primary Details" type="submit" disabled={disable} className={`${disable ? 'text-white border-gray-600 cursor-wait' : 'text-green-500 border-green-500'} text-xs p-2 border rounded-md`}><FontAwesomeIcon icon={faCheck} /></button>
                    <button title="Close Primary Details" onClick={closePrimary} className="text-red-500 text-xs p-2 border border-red-500 rounded-md"><FontAwesomeIcon icon={faXmark} /></button>
                  </div>
                ) : (
                  <button title="Edit Primary Details" onClick={openPrimary} className="text-white text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faPen} /></button>
                )
              }
            </div>

            <div className="flex flex-col w-full gap-2">
              <div className="flex w-full">
                <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Full Name</p>
                {
                  editPrimary ? (
                    <input type="text" name="name" value={user.name} onChange={change} className='w-2/5 border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md' required />
                  ) : (
                    <p className="w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f] text-white">
                      {user.name}
                    </p>
                  )
                }
              </div>
              <div className="flex w-full">
                <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Status</p>
                {
                  editPrimary ? (
                    <div className="flex gap-2 items-center">
                      <input type="checkbox" id="availabled" name="available" checked={user.available} onChange={change} className='accent-cyan-500' />
                      <label htmlFor="availabled" className='text-white text-sm'>Available to Donate?</label>
                    </div>
                  ) : (
                    user.available === true ? (
                      <span className="flex items-center text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <p>Available</p>
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <p>Not Available</p>
                      </span>
                    )
                  )
                }
              </div>
            </div>

          </form>

          {/* Personal details consisting user phone no, gender, blood group and date of birth */}

          <form onSubmit={save} className="flex flex-col gap-4">

            <div className="flex justify-between">
              <legend className="text-white text-lg">Personal details</legend>
              {editPersonal ?
                <div className="flex gap-2">
                  <button title="Save Personal Details" type="submit" disabled={disable} className={`${disable ? 'text-white border-gray-600 cursor-wait' : 'text-green-500 border-green-500'} text-xs p-2 border rounded-md`}><FontAwesomeIcon icon={faCheck} /></button>
                  <button title="Close Personal Details" onClick={closePersonal} className="text-red-500 text-xs p-2 border border-red-500 rounded-md"><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                :
                <button title="Edit Personal Details" onClick={openPersonal} className="text-white text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faPen} /></button>
              }
            </div>

            <div className="flex flex-col w-full gap-2">
              <div className="flex w-full">
                <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Contact Number</p>
                {
                  editPersonal ? (
                    <input type="tel" name="phoneNumber" value={user.phoneNumber} onChange={change} className='w-2/5 border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md' maxLength={10} required />
                  ) : (
                    <div className="w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f] text-white">
                      {user.phoneNumber}
                    </div>
                  )
                }
              </div>
              <div className="flex w-full">
                <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Gender</p>
                {
                  editPersonal ? (
                    <select name="gender" onChange={change} defaultValue={user.gender} title='Your Gender' className='w-2/5 border-2 h-[2rem] border-solid border-gray-500 outline-none bg-transparent text-white rounded-md' required>
                      <option value="male" className='text-gray-800'>male</option>
                      <option value="female" className='text-gray-800'>female</option>
                      <option value="others" className='text-gray-800'>others</option>
                    </select>
                  ) : (
                    <div className="w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f] text-white">
                      {user.gender}
                    </div>
                  )
                }
              </div>
              <div className="flex w-full">
                <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Blood Group</p>
                {
                  editPersonal ? (
                    <select name="bloodGroup" defaultValue={user.bloodGroup} title='Your Blood Group' onChange={change} className='w-2/5 h-[2rem] border-2 border-solid border-gray-500 outline-none bg-transparent text-white rounded-md' required>
                      <option value="A+" className='text-gray-800'>A+</option>
                      <option value="B+" className='text-gray-800'>B+</option>
                      <option value="AB+" className='text-gray-800'>AB+</option>
                      <option value="O+" className='text-gray-800'>O+</option>
                      <option value="A-" className='text-gray-800'>A-</option>
                      <option value="B-" className='text-gray-800'>B-</option>
                      <option value="AB-" className='text-gray-800'>AB-</option>
                      <option value="O-" className='text-gray-800'>O-</option>
                    </select>
                  ) : (
                    <div className="w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f] text-white">
                      {user.bloodGroup}
                    </div>
                  )
                }
              </div>
              <div className="flex w-full">
                <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Date of Birth</p>
                {
                  editPersonal ? (
                    <input className='w-2/5 h-[2rem] border-2 border-solid border-gray-500 outline-none bg-transparent text-white rounded-md date-input' type="date" name="dob" value={user.dob} onChange={change} min={minDate} max={maxDate} required />
                  ) : (
                    <div className="w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f] text-white">
                      {new Date(user.dob).toDateString()}
                    </div>
                  )
                }
              </div>
            </div>
          </form>

          {/* Address details consisting user state, district, city and pincode */}

          <form onSubmit={save} className="flex flex-col gap-4">

            <div className="flex justify-between">
              <legend className="text-white text-lg">Address</legend>
              {editAddress ?
                <div className="flex gap-2">
                  <button title="Save Address" type="submit" disabled={disable} className={`${disable ? 'text-white border-gray-600 cursor-wait' : 'text-green-500 border-green-500'} text-xs p-2 border rounded-md`}><FontAwesomeIcon icon={faCheck} /></button>
                  <button title="Close Address" onClick={closeAddress} className="text-red-500 text-xs p-2 border border-red-500 rounded-md"><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                :
                <button title="Edit Address" onClick={openAddress} className="text-white text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faPen} /></button>
              }
            </div>

            <div className="flex flex-col w-full gap-2">
              <div className="flex w-full">
                <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">State</p>
                {
                  editAddress ? (
                    <div className="flex w-2/5">
                      <select name="state" onChange={change} id="stated" title='Your State' className='w-full border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md rounded-r-none border-r-0' required>
                      </select>
                      <button title="Clear State" onClick={clearState} className='border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-white w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">
                      {user.state}
                    </p>
                  )
                }
              </div>
              <div className="flex w-full">
                <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">District</p>
                {
                  editAddress ? (
                    <div className="flex w-2/5">
                      <select name="district" onChange={change} id="districtd" title='Your District' className='w-full border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md rounded-r-none border-r-0' required>
                      </select>
                      <button title="Clear District" onClick={clearDistrict} className='border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-white w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">
                      {user.district}
                    </p>
                  )
                }
              </div>
              <div className="flex w-full">
                <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">City</p>
                {
                  editAddress ? (
                    <div className="flex w-2/5">
                      <select name="city" onChange={change} id="cityd" title='Your City' className='w-full border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md rounded-r-none border-r-0' required>
                      </select>
                      <button title="Clear City" onClick={clearCity} className='border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-white w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">
                      {user.city}
                    </p>
                  )
                }
              </div>
              <div className="flex w-full">
                <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Pincode</p>
                {
                  editAddress ? (
                    <div className="flex w-2/5">
                      <select name="pin" onChange={change} id="pind" title='Your Pincode' className='w-full border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md rounded-r-none border-r-0' required>
                      </select>
                      <button title="Clear Pincode" onClick={clearPin} className='border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white text-base rounded-md rounded-l-none border-l-0 px-2'>
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-white w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">
                      {user.pin}
                    </p>
                  )
                }
              </div>
            </div>
          </form>
        </div >
      </div>
    </div >
  );
};

export default Dashboard;