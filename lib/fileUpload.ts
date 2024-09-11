import { webcrypto } from 'crypto'

export const computeSHA256 = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer()
  let hashBuffer: ArrayBuffer

  if (typeof window === 'undefined') {
    // Server-side (Node.js)
    hashBuffer = await webcrypto.subtle.digest('SHA-256', buffer)
  } else {
    // Client-side (Browser)
    hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  }

  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export const generateFileName = (bytes = 16): string => {
  if (typeof window === 'undefined') {
    // Server-side (Node.js)
    return webcrypto.randomUUID().replace(/-/g, '')
  } else {
    // Client-side (Browser)
    return crypto.randomUUID().replace(/-/g, '')
  }
}