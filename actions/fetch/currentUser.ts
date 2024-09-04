"use server"

import { permanentRedirect, RedirectType } from 'next/navigation';
import { cookies } from 'next/headers'

//Import Needed Utils
import { verifySession } from '@/lib/token';

export async function getCurrentUser(){

    //Fetch Token, throw error if token does not exist
    const token = cookies().get('session')?.value
    if (!token) return permanentRedirect("/sign-in", RedirectType.replace)

    //Verify token, fetch user details and throw error if doesn't exists
    const userDetails = await verifySession(token)
    if (!userDetails) return permanentRedirect("/sign-in", RedirectType.replace)

    //Return user details
    return userDetails;

}
