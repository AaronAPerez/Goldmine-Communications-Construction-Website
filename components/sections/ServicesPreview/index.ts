// components/sections/ServicesPreview/index.ts
// Barrel export for ServicesPreview module
// Provides clean imports for consuming components

// Main component export
export { default } from './ServicesPreviewSection';
export { default as ServicesPreviewSection } from './ServicesPreviewSection';

// Sub-component exports (for reuse in other parts of the app)
export { default as ServiceCategoryCard } from './ServiceCategoryCard';
export { default as FeaturedServiceCard } from './FeaturedServiceCard';

// Data exports (for use in services page or other components)
export { serviceCategories, featuredServices } from './services-data';

// Type exports
export type {
  ServiceCategory,
  FeaturedService,
  ServiceCategoryCardProps,
  FeaturedServiceCardProps
} from './types';
