import React from "react";
import ThemeProvider from "../components/ThemeProvider";
import MDXProvider from "../components/MDXProvider";

const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <MDXProvider element={element} />
  </ThemeProvider>
);

export default wrapRootElement;
