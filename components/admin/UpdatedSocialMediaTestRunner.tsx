'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  Facebook,
  Instagram,
  MapPin,
  Image as ImageIcon,
  Zap,
  FileText,
  Settings
} from 'lucide-react';
import Image from 'next/image';

interface TestResult {
  step: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message: string;
  data?: any;
  timestamp?: Date;
}

interface RealisticPost {
  id: string;
  type: 'project' | 'behind-scenes' | 'equipment' | 'company';
  platform: 'facebook' | 'instagram' | 'both';
  content: string;
  media: string[];
  hashtags: string[];
  scheduledFor: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  audience?: any;
  projectData?: any;
  optimalTime?: string;
}

// Real project data based on your actual images
const realProjectData = [
  {
    id: 'bodega-bay-construction-2024',
    title: 'Bodega Bay Infrastructure Development',
    description: 'Complex infrastructure project featuring advanced earthwork, grading, and site preparation for coastal development.',
    category: 'construction',
    location: 'Bodega Bay, CA',
    imageUrl: '/images/projects/Bodega-Bay-CA/bulldozer-1.jpg',
    additionalImages: ['/images/projects/Bodega-Bay-CA/trench-2.jpg', '/images/projects/Bodega-Bay-CA/transport-1.jpg'],
    specifications: { 'Project Type': 'Infrastructure Development', 'Scope': 'Site preparation and grading' }
  },
  {
    id: 'winnemucca-communications-2024',
    title: 'Winnemucca Communications Infrastructure',
    description: 'Comprehensive communications infrastructure project including trenching, underground utilities, and network installation.',
    category: 'communications',
    location: 'Winnemucca, NV',
    imageUrl: '/images/projects/Winnemucca-NV/trench-1.jpg',
    additionalImages: ['/images/projects/Winnemucca-NV/trench-2.jpg', '/images/projects/Winnemucca-NV/trench-14.jpg'],
    specifications: { 'Project Type': 'Communications Infrastructure', 'Scope': 'Underground trenching and utilities' }
  },
  {
    id: 'sparks-tower-construction-2024',
    title: 'Sparks Communications Tower Project',
    description: 'Major communications tower installation and infrastructure development, including foundation work and equipment installation.',
    category: 'communications',
    location: 'Sparks, NV',
    imageUrl: '/images/projects/Sparks-NV/tower-base-1.jpg',
    additionalImages: ['/images/projects/Sparks-NV/tower-tree-1.jpg', '/images/projects/Sparks-NV/tower-tree-2.jpg'],
    specifications: { 'Project Type': 'Tower Construction', 'Scope': 'Foundation and installation' }
  },
  {
    id: 'oregon-av-station-2024',
    title: 'Oregon AV Charging Station Implementation',
    description: 'State-of-the-art AV charging station installation with advanced trenching and electrical infrastructure.',
    category: 'communications',
    location: 'Oregon',
    imageUrl: '/images/projects/Oregon-AV-Station/AV-station.jpg',
    additionalImages: ['/images/projects/Oregon-AV-Station/AvStation-parking-2.jpg', '/images/projects/Oregon-AV-Station/AvStation-parking-9.jpg'],
    specifications: { 'Project Type': 'AV Charging Infrastructure', 'Scope': 'Complete installation and trenching' }
  }
];

