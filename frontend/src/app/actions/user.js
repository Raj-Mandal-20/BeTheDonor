"use server"

import { getSession } from "./auth";
import { revalidatePath } from "next/cache";

export const getUser = async (userId) => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/fetchUserByUserID`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
            body: JSON.stringify({ userId }),
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const getCurrentUser = async () => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/my-profile`, {
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

export const login = async (email, password) => {
    try {
        const response = await fetch(`${process.env.HOST}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const updateProfile = async (data, sectionId) => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/updateProfile/${sectionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
            body: JSON.stringify(data),
        });
        const parsedResponse = await response.json();
        if (parsedResponse.message === "Profile Updated Successfully") {
            revalidatePath('/myprofile/dashboard');
            revalidatePath('/allrequests');
        }
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const deleteProfile = async () => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/closeAccount`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
        });
        const parsedResponse = await response.json();
        return parsedResponse;

    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const updateEmail = async (emailId) => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/mailChange`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
            body: JSON.stringify({ emailId }),
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const submitOTP = async (otp, otpId) => {
    try {
        const userToken = await getSession();
        const response = await fetch(`${process.env.HOST}/v1/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
            body: JSON.stringify({ otp, otpId }),
        });
        const parsedResponse = await response.json();
        if(parsedResponse.statusCode === 200) {
            revalidatePath('/myprofile/dashboard');
            revalidatePath('/allrequests');
        }
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const register = async (data) => {
    try {
        const response = await fetch(`${process.env.HOST}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}

export const forgetPassword = async (email) => {
    try {
        const response = await fetch(`${process.env.HOST}/auth/forgetPassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        return { message: error.message, statusCode: 408 };
    }
}