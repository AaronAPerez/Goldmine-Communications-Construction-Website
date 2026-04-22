/**
 * Gallery Category Interface
 */
export interface GalleryCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  images: GalleryImage[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  location: string;
  description: string;
  category: string;
}

/**
 * Gallery Image Card Component
 */
export interface ImageCardProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}


/**
 * Lightbox Component
 */
export interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onIndexChange: (index: number) => void;
}