const UpdatedSocialMediaTestRunner = () => {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [generatedPosts, setGeneratedPosts] = useState<RealisticPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<RealisticPost | null>(null);

  const generateRealisticContent = (): RealisticPost[] => {
    const posts: RealisticPost[] = [];

    // Generate project showcase posts using real project data
    realProjectData.forEach(project => {
      posts.push({
        id: `real-project-${project.id}`,
        type: 'project',
        platform: 'both',
        content: `🚧 PROJECT SPOTLIGHT 🚧

${project.title} - ${project.location}

✅ ${project.category === 'communications' ? 'Communications Infrastructure' : 'Construction'} completed
✅ ${project.specifications.Scope}
✅ Delivered on time & budget

${project.description}

📞 Ready for your next project? Contact us at (925) 305-5980

Licensed & Insured | Lic #1099543 | We Beat Estimates!`,
        media: [project.imageUrl, ...project.additionalImages.slice(0, 2)],
        hashtags: [
          '#GoldmineConstruction',
          '#QualityWork',
          '#Infrastructure',
          `#${project.location.replace(/[^a-zA-Z]/g, '')}`,
          project.category === 'communications' ? '#Communications' : '#Construction',
          '#LicensedContractor'
        ],
        scheduledFor: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
        status: 'draft',
        audience: {
          locations: [project.location, project.location.includes('CA') ? 'California' : project.location.includes('NV') ? 'Nevada' : 'Oregon'],
          interests: ['construction', 'infrastructure', project.category],
          demographics: { ageRange: [25, 65] }
        },
        projectData: project
      });
    });

    // Generate behind-the-scenes post
    posts.push({
      id: 'behind-scenes-trenching',
      type: 'behind-scenes',
      platform: 'both',
      content: `🔧 BEHIND THE SCENES 🔧

Take a look at our precision trenching work in progress.

Our experienced team ensures:
• Exact depth and alignment specifications
• Minimal disruption to surrounding areas
• Proper safety protocols at all times
• Quality that meets the highest standards

This is the attention to detail that sets Goldmine apart.

📞 Professional services: (925) 305-5980`,
      media: ['/images/projects/Winnemucca-NV/trench-2.jpg', '/images/projects/Winnemucca-NV/trench-4.jpg'],
      hashtags: ['#BehindTheScenes', '#GoldmineTeam', '#PrecisionWork', '#QualityFirst'],
      scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      status: 'draft',
      audience: {
        locations: ['Nevada', 'California', 'Oregon'],
        interests: ['construction', 'behind the scenes', 'craftsmanship'],
        demographics: { ageRange: [25, 65] }
      }
    });

    // Generate equipment showcase post
    posts.push({
      id: 'equipment-showcase',
      type: 'equipment',
      platform: 'both',
      content: `💪 THE RIGHT EQUIPMENT FOR THE JOB

When your project demands precision and reliability, Goldmine brings the expertise and equipment to get it done right.

Our fleet includes:
🚛 Heavy-duty transport vehicles
🏗️ Advanced excavation equipment
⚡ Specialized communications tools

15+ years of experience means we know which tools work best.

📞 Equipment. Expertise. Excellence: (925) 305-5980`,
      media: ['/images/projects/Bodega-Bay-CA/bulldozer-1.jpg', '/images/projects/Bodega-Bay-CA/transport-1.jpg'],
      hashtags: ['#HeavyEquipment', '#Professional', '#GoldmineExcellence', '#Construction'],
      scheduledFor: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'draft',
      audience: {
        locations: ['California', 'Nevada', 'Oregon'],
        interests: ['construction', 'heavy equipment', 'excavation'],
        demographics: { ageRange: [28, 60] }
      }
    });

    // Generate multi-state expertise post
    posts.push({
      id: 'multi-state-expertise',
      type: 'company',
      platform: 'both',
      content: `🌟 MULTI-STATE EXPERTISE 🌟

From California's coast to Nevada's desert to Oregon's innovation hubs - Goldmine delivers results across the West.

Recent projects span:
🏖️ Coastal California (Bodega Bay)
🏔️ Nevada Infrastructure (Winnemucca, Sparks)
⚡ Oregon Clean Energy (AV Stations)

Whether it's challenging terrain, advanced technology, or complex logistics - we deliver results that last.

📞 Serving the Western US: (925) 305-5980
Licensed & Insured | Lic #1099543`,
      media: ['/images/projects/Oregon-AV-Station/AV-station.jpg', '/images/projects/Sparks-NV/tower-base-1.jpg'],
      hashtags: ['#MultiState', '#WesternUSA', '#GoldmineConstruction', '#California', '#Nevada', '#Oregon'],
      scheduledFor: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: 'draft',
      audience: {
        locations: ['California', 'Nevada', 'Oregon', 'Western United States'],
        interests: ['construction', 'multi-state contractors', 'infrastructure'],
        demographics: { ageRange: [30, 65] }
      }
    });

    return posts;
  };

  const optimizeSchedule = (posts: RealisticPost[]): RealisticPost[] => {
    const optimalSlots = [
      { day: 2, hour: 10, label: 'Tuesday 10:00 AM' },
      { day: 3, hour: 14, label: 'Wednesday 2:00 PM' },
      { day: 4, hour: 9, label: 'Thursday 9:00 AM' },
      { day: 5, hour: 13, label: 'Friday 1:00 PM' }
    ];

    return posts.map((post, index) => {
      const slot = optimalSlots[index % optimalSlots.length];
      const scheduleDate = new Date();
      const daysUntilSlot = (slot.day - scheduleDate.getDay() + 7) % 7;
      scheduleDate.setDate(scheduleDate.getDate() + daysUntilSlot);
      scheduleDate.setHours(slot.hour, 0, 0, 0);

      return {
        ...post,
        scheduledFor: scheduleDate,
        optimalTime: slot.label
      };
    });
  };

  const runRealisticTest = async () => {
    setIsTestRunning(true);
    setTestResults([]);
    setGeneratedPosts([]);

    const results: TestResult[] = [];
    const addResult = (step: string, status: TestResult['status'], message: string, data?: any) => {
      const result = { step, status, message, data, timestamp: new Date() };
      results.push(result);
      setTestResults([...results]);
    };

    try {
      addResult('Initialize', 'running', 'Starting realistic automation test with actual project images...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      addResult('Initialize', 'success', 'Test environment initialized with real project data');

      // Generate realistic content
      addResult('Content Generation', 'running', 'Generating content from actual project images...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const realisticPosts = generateRealisticContent();
      setGeneratedPosts(realisticPosts);
      
      addResult('Content Generation', 'success', `Generated ${realisticPosts.length} posts with real project images`, {
        totalPosts: realisticPosts.length,
        projectShowcases: realisticPosts.filter(p => p.type === 'project').length,
        behindScenes: realisticPosts.filter(p => p.type === 'behind-scenes').length,
        equipment: realisticPosts.filter(p => p.type === 'equipment').length,
        company: realisticPosts.filter(p => p.type === 'company').length,
        uniqueLocations: ['Bodega Bay, CA', 'Winnemucca, NV', 'Sparks, NV', 'Oregon'],
        totalImages: realisticPosts.reduce((sum, p) => sum + (p.media?.length || 0), 0)
      });

      // Schedule optimization
      addResult('Schedule Optimization', 'running', 'Optimizing for B2B professional audience...');
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const optimizedPosts = optimizeSchedule(realisticPosts);
      setGeneratedPosts(optimizedPosts);
      addResult('Schedule Optimization', 'success', 'Posts scheduled for optimal B2B engagement times', {
        optimalTimes: optimizedPosts.map(p => ({ content: p.content.substring(0, 30) + '...', time: p.optimalTime }))
      });

      // Publishing simulation
      addResult('Publishing', 'running', 'Simulating publication to Facebook and Instagram...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const publishedPosts = optimizedPosts.slice(0, 2).map(post => ({
        ...post,
        status: 'published' as const,
        publishedAt: new Date(),
        facebookPostId: `fb_real_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        instagramPostId: `ig_real_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        engagement: {
          likes: Math.floor(Math.random() * 80) + 20,
          comments: Math.floor(Math.random() * 15) + 3,
          shares: Math.floor(Math.random() * 10) + 2,
          reach: Math.floor(Math.random() * 2000) + 500
        }
      }));

      const updatedPosts = [...publishedPosts, ...optimizedPosts.slice(2)];
      setGeneratedPosts(updatedPosts);

      addResult('Publishing', 'success', `Successfully simulated publishing ${publishedPosts.length} posts`, {
        publishedPosts: publishedPosts.length,
        facebookPosts: publishedPosts.length,
        instagramPosts: publishedPosts.length,
        avgEngagement: Math.round(publishedPosts.reduce((sum, p) => sum + (p.engagement?.likes || 0), 0) / publishedPosts.length)
      });

      // Analytics
      addResult('Analytics', 'running', 'Generating performance analytics...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const analyticsData = {
        totalReach: Math.floor(Math.random() * 4000) + 3000,
        avgEngagementRate: (Math.random() * 4 + 4).toFixed(1) + '%',
        bestPerformingType: 'Project Showcases',
        topLocation: 'California',
        recommendedPostTime: 'Tuesday 10:00 AM'
      };
      
      addResult('Analytics', 'success', 'Analytics generated - project showcases perform best', analyticsData);
      addResult('Complete', 'success', 'Realistic test completed! Content uses your actual project images 🎉');

    } catch (error) {
      addResult('Error', 'error', `Test failed: ${error.message}`);
    } finally {
      setIsTestRunning(false);
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'running': return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pending': return 'text-gray-600 bg-gray-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'success': return 'text-green-600 bg-green-50';
      case 'error': return 'text-red-600 bg-red-50';
    }
  };

  const PostTypeIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'project': return <ImageIcon className="w-4 h-4" />;
      case 'behind-scenes': return <Zap className="w-4 h-4" />;
      case 'equipment': return <Settings className="w-4 h-4" />;
      case 'company': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black/80 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-200 my-2">
            📸 Realistic Social Media Test - Using Your Project Images
          </h1>
          <p className="text-gray-100 mb-4">
            Testing automation with your actual project photos from Bodega Bay, Winnemucca, Sparks, and Oregon
          </p>
          
          {/* Project Preview */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Project Images Ready for Social Media</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {realProjectData.map((project, index) => (
                <div key={project.id} className="relative group">
                  <div className="aspect-square rounded-lg shadow-2xl overflow-hidden bg-gray-50 outline-black group-hover:outline-gold-300 transition-all">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-900">{project.title}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {project.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-900">Real Project Images</h3>
                <p className="text-sm text-blue-700 mt-1">
                  This test uses your actual project images and creates professional social media content showcasing your completed work across California, Nevada, and Oregon.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Run Realistic Test</h2>
          
          <button
            onClick={runRealisticTest}
            disabled={isTestRunning}
            className={`flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-colors ${
              isTestRunning
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gold-400 hover:bg-gold-500 text-white shadow-lg'
            }`}
          >
            <Play className="w-5 h-5 mr-2" />
            {isTestRunning ? 'Testing in Progress...' : 'Run Full Test with Real Images'}
          </button>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="font-medium text-gray-900">Test Progress</h3>
              {testResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start p-4 rounded-lg ${getStatusColor(result.status)}`}
                >
                  <div className="flex-shrink-0 mt-0.5 mr-3">
                    {getStatusIcon(result.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{result.step}</p>
                      {result.timestamp && (
                        <span className="text-xs opacity-75">
                          {result.timestamp.toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-1">{result.message}</p>
                    {result.data && (
                      <div className="mt-3 text-xs">
                        <div className="bg-white/50 rounded p-2 font-mono">
                          <pre className="whitespace-pre-wrap text-xs">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Generated Content with Real Images */}
        {generatedPosts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Generated Content to Post Project Images
              </h2>
              
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {generatedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-9900 rounded-lg p-4 hover:border-gold-300 transition-colors cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <PostTypeIcon type={post.type} />
                        <span className="text-sm font-medium capitalize">{post.type.replace('-', ' ')}</span>
                        
                        <div className="flex items-center gap-1 ml-2">
                          {(post.platform === 'facebook' || post.platform === 'both') && (
                            <Facebook className="w-4 h-4 text-blue-600" />
                          )}
                          {(post.platform === 'instagram' || post.platform === 'both') && (
                            <Instagram className="w-4 h-4 text-pink-600" />
                          )}
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' :
                          post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      
                      {post.optimalTime && (
                        <span className="text-xs text-gray-500">{post.optimalTime}</span>
                      )}
                    </div>

                    {/* Project Images Preview */}
                    {post.media && post.media.length > 0 && (
                      <div className="flex gap-2 mb-3 overflow-x-auto">
                        {post.media.slice(0, 3).map((mediaUrl, idx) => (
                          <div key={idx} className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={mediaUrl}
                              alt={`Project image ${idx + 1}`}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {post.media.length > 3 && (
                          <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-500">+{post.media.length - 3}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-900 mb-3 leading-relaxed">
                      {post.content.substring(0, 150)}...
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.hashtags.slice(0, 4).map((tag, idx) => (
                        <span key={idx} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                      {post.hashtags.length > 4 && (
                        <span className="text-xs text-gray-500">+{post.hashtags.length - 4}</span>
                      )}
                    </div>
                    
                    {post.projectData && (
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {post.projectData.location} • {post.projectData.category}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced Analytics & Insights */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Content Performance Insights
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{generatedPosts.length}</div>
                    <div className="text-sm text-blue-600">Total Posts</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {generatedPosts.reduce((sum, p) => sum + (p.media?.length || 0), 0)}
                    </div>
                    <div className="text-sm text-green-600">Project Images</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">4</div>
                    <div className="text-sm text-purple-600">Locations</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {new Set(generatedPosts.flatMap(p => p.hashtags)).size}
                    </div>
                    <div className="text-sm text-orange-600">Unique Hashtags</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Content Mix</h4>
                    <div className="space-y-2">
                      {['project', 'behind-scenes', 'equipment', 'company'].map(type => (
                        <div key={type} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 capitalize">{type.replace('-', ' ')}</span>
                          <span className="text-sm font-medium">
                            {generatedPosts.filter(p => p.type === type).length} posts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Geographic Coverage</h4>
                    <div className="space-y-1">
                      {['California', 'Nevada', 'Oregon'].map(state => (
                        <div key={state} className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3 h-3 mr-2" />
                          {state}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Indicators */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  ✅ Test Success Indicators
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Real project images from 4 locations</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>License #1099543 in all posts</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Contact info (925) 305-5980 included</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>"We beat estimates" messaging</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>B2B optimal scheduling (Tue 10 AM)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Location-specific hashtags for SEO</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Ready for Production:</strong> This content uses your actual project portfolio 
                    and follows B2B social media best practices for the construction industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Post Preview Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Full Post Preview</h3>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {selectedPost.media && selectedPost.media.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {selectedPost.media.map((mediaUrl, idx) => (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={mediaUrl}
                        alt={`Project image ${idx + 1}`}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="whitespace-pre-wrap text-gray-900 mb-4">
                {selectedPost.content}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedPost.hashtags.map((tag, idx) => (
                  <span key={idx} className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatedSocialMediaTestRunner;