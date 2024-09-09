"use server"

import { cookies } from 'next/headers';

//Utils and Server Actions
import { verifySession } from '@/lib/token';
import getAdmin from './getAnyAdmin';

export async function checkOnline() {
    
  // Fetch Token, return false if it doesn't exist
  const token = cookies().get('session')?.value
  if (!token) {
    return { success: false, message: "No Session seen", redirect: null }
  }

  // Verify token, fetch user details and return error if doesn't exist
  const userDetails = await verifySession(token)
  if (!userDetails) {
    return { success: false, message: "User details not found", redirect: null }
  }

  //Check and make sure the current details and the database details are the same
  const currentAdmin = await getAdmin(userDetails.id)
  if (!currentAdmin) {
    return { success: false, message: "User details not found", redirect: null }
  }

  // Return success with redirect information
  return {  success: true,  message: "Active session found",  redirect: "/dashboard"}
}