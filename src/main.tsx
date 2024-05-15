import React from "react";
import ReactDOM from "react-dom/client";

import { NinjaNameGeneratorPage } from "./pages/NinjaNameGeneratorPage";

import "./global.css";

const root = document.getElementById("root")!;

const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <NinjaNameGeneratorPage />
  </React.StrictMode>
);
