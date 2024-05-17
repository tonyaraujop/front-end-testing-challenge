import ReactDOM from "react-dom/client";

import { NinjaNamePage } from "./pages/NinjaNamePage/NinjaNamePage";

import "./global.css";

const root = document.getElementById("root")!;

const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(<NinjaNamePage />);
