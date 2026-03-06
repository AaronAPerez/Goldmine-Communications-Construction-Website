'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  CheckCircle2, 
  Award, 
  Heart,
  Shield,
  Lightbulb,
  Users,
  ArrowRight,
  TrendingUp,
  Phone,
  TrophyIcon,
} from 'lucide-react';
import Image from 'next/image';

/**
 * Core Values interface with improved structure
 */
interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  highlights: string[];
}


/**
 * Enhanced core values with more detail
 */
const coreValues: CoreValue[] = [
  {
    id: 'excellence',
    title: 'Excellence',
    description: 'Uncompromising quality standards in every project we undertake.',
    icon: <Award className="w-6 h-6" aria-hidden="true" />,
    color: 'from-gold-400 to-gold-600',
    highlights: ['Industry-leading standards', 'Quality assurance protocols', 'Continuous improvement']
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Pioneering solutions that set the pace for the industry.',
    icon: <Lightbulb className="w-6 h-6" aria-hidden="true" />,
    color: 'from-blue-500 to-blue-600',
    highlights: ['Cutting-edge technology', 'Forward-thinking approach', 'R&D investment']
  },
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'Honest, transparent practices that build lasting trust.',
    icon: <Shield className="w-6 h-6" aria-hidden="true" />,
    color: 'from-green-500 to-green-600',
    highlights: ['Ethical business practices', 'Transparent communication', 'Reliable partnerships']
  },
  {
    id: 'teamwork',
    title: 'Teamwork',
    description: 'Collaborative efforts that amplify our collective strength.',
    icon: <Users className="w-6 h-6" aria-hidden="true" />,
    color: 'from-purple-500 to-purple-600',
    highlights: ['Cross-functional collaboration', 'Shared expertise', 'Unified goals']
  },
  {
    id: 'dedication',
    title: 'Dedication',
    description: 'Relentless commitment to customer satisfaction and success.',
    icon: <Heart className="w-6 h-6" aria-hidden="true" />,
    color: 'from-red-500 to-red-600',
    highlights: ['Customer-first approach', '24/7 support', 'Long-term relationships']
  },
  {
    id: 'productivity',
    title: 'Productivity',
    description: 'Efficient solutions that maximize value and minimize waste.',
    icon: <TrendingUp className="w-6 h-6" aria-hidden="true" />,
    color: 'from-orange-500 to-orange-600',
    highlights: ['Streamlined processes', 'Cost optimization', 'Time efficiency']
  }
];


/**
 * Animation variants for consistent animations
 */
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay * 0.1,
      ease: [0.21, 1.11, 0.81, 0.99] as const
    }
  })
};

/**
 * Enhanced Value Card Component
 */
interface ValueCardProps {
  value: CoreValue;
  index: number;
  isInView: boolean;
}

