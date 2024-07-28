import React from 'react';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { getHost } from '../../actions';
import SearchDonations from '@/components/SearchDonations';
import data from "../../../data.json";

const fetchDonations = async () => {
  const cookieStore = cookies();
  const requests = await fetch(`${process.env.HOST}/v1/donation-history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookieStore.get("usertoken").value,
    },
  }, { cache: 'no-store' });
  const res = await requests.json();
  return res.donates;
};

const page = async () => {
  if (!cookies().has('usertoken')) {
    redirect("/login")
  }
  let host = await getHost();
  let allDonations = await fetchDonations();
  return (
    <SearchDonations allDonations={allDonations} host={host} data={data} />
  )
}

export default page;