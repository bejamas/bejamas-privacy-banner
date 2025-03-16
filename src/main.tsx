import { createRoot } from "./lib/runtime";

function App() {
  return (
    <div className="p-4 bg-blue-500 text-white">
      <h1>Hello from Custom JSX!</h1>
      <button
        className="mt-4 px-3 py-2 bg-white text-blue-500 rounded"
        onClick={() => alert("Button clicked!")}
      >
        Click me
      </button>
    </div>
  );
}

const root = createRoot(document.getElementById("app"));

root.render(<App />);
