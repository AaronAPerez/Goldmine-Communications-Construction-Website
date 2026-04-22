import { useInView, motion } from 'framer-motion';
import { ZoomIn, MapPin } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react'
import { ImageCardProps } from './types';




const ImageCard = ({ image, index, onClick }: ImageCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer
                 shadow-lg hover:shadow-2xl transition-all duration-500"
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Zoom Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-3 bg-white/90 rounded-full">
          <ZoomIn className="w-6 h-6 text-gray-900" />
        </div>
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 text-white/90 text-sm mb-1">
          <MapPin className="w-4 h-4 text-gold-400" />
          <span>{image.location}</span>
        </div>
        <p className="text-white text-sm font-medium line-clamp-2">{image.description}</p>
      </div>
    </motion.div>
  );
};

export default ImageCard