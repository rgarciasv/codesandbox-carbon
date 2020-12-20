import React from "react";

const H4 = ({ children, ...rest }) => (
  <h4 className={"h4"} {...rest}>
    {children}
  </h4>
);

export default H4;
