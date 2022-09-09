import React from "react";
import ReactDOM from "react-dom/client";

import { Router, Route } from "./Router";
import About from "./pages/about";
import Root from "./pages/root";

import "./index.css";

const container = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
