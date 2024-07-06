"use client";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import BloodRequest from "./BloodRequest";
import HashLoader from "react-spinners/HashLoader";

const Requests = (props) => {
  const cookies = parseCookies();
  const [loading, setLoading] = useState(true);
  console.log(props);
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${props.HOST}/v1/all-blood-request`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies["usertoken"],
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setAllRequests(data.allBloodRequest);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (!allRequests.length) {
      fetchRequests();
      fetchRequests()
    }
  }, [props.HOST, allRequests.length, cookies]);

  return (
    <div className="bg-[#051a39] p-5 h-full flex flex-wrap gap-8 justify-center">
      {loading && (
        <HashLoader 
          color={'white'}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {!loading && (
        <>
          {allRequests?.length > 0 ? (
            allRequests.map((request, index) => (
              <BloodRequest key={index} request={request} HOST={props.HOST} />
            ))
          ) : (
            <div className="text-white text-2xl h-[23rem]">
              No Blood Requests
            </div>
          )}
        </>
      )}
    </div>
  );
};

// export async function getServerSideProps({ params, req }) {
//   const host = req.headers.host;
//   const protocol = req.headers["x-forwarded-proto"] || "http";
//   const baseUrl = `${protocol}://${host}`;

//   try {
//     const response = await fetch(`${baseUrl}/v1/all-blood-request`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + cookies["usertoken"],
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     const data = await response.json();

//     return {
//       props: {
//         initialPost: {
//           allBloodRequest: data.allBloodRequest || [], // Ensure allBloodRequest is defined
//         },
//         HOST: baseUrl,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching initial data:", error);
//     return {
//       props: {
//         initialPost: {
//           allBloodRequest: [], // Provide default empty array on error
//         },
//         HOST: baseUrl,
//         message : 'server site rendering'
//       },
//     };
//   }
// }

export default Requests;
