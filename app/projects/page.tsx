import { redirect } from 'next/navigation';

// Redirect old projects page to new gallery page
export default function ProjectsPage() {
  redirect('/gallery');
}
