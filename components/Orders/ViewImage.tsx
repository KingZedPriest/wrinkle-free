"use client"

import { useState, useMemo } from 'react';
import Image from 'next/image';

type GalleryProps = {
  mediaUrls: string[];
};

const getMediaType = (url: string): 'image' | 'video' => {
  const extension = url.split('.').pop()?.toLowerCase();
  return ['mp4', 'webm', 'ogg', 'mov'].includes(extension || '') ? 'video' : 'image';
};

const Gallery = ({ mediaUrls }: GalleryProps) => {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const mediaItems = useMemo(() =>
    mediaUrls.map(url => ({
      url,
      type: getMediaType(url)
    })),
    [mediaUrls]
  );

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-y-auto columns-[100px] p-4">
        {mediaItems.map((item, index) => (
          <div key={index} onClick={() => setSelectedUrl(item.url)}>
            {item.type === 'image' ? (
              <Image src={item.url} alt={`Media ${index + 1}`} width={320} height={320}
                className="hover:scale-105 transition-transform duration-300 mb-4 cursor-pointer rounded-lg" />
            ) : (
              <video src={item.url} className="w-full h-full object-cover rounded-lg cursor-pointer" />
            )}
          </div>
        ))}
      </div>
      {selectedUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedUrl(null)} >
          <div>
            {getMediaType(selectedUrl) === 'image' ? (
              <Image src={selectedUrl} alt="Selected media" width={320} height={320} />
            ) : (
              <video src={selectedUrl} className="w-full h-full" style={{ objectFit: 'contain' }} controls autoPlay />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;