import { auth } from '@/lib/auth';
import SessionProvider from '@/components/providers/SessionProvider';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }



  return (
      <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <SessionProvider session={session}>
          <div className="flex flex-col min-h-screen">
            {/* Admin-specific header or sidebar can go here */}
            <main className="flex-grow">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

