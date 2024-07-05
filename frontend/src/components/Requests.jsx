'use client'
import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import BloodRequest from './BloodRequest';
const Requests = (props) => {
    const cookies = parseCookies();
    const  [allRequests, setAllRequests] = useState([]);
    useEffect(()=>{
        const fetchRequests = async () => {
            const requests = await fetch(`${props.HOST}/v1/all-blood-request`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + cookies["usertoken"]
                }
            });
            const res = await requests.json();
            console.log(res);
            setAllRequests(res.allBloodRequest);
        }
        return ()=>{
            fetchRequests();
        }
    }, [allRequests]);





    return (    
        <div className="bg-[#051a39] p-5 h-full flex flex-wrap gap-8 justify-center">
            
            { allRequests.length > 0 && allRequests.map((request, index) => {
               return  <BloodRequest key={index} request={request} HOST={props.HOST}/>
            })}
            {
                allRequests.length === 0 && <div className="text-white text-2xl h-[23rem]">No Blood Requests</div>
            }
        </div>
    )
}

export default Requests
















