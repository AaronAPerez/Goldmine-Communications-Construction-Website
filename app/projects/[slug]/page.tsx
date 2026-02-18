import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Building, 
  ArrowLeft, 
  CheckCircle, 
  Tag
} from 'lucide-react';

// Project type definition
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  completionDate: string;
  client: string;
  location: string;
  tags: string[];
  highlights: string[];
  specifications?: {
    [key: string]: string;
  };
}

// Mock projects data - in a real app you would fetch this from an API or database
const projects: Project[] = [
  {
    id: 'fiber-network-2024',
    title: 'City-Wide Fiber Network Implementation',
    description: 'Complete fiber optic network installation covering metropolitan area with state-of-the-art connectivity solutions for businesses and residents.',
    category: 'communications',
    imageUrl: '/images/projects/fiber-network.jpg',
    completionDate: '2024-01',
    client: 'Metro City Council',
    location: 'Metropolitan Area',
    tags: ['Fiber Optics', 'Network Infrastructure', 'Urban Development'],
    highlights: [
      'Installed 200+ miles of fiber optic cable',
      'Connected 50,000+ households',
      'Achieved 99.99% network reliability',
      'Implemented redundant systems for disaster recovery',
      'Coordinated with multiple municipal agencies'
    ],
    specifications: {
      'Network Speed': '10Gbps',
      'Coverage Area': '150 sq miles',
      'Completion Time': '18 months',
      'Technology': 'Single-mode fiber',
      'Reliability': '99.99% uptime'
    }
  },
  {
    id: 'healthcare-facility-2023',
    title: 'Modern Healthcare Facility Construction',
    description: 'State-of-the-art medical facility featuring advanced communications infrastructure and sustainable building practices.',
    category: 'construction',
    imageUrl: '/images/projects/healthcare-facility.jpg',
    completionDate: '2023-11',
    client: 'Regional Health Network',
    location: 'San Jose, CA',
    tags: ['Healthcare', 'Sustainable Construction', 'Infrastructure'],
    highlights: [
      'Built 120,000 sq ft medical center',
      'Integrated advanced patient monitoring systems',
      'Achieved LEED Gold certification',
      'Implemented redundant power systems',
      'Incorporated telemedicine capabilities'
    ],
    specifications: {
      'Building Size': '120,000 sq ft',
      'Construction Time': '24 months',
      'Certification': 'LEED Gold',
      'Patient Capacity': '200+ beds',
      'Tech Integration': 'Full IoT implementation'
    }
  },
  {
    id: 'av-charging-oregon',
    title: 'Oregon AV Charging Infrastructure',
    description: 'Comprehensive implementation of EV charging stations with advanced infrastructure support and safety systems for sustainable transportation.',
    category: 'infrastructure',
    imageUrl: '/images/WorkOregonPics/image16.jpeg',
    completionDate: '2024-10',
    client: 'Oregon Transportation Authority',
    location: 'Chemult, Oregon',
    tags: ['EV Charging', 'Clean Energy', 'Infrastructure'],
    highlights: [
      'Installed high-capacity charging infrastructure',
      'Advanced safety systems integration',
      'Environmental compliance standards',
      'Complete site development and utilities',
      'Smart monitoring and control systems',
      'Future-ready scalable design'
    ],
    specifications: {
      'Charging Capacity': 'Up to 350kW DC Fast Charging',
      'Installation Type': 'Commercial Grade',
      'Safety Standards': 'UL Listed & Code Compliant',
      'Project Duration': '6 months'
    }
  }
];

// Function to fetch a single project by slug
async function fetchProject(slug: string): Promise<Project | null> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Find the project by ID/slug
  const project = projects.find(p => p.id === slug);
  
  return project || null;
}

// Generate static params for all projects (required for static generation)
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

// Generate metadata for each project page
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProject(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | Goldmine Communications & Construction',
      description: 'The requested project could not be found.',
    };
  }
  
  return {
    title: `${project.title} | Goldmine Communications & Construction`,
    description: project.description,
    keywords: [project.category, ...project.tags],
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.imageUrl],
      type: 'article',
    },
  };
}

// Project detail page component
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchProject(slug);
  
  // If project not found, show 404 page
  if (!project) {
    notFound();
  }
  
  const formattedDate = new Date(project.completionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
  
  return (
    <div className="pt-20 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/projects" 
            className="inline-flex items-center text-gray-600 hover:text-gold-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>
        
        {/* Project Hero */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="relative w-full h-96">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <div className="inline-block px-3 py-1 bg-gold-400 text-white rounded-full text-sm font-medium mb-4">
                {project.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
              <p className="text-xl text-white/90 max-w-3xl">{project.description}</p>
            </div>
          </div>
        </div>
        
        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">{project.description}</p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Highlights</h3>
                <ul className="space-y-3 mb-8">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1 mr-3" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                
                {project.specifications && (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                      {Object.entries(project.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-sm text-gray-500">{key}</span>
                          <span className="font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Similar Projects Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects
                  .filter(p => p.id !== project.id && p.category === project.category)
                  .slice(0, 2)
                  .map((similarProject) => (
                    <Link 
                      href={`/projects/${similarProject.id}`} 
                      key={similarProject.id} 
                      className="group"
                    >
                      <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-md group-hover:border-gold-200">
                        <div className="relative h-48 w-full">
                          <Image
                            src={similarProject.imageUrl}
                            alt={similarProject.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 group-hover:text-gold-500 transition-colors">
                            {similarProject.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                            {similarProject.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Project Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gold-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Completion Date</p>
                    <p className="font-medium text-gray-900">{formattedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Building className="w-5 h-5 text-gold-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Client</p>
                    <p className="font-medium text-gray-900">{project.client}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gold-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{project.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Services Provided</h4>
                <ul className="space-y-2">
                  {project.category === 'communications' ? (
                    <>
                      <li className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-2" />
                        Network Infrastructure
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-2" />
                        Fiber Optic Installation
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-2" />
                        System Integration
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-2" />
                        Construction Management
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-2" />
                        Site Development
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-2" />
                        Infrastructure Development
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              {/* CTA */}
              <div className="text-center bg-gray-50 p-6 -mx-6 -mb-6 rounded-b-xl">
                <p className="text-gray-600 mb-4">Interested in a similar project?</p>
                <Link 
                  href="/contact" 
                  className="block w-full py-3 px-4 bg-gold-400 hover:bg-gold-500 text-white font-medium rounded-lg transition-colors"
                >
                  Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}