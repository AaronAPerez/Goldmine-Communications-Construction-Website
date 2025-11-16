import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Social Media | Goldmine Admin',
};

export default async function SocialMediaPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  return (
    <AdminPageLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Social Media</h1>
          <p className="text-gray-600 mt-2">Manage posts, schedule content, and track engagement</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media Management</h3>
            <p className="text-gray-600 mb-4">Leverage your existing automation system</p>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Schedule Post
            </button>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}
// import SocialMediaDashboard from '@/components/admin/SocialMediaDashboard';
// import { Metadata } from 'next';


// export const metadata: Metadata = {
//   title: 'Social Media Test Suite | Goldmine Admin',
//   description: 'Test social media automation with real project data'
// };

// export default function SocialMediaTestPage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="text-white p-4">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold">🧪 Social Media Test Environment</h1>
//           <p className="text-blue-100 mt-1">
//             Testing automation with your actual project data • No real posts will be published
//           </p>
//         </div>
//       </div>
//       <SocialMediaDashboard/>
//     </div>
//   );
// }