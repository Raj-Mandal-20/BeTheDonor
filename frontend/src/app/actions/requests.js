"use server"

import { getSession } from "./auth";
import { revalidatePath } from "next/cache";

export const getAllRequests = async () => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/all-blood-request`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
        }, { cache: 'no-store' });
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
};

export const acceptRequest = async (requestId) => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/donation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
            body: JSON.stringify({ requestId }),
        });
        const parsedResponse = await response.json();
        if (parsedResponse.bloodRequest) {
            revalidatePath('/allrequest');
            revalidatePath('/myprofile/acceptedrequests');
            revalidatePath('/myprofile/dashboard');
        }
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const getAcceptedRequests = async () => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/donation-history`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
        }, { cache: 'no-store' });
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const getMyRequests = async () => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/request-history`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
        }, { cache: 'no-store' });
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const getAcceptors = async (requestId) => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/donorlist/${requestId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            }
        }, { cache: 'no-store' });
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const deleteRequest = async (requestId) => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/deleteRequest?requestId=${requestId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
        });
        const parsedResponse = await response.json();
        if (parsedResponse.statusCode === 200) {
            revalidatePath('/myprofile/myrequests');
            revalidatePath('/myprofile/dashboard');
            revalidatePath('/allrequests');
        }
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const toggleRequestStatus = async (requestId) => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/toggleRequestStatus`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
            body: JSON.stringify({ requestId })
        });
        const parsedResponse = await response.json();
        if (parsedResponse.statusCode === 200) {
            revalidatePath('/myprofile/myrequests');
            revalidatePath('/allrequests');
        }
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const createRequest = async (data) => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/create-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
            body: JSON.stringify(data),
        });
        const parsedResponse = await response.json();
        if (parsedResponse.bloodRequest) {
            revalidatePath('/myprofile/myrequests');
            revalidatePath('/allrequests');
            revalidatePath('/myprofile/dashboard');
        }
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}