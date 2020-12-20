import React from "react";
import AutolinkHeader from "../AutolinkHeader";

const H2 = ({ children, ...rest }) => (
  <AutolinkHeader className={"h2"} is="h2" {...rest}>
    {children}
  </AutolinkHeader>
);

export default H2;
