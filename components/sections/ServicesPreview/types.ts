// components/sections/ServicesPreview/types.ts
// TypeScript interfaces for Services Preview components

import { LucideIcon } from 'lucide-react';

/**
 * Service category data structure
 * Represents a category of services (Commercial, Residential, etc.)
 */
export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string | null;
  color: string;
  services: string[];
}

/**
 * Featured service data structure
 * Represents a highlighted service with image
 */
export interface FeaturedService {
  id: string;
  title: string;
  description: string;
  image: string;
}

/**
 * Props for ServiceCategoryCard component
 */
export interface ServiceCategoryCardProps {
  category: ServiceCategory;
  index: number;
  isInView: boolean;
}

/**
 * Props for FeaturedServiceCard component
 */
export interface FeaturedServiceCardProps {
  service: FeaturedService;
  index: number;
  isInView: boolean;
}
