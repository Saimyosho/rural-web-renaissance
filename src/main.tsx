import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Ensure dark mode is applied (redundant with inline script, but safe)
document.documentElement.classList.add('dark');

// Unregister any existing service workers to prevent caching issues
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then(() => {
          console.log('Service Worker unregistered successfully');
        });
      }
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
