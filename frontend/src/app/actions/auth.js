"use server"

import { cookies } from 'next/headers'

export async function createSession(userToken) {
    try {
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        cookies().set('userToken', userToken, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: 'lax',
            path: '/',
        });
        return { message: 'Successfully logged in!', statusCode: 200 };
    } catch (error) {
        return { message: 'Unable to set the cookie!', statusCode: 408 };
    }
}

export async function deleteSession() {
    try {
        cookies().delete('userToken');
        return { message: 'Logged Out Successfully!', statusCode: 200 };
    } catch (error) {
        return { message: 'Unable to delete the cookie!', statusCode: 408 };
    }
}

export async function getSession() {
    try {
        return cookies().get('userToken')?.value;
    } catch (error) {
        return false;
    }
}