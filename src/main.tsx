import { createRoot } from './lib/runtime';

function App() {
  return <div className="app">Bejamas Privacy Banner</div>;
}

// Initialize the app
const root = createRoot(document.getElementById('app'));

root.render(<App />);
