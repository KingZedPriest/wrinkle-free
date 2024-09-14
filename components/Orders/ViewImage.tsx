"use client"


import { useState } from 'react';
import Image from 'next/image';



const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(image)}
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative w-3/4 h-3/4">
            <Image
              src={selectedImage}
              alt="Selected image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;