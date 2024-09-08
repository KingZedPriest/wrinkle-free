import { SignJWT, jwtVerify } from 'jose';
import crypto from 'crypto';

// Secret key (should be a Uint8Array)
const secretKey = new TextEncoder().encode(process.env.SECRET_KEY || "whoGivesAFuck123^434)#43##@$#@__+@#_@^&*$#$@");
const ENCRYPTION_KEY = crypto.createHash('sha256').update(process.env.SECRET_KEY || "whoGivesAFuck123^434)#43##@$#@__+@#_@^&*$#$@").digest();
const IV_LENGTH = 16;

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

  // If payload contains 'adminDetails', return it directly
  const userDetails = payload.adminDetails ? payload.adminDetails : payload;

  return userDetails as Admin;
}


//Encrypt an admin password
export function encryptPassword(password: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

//Decrypt and admin password
export function decryptPassword(encryptedPassword: string): string {
  const [ivHex, encrypted] = encryptedPassword.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
