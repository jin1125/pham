import React, { memo, VFC } from "react";
import { MainHeader } from "../organisms/header/MainHeader";

type Props = {
  children?: React.ReactNode;
};

export const Layout: VFC<Props> = memo(({ children }) => {
  ///////// JSXエリア /////////
  return (
    <div>
      <MainHeader />
      {children}
    </div>
  );
});