const ValueCard = ({ value, index, isInView }: ValueCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUpVariants}
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group rounded-2xl p-8 shadow-lg hover:shadow-2xl 
               transition-all duration-500 hover:-translate-y-2 border border-gray-100
               hover:border-gold-200 relative overflow-hidden"
    >
      {/* Background gradient on hover - decorative */}
      <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0
                     group-hover:opacity-5 transition-opacity duration-500`} aria-hidden="true" />
      
      {/* Icon */}
      <div className='flex justify-start items-center mb-4'>
        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} 
                     flex items-center justify-center
                     group-hover:scale-110 transition-transform duration-300 mr-4`}>
          {value.icon}
        </div>
        <h4 className="text-xl font-semibold text-gray-900">{value.title}</h4>
      </div>
      {/* <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} 
                     flex items-center justify-center mb-6
                     group-hover:scale-110 transition-transform duration-300`}>
        {value.icon}
      </div> */}

      {/* Content */}
      <div className="relative">
        {/* <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
          {value.title}
        </h4> */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {value.description}
        </p>

        {/* Highlights - shown on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            height: isHovered ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <ul className="space-y-2">
            {value.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-600">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${value.color} mr-3`} aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10" aria-hidden="true">
        <div className={`w-full h-full bg-gradient-to-br ${value.color}
                       transform rotate-45 translate-x-10 -translate-y-10`} />
      </div>
    </motion.div>
  );
};



/**
 * Main About Services Section Component
 */
export default function AboutServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1
  });

  return (
    <section 
      ref={sectionRef} 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-labelledby="about-services-heading"
    >
      {/* Hero Section with Improved Title */}
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0}
        className="text-center mb-20"
      >
        <motion.div
          className="inline-block mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <span className="inline-flex items-center px-4 py-2 bg-[#B3995D] text-white shadow-2xl
                         rounded-full text-sm font-semibold border border-gold-200">
            <TrophyIcon className="w-4 h-4 mr-2" aria-hidden="true" />
            Excellence Since 2022
          </span>
        </motion.div>

        <h2 
          id="about-services-heading"
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
        >
          Where Legacy Meets{' '}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-700">
              Innovation
            </span>
            {/* Decorative underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
              style={{ transformOrigin: "left" }}
            />
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Welcome to Goldmine Communications, where our rich legacy of excellence and 
          pioneering innovation has positioned us as leaders in the industry.
        </p>
      </motion.div>

      {/* Company Story Section with Improved Image Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Content */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className="space-y-8"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Excellence Through Expert Management & 
              <span className="text-gold-600"> Seamless Services</span>
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              With expert management and seamless services, we uphold the highest standards 
              of integrity and dedication to our diverse customer base. We pride ourselves 
              on our extensive expertise and versatility in production, making us the best in class.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our steadfast commitment and highly productive team are driven by passion and 
              relentless dedication to problem-solving, maintaining uncompromising quality 
              standards tailored to each customer.
            </p>
          </div>

          {/* Key Commitments */}
          <div className="space-y-4">
            {[
              'Meeting deadlines with precision',
              'Reducing costs through efficiency',
              'Fostering collaborative efforts',
              'Exceeding industry standards'
            ].map((commitment, index) => (
              <motion.div
                key={commitment}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
                className="flex items-center gap-6 shadow-sm 
                         border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-gold-400 to-gold-600 rounded-l-xl flex items-center justify-center" aria-hidden="true">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{commitment}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.0 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-400 to-[#B3995D]
                       text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300
                       hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
            >
              <Phone className="w-5 h-5 mr-3" aria-hidden="true" />
              Get a Quote
              <ArrowRight className="w-5 h-5 ml-3" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        {/* Image Grid Layout */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4 h-[600px]">
            {/* Large image - spans full height on left */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/projects/Sparks-NV/tree-tower-network.jpg"
                alt="Goldmine team working on telecommunications tree tower"
                fill
                quality={60}
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="bg-gold-400/90 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Professional Excellence
                </span>
              </div>
            </div>

            {/* Two smaller images stacked on right */}
            <div className="flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-xl flex-1">
                <Image
                  src="/images/projects/Oregon-AV-Station/trench/trench-pipes.jpg"
                  alt="Advanced technology implementation"
                  fill
                  quality={60}
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 250px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl flex-1">
                <Image
                  src="/images/projects/Bodega-Bay-CA/bulldozer-4.jpg"
                  alt="EV charging infrastructure"
                  fill
                  quality={60}
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 250px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Achievement Cards */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border border-gold-400"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-600 mb-1">100+</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 1.0 }}
            className="absolute -top-10 -right-3  bg-gradient-to-r from-gold-400 to-[#B3995D] rounded-2xl shadow-2xl p-4"
          >
            <div className="text-center text-white">
              <div className="text-2xl font-bold mb-1 text-shadow-lg">Lic# 1099543</div>
              <div className="text-sm text-black font-medium">Licensed & Insured</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Service Categories Section */}
      {/* <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={3}
        className="mb-20"
      >
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Portfolio
            </span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From cutting-edge communications to precision construction, we deliver 
            integrated solutions that exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceCategories.map((category, index) => (
            <ServiceCategoryCard
              key={category.id}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div> */}

      {/* Core Values Section */}
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={4}
        className="mb-20"
      >
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Foundation Principles
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These core values guide every decision we make and every project we undertake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreValues.map((value, index) => (
            <ValueCard
              key={value.id}
              value={value}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={5}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
          {/* Background pattern - decorative */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              Setting the Pace for Tomorrow
            </h3>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-6 leading-relaxed">
              At Goldmine Communications, we don&apos;t just keep pace with the latest industry 
              demands; we set the pace. Founded on principles of optimism, teamwork, creativity, 
              resourcefulness, exacting standards, unwavering productivity, safety, integrity, 
              dedication, and customer satisfaction.
            </p>
            
            <div className="bg-gold-400/10 backdrop-blur-sm rounded-2xl p-4 border border-gold-400/20 max-w-4xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-semibold text-gold-400 mb-4 italic">
                &quot;Join us on this journey towards a future where business is not just efficient but transformative.&quot;
              </blockquote>
              <p className="text-gray-300 text-lg">
                Thank you for choosing Goldmine Communications, where elevating and delivering is our commitment.
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gold-400/5 rounded-full -translate-y-20 translate-x-20" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold-400/5 rounded-full translate-y-30 -translate-x-30" aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  );
}