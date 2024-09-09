"use server"

import { cookies } from 'next/headers';
import { verifySession } from '@/lib/token';

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

  // Return success with redirect information
  return {  success: true,  message: "Active session found",  redirect: "/dashboard"}
}