import React, { memo, VFC } from "react";
import { Header } from "../header/Header";

type Props = {
  children?: React.ReactNode;
};

export const Layout: VFC<Props> = memo(({ children }) => {
  ///////// JSXエリア /////////
  return (
    <div>
      <Header />
      {children}
    </div>
  );
});
