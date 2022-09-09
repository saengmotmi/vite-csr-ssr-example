import { createContext, useContext } from "react";

interface RouterContextProps {
  push: (path: string) => void;
}

const RouterContext: React.Context<RouterContextProps> = createContext({
  push: () => {},
} as RouterContextProps);

export const useRouter = () => useContext(RouterContext);

export default RouterContext;
