import React from "react";
import AutolinkHeader from "../AutolinkHeader";

const H3 = ({ children, ...rest }) => (
  <AutolinkHeader is="h3" className={"h3"} {...rest}>
    {children}
  </AutolinkHeader>
);

export default H3;
