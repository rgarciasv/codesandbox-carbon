import React from "react";
import cx from "classnames";

const Link = ({ className, ...rest }) => (
  <span {...rest} className={cx(className, "h4", "title")} />
);

export default Link;
