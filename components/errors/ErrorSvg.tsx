import React from 'react';

/**
 * Props for the ErrorSvg component
 */
interface ErrorSvgProps {
  /**
   * Type of error to display illustration for
   * @default 500
   */
  errorType?: number;
  
  /**
   * Optional width for the SVG
   * @default '100%'
   */
  width?: string | number;
  
  /**
   * Optional height for the SVG
   * @default '100%'
   */
  height?: string | number;
}

/**
 * Component that provides different error illustrations based on error type
 */
export const ErrorSvg = ({
  errorType = 500,
  width = '100%',
  height = '100%'
}: ErrorSvgProps) => {
  // Common SVG props
  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 400 300",
    fill: "none",
    width,
    height,
    role: "img",
    'aria-hidden': true,
  };

  // Return appropriate SVG based on error type
  switch (errorType) {
    // 404 Not Found illustration
    case 404:
      return (
        <svg {...svgProps}>
          <path fill="#F0F0F0" d="M200 250c55.228 0 100-44.772 100-100S255.228 50 200 50 100 94.772 100 150s44.772 100 100 100z" />
          <path fill="#D1FAE5" d="M200 230c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" opacity=".7" />
          <path stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M160 170l80-80M160 90l80 80" />
          <path stroke="#059669" strokeLinecap="round" strokeWidth="8" d="M140 200h120" />
          <path fill="#059669" d="M190 60h20v40h-20z" />
          <path fill="#059669" d="M190 200h20v40h-20z" />
        </svg>
      );

    // 403 Forbidden illustration
    case 403:
      return (
        <svg {...svgProps}>
          <path fill="#F0F0F0" d="M200 250c55.228 0 100-44.772 100-100S255.228 50 200 50 100 94.772 100 150s44.772 100 100 100z" />
          <path fill="#D1FAE5" d="M190 180h20v30h-20z" />
          <rect width="140" height="100" x="130" y="80" fill="#D1FAE5" opacity=".5" rx="10" />
          <rect width="140" height="100" x="130" y="80" stroke="#059669" strokeWidth="6" rx="10" />
          <path fill="#059669" d="M180 125h40v30a20 20 0 01-20 20v0a20 20 0 01-20-20v-30z" />
          <path stroke="#059669" strokeLinecap="round" strokeWidth="6" d="M180 110h40" />
          <circle cx="165" cy="110" r="5" fill="#059669" />
          <circle cx="235" cy="110" r="5" fill="#059669" />
        </svg>
      );
      
    // 401 Unauthorized illustration  
    case 401:
      return (
        <svg {...svgProps}>
          <path fill="#F0F0F0" d="M200 250c55.228 0 100-44.772 100-100S255.228 50 200 50 100 94.772 100 150s44.772 100 100 100z" />
          <rect width="140" height="100" x="130" y="80" fill="#D1FAE5" opacity=".5" rx="10" />
          <rect width="140" height="100" x="130" y="80" stroke="#059669" strokeWidth="6" rx="10" />
          <circle cx="200" cy="115" r="25" stroke="#059669" strokeWidth="6" />
          <path stroke="#059669" strokeLinecap="round" strokeWidth="6" d="M200 140v25" />
          <rect width="40" height="6" x="180" y="140" fill="#059669" rx="3" />
          <circle cx="200" cy="170" r="8" fill="#059669" />
        </svg>
      );

    // 500 Server Error and default illustration
    default:
      return (
        <svg {...svgProps}>
          <path fill="#F0F0F0" d="M200 250c55.228 0 100-44.772 100-100S255.228 50 200 50 100 94.772 100 150s44.772 100 100 100z" />
          <path fill="#D1FAE5" d="M120 100h160v100H120z" opacity=".5" />
          <path stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M120 100h160v100H120z" />
          <path stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M160 150h80" />
          <path fill="#059669" stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M200 125l10 25-25-10 15-15z" />
          <path stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M175 225h50" />
          <path stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M200 200v25" />
          <circle cx="200" cy="150" r="75" stroke="#059669" strokeDasharray="15 15" strokeWidth="4" />
        </svg>
      );
  }
};