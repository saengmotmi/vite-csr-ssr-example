import React from "react";
import ReactDOM from "react-dom/client";

import { Router, Route } from "./libs/Router";
import "./index.css";

const pages: Record<string, { default: React.ElementType }> = import.meta.glob(
  "./pages/*.tsx",
  {
    eager: true,
  }
);

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.tsx/)?.[1] ?? "";
  return {
    name,
    path: `/${name === "index" ? "" : name}`,
    component: pages[path].default,
  };
});

const container = document.getElementById("root") as HTMLElement;

ReactDOM.hydrateRoot(
  container,
  <Router>
    {routes.map(({ path, component: Component }) => (
      <Route key={path} path={path} component={<Component />} />
    ))}
  </Router>
);
