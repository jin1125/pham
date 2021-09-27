import React, { memo } from "react";
import { Header } from "../header/Header";

export const Layout = memo(({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
});
