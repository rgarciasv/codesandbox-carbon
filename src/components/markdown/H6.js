import React from "react";

const H6 = ({ children, ...rest }) => (
  <h6 className={"h6"} {...rest}>
    {children}
  </h6>
);

export default H6;
