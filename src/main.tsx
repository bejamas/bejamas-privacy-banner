import { createRoot } from '@/lib/runtime';
import { CookieBanner } from '@/components/cookie-banner';
import '@/styles/globals.css';

// Initialize the app
const root = createRoot(document.getElementById('app'));

root.render(<CookieBanner />);
