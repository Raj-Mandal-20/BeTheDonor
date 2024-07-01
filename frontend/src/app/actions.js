'use server'

export async function getHost() {
    return process.env.HOST;
}