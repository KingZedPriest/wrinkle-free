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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map((item, index) => (
          <div key={index} className="relative aspect-square">
            {item.type === 'image' ? (
              <Image src={item.url} alt={`Media ${index + 1}`} fill style={{ objectFit: 'cover' }}
                className="rounded-lg cursor-pointer"
                onClick={() => setSelectedUrl(item.url)}
              />
            ) : (
              <video src={item.url}className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => setSelectedUrl(item.url)}
              />
            )}
          </div>
        ))}
      </div>
      {selectedUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedUrl(null)} >
          <div className="relative w-3/4 h-3/4">
            {getMediaType(selectedUrl) === 'image' ? (
              <Image src={selectedUrl} alt="Selected media" fill
                style={{ objectFit: 'contain' }} />
            ) : (
              <video src={selectedUrl} className="w-full h-full" style={{ objectFit: 'contain' }}
                controls  autoPlay
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;