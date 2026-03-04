import { redirect } from 'next/navigation';

// Redirect old communications page to unified services page
export default function Communications() {
  redirect('/services#commercial-industrial');
}
