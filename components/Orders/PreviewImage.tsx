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
        <div className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center p-4 z-10">
            <button onClick={onClose}
                className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg z-10 hover:bg-red-700 transition-colors">
                Close
            </button>

            <div className="overflow-y-auto columns-[100px] p-4">
                {files.map((file, index) => (
                    <div key={index}
                        onClick={() => handleMediaClick(file)}>
                        {file.type.startsWith("image/") ? (
                            <Image src={file.url} alt={`media-${index}`} width={320} height={320} className="rounded-lg hover:scale-105 transition-transform duration-300 mb-4 cursor-pointer" />
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
                    <div>
                        {selectedMedia.type.startsWith("image/") ? (
                            <Image src={selectedMedia.url} alt="Selected media" width={320} height={320} />
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