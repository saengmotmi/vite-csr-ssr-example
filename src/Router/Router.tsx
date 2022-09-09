import React, { useState, useEffect, Children, isValidElement } from "react";
import RouterContext from "./context";

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => {
  const [page, setPage] = useState(window.location.pathname);

  useEffect(() => {
    // 뒤로가기 감지하여 state에 반영
    window.onpopstate = (e: PopStateEvent) => {
      setPage(e.state);
    };
  }, []);

  const push = (path: string) => {
    window.history.pushState(path, "", path);
    setPage(path);
  };

  return (
    <RouterContext.Provider value={{ push }}>
      {Children.toArray(children).find(
        (child) => isValidElement(child) && child.props.path === page
      )}
    </RouterContext.Provider>
  );
};
