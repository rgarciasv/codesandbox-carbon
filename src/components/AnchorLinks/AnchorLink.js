import React from "react";
import slugify from "slugify";

const AnchorLink = ({ to, children }) => {
  const href = to || `#${slugify(children, { lower: true })}`;
  return (
    <a className="anchor--link" href={href}>
      {children}
    </a>
  );
};

export default AnchorLink;
