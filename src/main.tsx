import { createRoot } from '@/lib/runtime';
import { CookieBanner } from '@/components/cookie-banner';

// Initialize the app
const root = createRoot(document.getElementById('app'));

root.render(<CookieBanner />);
