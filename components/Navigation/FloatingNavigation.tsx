'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, NetworkIcon, Phone, X, Menu, HardHatIcon, Building } from 'lucide-react';
import Image from 'next/image';


interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// Navigation items array moved outside component to prevent re-creation
const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
  { label: 'Communications', href: '/communications', icon: <NetworkIcon className="w-5 h-5" /> },
  { label: 'Construction', href: '/construction', icon: <HardHatIcon className="w-5 h-5" /> },
  { label: 'Projects', href: '/projects', icon: <Building className="w-5 h-5" /> },
  { label: 'Contact', href: '/contact', icon: <Phone className="w-5 h-5" /> },
];


export default function FloatingNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header role="banner" className="fixed left-0 right-0 z-40 w-full flex flex-col">
      {/* Position the navigation directly below the top bar */}
      <div className="mt-6">
        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`
            hidden md:block w-full
            transition-all duration-300
            ${isScrolled ? 'bg-black/70 shadow-lg backdrop-blur-md' : 'bg-black/70 shadow-lg backdrop-blur-md' }
          `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link 
                href="/" 
                className="flex-shrink-0 relative group"
                aria-label="Home"
              >
                <div className="relative w-48 h-14">
                  <Image
                    src="/images/logo/logo-banner.jpg"
                    alt="Goldmine Communications and Construction"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              {/* Navigation Items */}
              <nav className="flex items-center space-x-6" aria-label="Main navigation">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        relative px-3 py-2 rounded-lg transition-all duration-300
                        group flex items-center gap-2
                        text-shadow hover:text-shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black
                        ${isActive
                          ? 'text-[#B3995D] font-semibold'
                          : 'text-white hover:text-[#B3995D]'
                        }
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavBackground"
                          className="absolute inset-0 bg-white/10 rounded-lg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative">{item.icon}</span>
                      <span className="relative font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Navigation - Moved up for small screens */}
        <div className="md:hidden w-full bg-black/70 backdrop-blur-md shadow-lg overflow-hidden">
          <div className="container mx-auto p-3 flex items-center justify-between">
            {/* Mobile Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative w-32 h-12">
                <Image
                  src="/images/logo/logo-banner.jpg"
                  alt="Goldmine Communications and Construction"
                  fill
                  className="object-contain"
                  // priority
                />
              </div>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white hover:text-[#B3995D] transition-colors
                       focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-white/10"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3
                      transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold-400
                      ${pathname === item.href
                        ? 'bg-[#B3995D]/20 text-[#B3995D] font-semibold'
                        : 'text-white hover:bg-white/10 hover:text-[#B3995D]'
                      }
                    `}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
