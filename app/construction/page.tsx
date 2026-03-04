import { redirect } from 'next/navigation';

// Redirect old construction page to unified services page
export default function Construction() {
  redirect('/services#electrical-infrastructure');
}
