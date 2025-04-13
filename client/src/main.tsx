import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add a basic title to the HTML head
const titleElement = document.createElement("title");
titleElement.textContent = "Comunitech";
document.head.appendChild(titleElement);

createRoot(document.getElementById("root")!).render(<App />);
