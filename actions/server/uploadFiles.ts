"use server"

// Libs
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { generateFileName } from "@/lib/fileUpload";

// Environment Variables
const region = process.env.AWS_BUCKET_REGION!;
const accessKey = process.env.AWS_ACCESS_KEY!;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY!;
const bucketName = process.env.AWS_BUCKET_NAME!;
const fileSize = process.env.FILE_SIZE!;

console.log({region, accessKey, secretKey, bucketName, fileSize })

// S3 Config
const s3 = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    }
});

const acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm"];
const maxFileSize = 1024 * 1024 * parseInt(fileSize);

export async function getSignedURL(fileName: string, type: string, size: number, checksum: string, name: string) {

    // Validate file type and size
    if (!acceptedTypes.includes(type)) {
        return { failure: "Invalid file type" };
    }

    if (size > maxFileSize) {
        return { failure: "File too large" };
    }

    // Prepare S3 upload command
    const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: `${generateFileName()}_${fileName}`,
        ContentType: type,
        ContentLength: size,
        ChecksumSHA256: checksum,
        Metadata: {
            userName: name
        }
    });

    // Create signed URL
    const signedUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 3600 });
    
    return { success: { url: signedUrl } };
}
