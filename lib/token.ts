import { SignJWT, jwtVerify } from 'jose';
import crypto from 'crypto';

// Secret key (should be a Uint8Array)
const secretKey = new TextEncoder().encode(process.env.SECRET_KEY!);

// Function to sign and encode the user details
export async function signSession(adminDetails: object) {
  const jwt = await new SignJWT({ adminDetails })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secretKey);

  return jwt;
}

// Function to verify and decode the user details
export async function verifySession(token: string) {
  const { payload } = await jwtVerify(token, secretKey);
  return payload as unknown as Admin;
}

// Function to encrypt users password
export function hashPassphrase(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}
