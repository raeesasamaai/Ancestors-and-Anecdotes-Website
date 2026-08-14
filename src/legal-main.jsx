import React from "react";
import ReactDOM from "react-dom/client";
import LegalPage from "./components/LegalPage.jsx";
import { legalPages } from "./legalPages.js";
import "./index.css";

const slug = document.body.dataset.legalPage;
const page = legalPages[slug];

if (!page) {
  throw new Error(`Unknown legal page: ${slug}`);
}

document.title = `${page.title} | Ancestors & Anecdotes`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LegalPage page={page} />
  </React.StrictMode>
);
