import React from "react";

const H5 = ({ children, ...rest }) => (
  <h5 className={"h5"} {...rest}>
    {children}
  </h5>
);

export default H5;
