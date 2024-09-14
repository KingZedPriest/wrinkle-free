"use client"

import { useState } from 'react';
import Image from 'next/image';

const MediaPreview = ({ files, onClose }: MediaPreviewProps) => {
    const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);

    //Functions
    const handleMediaClick = (file: MediaFile) => {
        setSelectedMedia(file);
    };

    const handleCloseFullscreen = () => {
        setSelectedMedia(null);
    };

    return (
        <div className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center p-4">
            <button onClick={onClose}
                className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg z-10 hover:bg-red-700 transition-colors">
                Close
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto max-h-[80vh] w-full max-w-6xl">
                {files.map((file, index) => (
                    <div key={index}
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => handleMediaClick(file)}>
                        {file.type.startsWith("image/") ? (
                            <Image src={file.url} alt={`media-${index}`} fill
                                style={{ objectFit: 'cover' }}
                                className="hover:scale-105 transition-transform duration-300" />
                        ) : (
                            <video
                                src={file.url}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        )}
                    </div>
                ))}
            </div>

            {selectedMedia && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={handleCloseFullscreen} >
                    <div className="relative w-[80%] h-[80%] max-w-4xl max-h-4xl">
                        {selectedMedia.type.startsWith("image/") ? (
                            <Image src={selectedMedia.url} alt="Selected media" fill
                                style={{ objectFit: 'cover' }} />
                        ) : (
                            <video src={selectedMedia.url} controls autoPlay className="w-full h-full"
                                style={{ maxHeight: '90vh' }} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaPreview;