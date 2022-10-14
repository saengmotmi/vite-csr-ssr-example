import React, { createContext, useContext } from "react";

export function createServerData() {
  let done = false;
  let promise: Promise<null> | null = null;
  return {
    read() {
      if (done) {
        return;
      }
      if (promise) {
        throw promise;
      }
      promise = new Promise<null>((resolve) => {
        setTimeout(() => {
          done = true;
          promise = null;
          resolve(null);
        }, 3000);
      });
      throw promise;
    },
  };
}

const DataContext = createContext<typeof createServerData | null>(null);

export function DataProvider({ children, data }: any) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

// In a real implementation the data would be streamed with the HTML.
// We haven't integrated this part yet, so we'll just use fake data.
const fakeData = [
  "Wait, it doesn't wait for React to load?",
  "How does this even work?",
  "I like marshmallows",
];

export function useData() {
  const ctx = useContext(DataContext);
  if (ctx !== null) {
    // This context is only provided on the server.
    // It is here to simulate a suspending data fetch.
    (ctx as any)?.read();
  }
  return fakeData;
}
