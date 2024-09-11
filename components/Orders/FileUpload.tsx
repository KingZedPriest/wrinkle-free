"use client"

import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { toast } from "sonner";

//Server Actions
import { getSignedURL } from "@/actions/server/uploadFiles";

//Libs
import { makeApiRequest } from "@/lib/apiUtils";
import { computeSHA256 } from "@/lib/fileUpload";


const FileUpload = ({ name, upload, onStateChange }: uploadProps) => {

    const [files, setFiles] = useState<File[]>([]);
    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const [uploadedFilesUrl, setUploadedFilesUrl] = useState<string[]>([]);
    const [preview, setPreview] = useState<boolean>(false);

    //UseEffect
    useEffect(() => {
        onStateChange(uploadedFilesUrl)
      }, [uploadedFilesUrl, onStateChange])

    //Functions
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        setFiles(selectedFiles);

        // Revoke previous URLs
        fileUrls.forEach(url => URL.revokeObjectURL(url));

        // Create new URLs
        const newFileUrls = selectedFiles.map(file => URL.createObjectURL(file));
        setFileUrls(newFileUrls);
    }

    const handlePreviewToggle = () => {
        setPreview(!preview);
    };

    //AWS File Upload Function
    if (upload) {
        const uploadFiles = async () => {
            toast.info("Uploading Media Files...")

            if (!files.length) {
                return;
            }
            try {
                const newUploadedUrls: string[] = [];

                // Map through all the files and process each one
                const uploadPromises = files.map(async (file) => {
                    const checksum = await computeSHA256(file);
                    const signedUrlResponse: SignedUrlResponse = await getSignedURL(file.name, file.type, file.size, checksum, name);

                    if (signedUrlResponse.failure) {
                        console.error(`Failed to upload ${file.name}: ${signedUrlResponse.failure}`);
                        return;
                    }

                    const url = signedUrlResponse.success?.url;
                    if (!url) {
                        console.error(`No URL returned for ${file.name}`);
                        return;
                    }
                    await makeApiRequest(url, 'put', file, {
                        headers: { 'Content-Type': file.type },
                    });
                    newUploadedUrls.push(url.split("?")[0]);
                });

                // Wait for all uploads to complete, throw a toast, and then
                await Promise.all(uploadPromises);
                setUploadedFilesUrl(prevUrls => [...prevUrls, ...newUploadedUrls]);
                toast.message("Files uploaded successfully");

            } catch (error) {
                console.error("Error uploading files:", error);
                toast.error("Failed to upload files");
            }
        };

        uploadFiles()
    }

    return (
        <main>
            <div className="flex flex-col gap-y-1">
                <label htmlFor="media">Select Image(s) or Video(s)</label>
                <input onChange={handleChange} type="file" id="media" name="media" accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm" multiple className="bg-white dark:bg-black px-2 xl:px-4 py-3 duration-300 focus:border-slate-200 focus:dark:border-slate-800 focus:outline-none rounded-lg" />
            </div>
            {fileUrls.length > 0 &&
                <button onClick={handlePreviewToggle} className="text-generalBlue dark:text-cloudBlue text-left">{preview ? 'Close Preview' : 'Preview Media'}</button>
            }
            {preview && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-wrap justify-center items-center z-50">
                    <button onClick={handlePreviewToggle}
                        className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg z-10">
                        Close Preview
                    </button>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
                        {fileUrls.map((url, index) => (
                            <div key={index} className="relative w-40 h-64">
                                {files[index].type.startsWith("image/") ? (
                                    <Image src={url} alt={`media-${index}`} fill className="object-cover rounded-lg" />
                                ) : (
                                    <video src={url} controls className="w-full h-full object-cover rounded-lg" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}

export default FileUpload;