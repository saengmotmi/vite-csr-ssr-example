import React from "react";

interface Props {
  path: string;
  component: React.ReactElement;
}

export default ({ component: Component }: Props) => {
  return Component;
};
