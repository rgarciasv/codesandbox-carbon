import React from "react";
import cx from "classnames";

const Li = ({ children, ...rest }) => (
  <li className={cx("bx--list__item", "list-item")} {...rest}>
    {children}
  </li>
);

export default Li;
