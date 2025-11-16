import React from 'react';
import { motion } from 'framer-motion';


/**
 * Props for the MaintenancePage component
 */
interface MaintenancePageProps {
  /**
   * Title message for the maintenance page
   * @default "Site Under Maintenance"
   */
  title?: string;
  
  /**
   * Description message providing details about the maintenance
   * @default "We're currently improving our site to serve you better."
   */
  message?: string;
  
  /**
   * Optional expected completion time or date
   */
  estimatedCompletion?: string;
  
  /**
   * Optional contact information for urgent inquiries
   */
  contactInfo?: {
    email?: string;
    phone?: string;
    message?: string;
  };
  
  /**
   * Whether to show a countdown timer
   * @default false
   */
  showCountdown?: boolean;
  
  /**
   * Date when maintenance is expected to be complete
   * Required if showCountdown is true
   */
  completionDate?: Date;
  
  /**
   * Whether to show social media links
   * @default true
   */
  showSocial?: boolean;
}

/**
 * MaintenancePage component displays when site is in maintenance mode
 * Shows estimated completion time, contact info, and optional countdown
 */
export default function MaintenancePage({
  title = "Site Under Maintenance",
  message = "We're currently improving our site to serve you better.",
  estimatedCompletion,
  contactInfo,
  showCountdown = false,
  completionDate,
  showSocial = true
}: MaintenancePageProps) {
  // State to manage countdown timer
  const [timeRemaining, setTimeRemaining] = React.useState<{ 
    days: number; 
    hours: number; 
    minutes: number; 
    seconds: number 
  } | null>(null);
  
  // Calculate countdown if enabled and completionDate is provided
  React.useEffect(() => {
    if (!showCountdown || !completionDate) return;
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = completionDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Maintenance period is over
        setTimeRemaining(null);
        return;
      }
      
      // Calculate remaining time
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    // Calculate initial time
    calculateTimeRemaining();
    
    // Update countdown every second
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, [showCountdown, completionDate]);
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  // Social media links
  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/theglampingspot', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/theglampingspot', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/theglampingspot', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-gray-900 text-white">
      
      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-3xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Maintenance icon */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="p-3 bg-emerald-600 bg-opacity-30 rounded-full inline-flex">
            <svg className="w-16 h-16 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
        </motion.div>
        
        {/* Main heading */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          variants={itemVariants}
        >
          {title}
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {message}
        </motion.p>
        
        {/* Estimated completion */}
        {estimatedCompletion && (
          <motion.div 
            className="mb-8 p-4 bg-gray-800 bg-opacity-50 rounded-lg inline-block"
            variants={itemVariants}
          >
            <p className="text-emerald-300 font-medium">
              Expected completion: {estimatedCompletion}
            </p>
          </motion.div>
        )}
        
        {/* Countdown timer */}
        {showCountdown && timeRemaining && (
          <motion.div 
            className="mb-12"
            variants={itemVariants}
          >
            <p className="text-gray-300 mb-4">We&apos;ll be back in:</p>
            <div className="flex justify-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {timeRemaining.days}
                </div>
                <span className="text-sm mt-2 text-gray-400">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {timeRemaining.hours}
                </div>
                <span className="text-sm mt-2 text-gray-400">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {timeRemaining.minutes}
                </div>
                <span className="text-sm mt-2 text-gray-400">Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {timeRemaining.seconds}
                </div>
                <span className="text-sm mt-2 text-gray-400">Seconds</span>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Contact information */}
        {contactInfo && (
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <h2 className="text-lg font-medium mb-4">Need urgent assistance?</h2>
            <p className="text-gray-300 mb-4">{contactInfo.message || "Contact us:"}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {contactInfo.email && (
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {contactInfo.email}
                </a>
              )}
              
              {contactInfo.phone && (
                <a 
                  href={`tel:${contactInfo.phone}`} 
                  className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {contactInfo.phone}
                </a>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Social media links */}
        {showSocial && (
          <motion.div variants={itemVariants} className="mt-8">
            <p className="text-gray-400 mb-4">
              Follow us for updates:
            </p>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${link.name}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Browser notification */}
        <motion.div variants={itemVariants} className="mt-12 max-w-sm mx-auto">
          <button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors"
            onClick={() => {
              // Request notification permission
              if ('Notification' in window) {
                Notification.requestPermission().then(permission => {
                  if (permission === 'granted') {
                    // Store user's subscription in a database in a real app
                    alert('You will be notified when the site is back online!');
                  }
                });
              }
            }}
          >
            Notify me when the site is back
          </button>
          <p className="text-xs text-gray-400 mt-2">
            We&apos;ll send you a notification when we&apos;re back online.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}