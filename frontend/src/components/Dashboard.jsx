"use client";

import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faCheck,
  faXmark,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = (props) => {
  const [progress, setProgress] = useState(0);
  const { push } = useRouter();
  const [user, setUser] = useState(props.user);
  const [profile, setProfile] = useState({
    name: props.user.name,
    available: props.user.available
  });
  const [personal, setPersonal] = useState({
    phoneNumber: props.user.phoneNumber,
    gender: props.user.gender,
    bloodGroup: props.user.bloodGroup,
    dob: new Date(props.user.dob).toISOString().slice(0, 10)
  });
  const [address, setAddress] = useState({
    city: props.user.city,
    district: props.user.district,
    state: props.user.state,
    pin: props.user.pin
  });
  const [isChecked, setIsChecked] = useState(props.user.available);
  const [editProfile, setEditProfile] = useState(false);
  const [editPersonal, setEditPersonal] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [logo, setLogo] = useState('');

  useEffect(() => {
    if (editAddress) {
      document.getElementById('stated').innerHTML = `<option value='${address.state}' class="hidden">${address.state == "" ? 'select state' : address.state}</option>`;
      document.getElementById('districtd').innerHTML = `<option value='${address.district}' class="hidden">${address.district == "" ? 'select district' : address.district}</option>`;
      document.getElementById('cityd').innerHTML = `<option value='${address.city}' class="hidden">${address.city == "" ? 'select city' : address.city}</option>`;
      document.getElementById('pind').innerHTML = `<option value='${address.pin}' class="text-gray-400">${address.pin == "" ? 'select pin' : address.pin}</option>`;
      for (let state in props.data) {
        let option = document.createElement("option");
        option.innerHTML = `${state}`
        option.setAttribute("value", `${state}`);
        option.setAttribute("class", 'text-gray-800');
        document.getElementById("stated").appendChild(option);
      }
      for (let state in props.data) {
        if (state == address.state) {
          for (let district in props.data[state]) {
            let option = document.createElement("option");
            option.innerHTML = `${district}`
            option.setAttribute("value", `${district}`);
            option.setAttribute("class", 'text-gray-800');
            document.getElementById("districtd").appendChild(option);
          }
        }
      }
      for (let state in props.data) {
        if (state == address.state) {
          for (let district in props.data[state]) {
            if (district == address.district) {
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
    }
  }, [props.data, editAddress]);

  useEffect(() => {
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

  const changeProfile = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setProfile({ ...profile, available: e.target.checked });
  };

  const changePersonal = (e) => {
    if (e.target.name != 'dob') {
      setPersonal({ ...personal, [e.target.name]: e.target.value });
    }
    else{
        const date = new Date(e.target.value);
        if (!isNaN(date.getTime())) {
          setPersonal({ ...personal, [e.target.name]: date.toISOString().slice(0, 10) });
        }
    }
    if (e.target.name === 'phoneNumber') {
      if (!(/[^0-9]/.test(e.target.value)) && (e.target.value.length == 10 || e.target.value.length == 8)) {
        e.target.setCustomValidity('');
      } else {
        e.target.setCustomValidity('Must have 10 or 8 digits only!');
      }
    }
  };

  const changeAddress = (e) => {
    if (e.target.name == 'state') {
      setAddress({ ...address, [e.target.name]: e.target.value, district: "", city: "", pin: "" });
      document.getElementById('districtd').innerHTML = '<option value="" class="hidden">select district</option>';
      document.getElementById('cityd').innerHTML = '<option value="" class="hidden">select city</option>';
      document.getElementById('pind').innerHTML = '<option value="" class="hidden">select pin</option>';
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
    }
    if (e.target.name == 'district') {
      setAddress({ ...address, [e.target.name]: e.target.value, city: "", pin: "" });
      document.getElementById('cityd').innerHTML = '<option value="" class="hidden">select city</option>';
      document.getElementById('pind').innerHTML = '<option value="" class="hidden">select pin</option>';
      for (let state in props.data) {
        if (state == address.state) {
          for (let district in props.data[state]) {
            if (district == e.target.value) {
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
    }
    if (e.target.name == 'city') {
      for (let state in props.data) {
        if (state == address.state) {
          for (let district in props.data[state]) {
            if (district == address.district) {
              for (let city in props.data[state][district]) {
                if (city == e.target.value) {
                  let zip = props.data[state][district][city];
                  document.getElementById("pind").innerHTML = `<option value='${zip}' class="text-gray-800">${zip}</option>`;
                  setAddress({ ...address, [e.target.name]: e.target.value, pin: zip });
                }
              }
            }
          }
        }
      }
    }
  };

  const clickProfile = () => {
    setEditProfile(true);
    setEditPersonal(false);
    setEditAddress(false);
  };
  const clickPersonal = () => {
    setEditPersonal(true);
    setEditProfile(false);
    setEditAddress(false);
  };
  const clickAddress = () => {
    setEditAddress(true);
    setEditProfile(false);
    setEditPersonal(false);
  };

  const closeProfile = () => {
    setEditProfile(false);
    setProfile({
      name: user.name,
      available: user.available
    });
    setIsChecked(user.available);
  };
  const closePersonal = () => {
    setEditPersonal(false);
    setPersonal({
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      bloodGroup: user.bloodGroup,
      dob: new Date(user.dob).toISOString().slice(0, 10)
    });
  };
  const closeAddress = () => {
    setEditAddress(false);
    setAddress({
      city: user.city,
      district: user.district,
      state: user.state,
      pin: user.pin
    });
  };

  const saveProfile = async (e) => {
    document.getElementById('prbd').disabled = true;
    e.preventDefault();
    setProgress(10);
    const cookies = parseCookies();
    const saveProfile = await fetch(`${props.HOST}/v1/updateProfile/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies["usertoken"],
      },
      body: JSON.stringify(profile),
    });
    setProgress(25);
    const response = await saveProfile.json();
    setProgress(50);
    if (response.message) {
      setUser({ ...user, name: profile.name, available: profile.available });
      setProgress(75);
      setEditProfile(false);
      toast.success(response.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      document.getElementById('prbd').disabled = false;
      setProgress(100);
    } else {
      toast.error('Unable to update!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      document.getElementById('prbd').disabled = false;
      setProgress(100);
    }
  };
  const savePersonal = async (e) => {
    document.getElementById('pebd').disabled = true;
    e.preventDefault();
    setProgress(10);
    const cookies = parseCookies();
    const savePersonal = await fetch(`${props.HOST}/v1/updateProfile/2`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies["usertoken"],
      },
      body: JSON.stringify(personal),
    });
    setProgress(25);
    const response = await savePersonal.json();
    setProgress(50);
    if (response.message) {
      setUser({ ...user, phoneNumber: personal.phoneNumber, gender: personal.gender, bloodGroup: personal.bloodGroup, dob: personal.dob });
      setProgress(75);
      setEditPersonal(false);
      toast.success(response.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      document.getElementById('pebd').disabled = false;
      setProgress(100);
    }
    else {
      toast.error('Unable to update!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      document.getElementById('pebd').disabled = false;
      setProgress(100);
    }
  };
  const saveAddress = async (e) => {
    document.getElementById('abd').disabled = true;
    e.preventDefault();
    setProgress(10);
    const cookies = parseCookies();
    const saveAddress = await fetch(`${props.HOST}/v1/updateProfile/3`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies["usertoken"],
      },
      body: JSON.stringify(address),
    });
    setProgress(25);
    const response = await saveAddress.json();
    setProgress(50);
    if (response.message) {
      setUser({ ...user, city: address.city, district: address.district, state: address.state, pin: address.pin });
      setProgress(75);
      setEditAddress(false);
      toast.success(response.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      document.getElementById('abd').disabled = false;
      setProgress(100);
    }
    else {
      toast.error('Unable to update!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      document.getElementById('abd').disabled = false;
      setProgress(100);
    }
  };

  const deleteAC = async () => {
    let confirmation = confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      setProgress(10);
      const cookies = parseCookies();
      const deleteProfile = await fetch(`${props.HOST}/v1//closeAccount`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies["usertoken"],
        },
      });
      setProgress(25);
      const response = await deleteProfile.json();
      setProgress(50);
      if (response.isAccountClosed) {
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
        setTimeout(() => {
          push("/logout");
        }, 2000);
      }
      else {
        toast.error('Unable to delete account!', {
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
      }
    }
  };

  return (
    <div className="w-[85%] flex items-start p-8 justify-center min-h-screen">
      <LoadingBar
        color='#b9003a'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="bg-[#1c1c1f] w-full px-8 rounded-lg shadow-lg shadow-black">
        <div className="w-full flex py-8 gap-1">
          <form onSubmit={saveProfile} className="flex items-start justify-between w-full">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-2xl font-bold">{logo}</span>
              </div>
              <div className="flex flex-col">
                {editProfile ?
                  <input id='nameD' type="text" name="name" value={profile.name} onChange={changeProfile} className='w-full rounded-md bg-transparent text-white border-2 border-solid border-gray-400 text-xl outline-none' required /> :
                  <p className="text-xl border-2 border-solid border-[#1c1c1f] text-white">
                    {user.name}
                  </p>
                }
                <p className="text-gray-400 px-1">{user.email}</p>
                {
                  editProfile ?
                    <div className="px-1 flex gap-1">
                      <input type="checkbox" id="availabled" checked={isChecked} onChange={handleCheckboxChange} className='accent-cyan-500' />
                      <label htmlFor="available" className='text-white'>Available to Donate ? </label>
                    </div>
                    :
                    (user.available === true ?
                      <span className="flex items-center text-green-600 px-1">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <p>Available</p>
                      </span>
                      :
                      <span className="flex items-center text-red-600 px-1">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <p>Not Available</p>
                      </span>)
                }
              </div>
            </div>
            {editProfile ?
              <div className="flex gap-2">
                <button id="prbd" type="submit" className="text-green-500 text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faCheck} /></button>
                <button onClick={closeProfile} className="text-red-500 text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faXmark} /></button>
              </div>
              :
              <button onClick={clickProfile} className="text-white text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faPen} /></button>
            }
          </form>
          <div>
            <button onClick={deleteAC} title="Delete Account" className="text-red-500 p-2 text-xs border border-red-500 rounded-md">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        <form onSubmit={savePersonal} className="flex flex-col pb-8 gap-4">
          <div className="flex justify-between">
            <legend className="text-white text-lg">Personal information</legend>
            {editPersonal ?
              <div className="flex gap-2">
                <button id="pebd" type="submit" className="text-green-500 text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faCheck} /></button>
                <button onClick={closePersonal} className="text-red-500 text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faXmark} /></button>
              </div>
              :
              <button onClick={clickPersonal} className="text-white text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faPen} /></button>
            }
          </div>
          <div className="flex w-full">
            <div className="w-1/2 flex flex-col items-start gap-1">
              <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Contact Number</p>
              <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Gender</p>
              <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Blood Group</p>
              <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Date of Birth</p>
            </div>
            {editPersonal ?
              <div className="w-1/2 flex flex-col items-start gap-1">
                <input id='cd' type="tel" name="phoneNumber" value={personal.phoneNumber} onChange={changePersonal} className='w-2/5 border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md' maxLength={10} required />
                <select name="gender" onChange={changePersonal} id="gd" defaultValue={personal.gender} title='Your Gender' className='w-2/5 border-2 h-[2rem] border-solid border-gray-500 outline-none bg-transparent text-white rounded-md' required>
                  <option value="male" className='text-gray-800'>male</option>
                  <option value="female" className='text-gray-800'>female</option>
                  <option value="others" className='text-gray-800'>others</option>
                </select>
                <select id='bd' name="bloodGroup" defaultValue={personal.bloodGroup} title='Your Blood Group' onChange={changePersonal} className='w-2/5 h-[2rem] border-2 border-solid border-gray-500 outline-none bg-transparent text-white rounded-md' required>
                  <option value="A+" className='text-gray-800'>A+</option>
                  <option value="B+" className='text-gray-800'>B+</option>
                  <option value="O+" className='text-gray-800'>O+</option>
                  <option value="A-" className='text-gray-800'>A-</option>
                  <option value="B-" className='text-gray-800'>B-</option>
                  <option value="O-" className='text-gray-800'>O-</option>
                  <option value="AB+" className='text-gray-800'>AB+</option>
                  <option value="AB-" className='text-gray-800'>AB-</option>
                </select>
                <input className='w-2/5 h-[2rem] border-2 border-solid border-gray-500 outline-none bg-transparent text-white rounded-md date-input' type="date" id="dobd" name="dob" value={personal.dob} onChange={changePersonal}  required />
              </div>
              :
              <div className="w-1/2 flex flex-col items-start gap-1">
                <div className="w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f] text-white">
                  {user.phoneNumber}
                </div>
                <div className="w-2/ flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f] text-white">
                  {user.gender}
                </div>
                <div className="w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f] text-white">
                  {user.bloodGroup}
                </div>
                <div className="w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f] text-white">
                  {new Date(user.dob).toDateString()}
                </div>
              </div>
            }
          </div>
        </form>
        <form onSubmit={saveAddress} className="flex flex-col pb-8 gap-4">
          <div className="flex justify-between">
            <legend className="text-white text-lg">Address</legend>
            {editAddress ?
              <div className="flex gap-2">
                <button id="abd" type="submit" className="text-green-500 text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faCheck} /></button>
                <button onClick={closeAddress} className="text-red-500 text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faXmark} /></button>
              </div>
              :
              <button onClick={clickAddress} className="text-white text-xs p-2 border border-gray-600 rounded-md"><FontAwesomeIcon icon={faPen} /></button>
            }
          </div>
          <div className="flex w-full">
            <div className="w-1/2 flex flex-col items-start gap-1">
              <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">State</p>
              <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">District</p>
              <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">City</p>
              <p className="text-gray-400 w-2/5 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">Pincode</p>
            </div>
            {editAddress ?
              <div className="w-1/2 flex flex-col items-start gap-1">
                <select name="state" onChange={changeAddress} id="stated" title='Your State' className='w-1/2 border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md' required>
                </select>
                <select name="district" onChange={changeAddress} id="districtd" title='Your District' className='w-1/2 border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md' required>
                </select>
                <select name="city" onChange={changeAddress} id="cityd" title='Your City' className='w-1/2 border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md' required>
                </select>
                <select name="pin" onChange={changeAddress} id="pind" title='Your Pincode' className='w-1/2 border-2 border-solid h-[2rem] border-gray-500 outline-none bg-transparent text-white rounded-md' required>
                </select>
              </div>
              :
              <div className="w-1/2 flex flex-col items-start gap-1">
                <p className="text-white w-1/2 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">
                  {user.state}
                </p>
                <p className="text-white w-1/2 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">
                  {user.district}
                </p>
                <p className="text-white w-1/2 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">
                  {user.city}
                </p>
                <p className="text-white w-1/2 flex items-center h-[2rem] border-2 border-solid border-[#1c1c1f]">
                  {user.pin}
                </p>
              </div>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
