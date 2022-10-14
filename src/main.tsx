import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { Router, Route } from "./libs/Router";
import "./index.css";

// import About from "./pages/about";
const About = React.lazy(() => import("./pages/about"));

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

const initialData = (window as any).__INITIAL_DATA__;

ReactDOM.hydrateRoot(
  container,
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <About />
    </Suspense>
    {/* {routes.map(({ path, component: Component }) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Route
          key={path}
          path={path}
          component={<Component state={initialData} />}
        />
      </Suspense>
    ))} */}
  </Router>
);
