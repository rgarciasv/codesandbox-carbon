import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Row } from "../Grid";

export default class P extends React.Component {
  render() {
    const { children, className, fullWidth, ...rest } = this.props;

    const paragraphClasses = classnames("paragraph", {
      [className]: className,
      "paragraph--responsive": !fullWidth,
    });

    return (
      <Row>
        <p className={paragraphClasses} {...rest}>
          {children}
        </p>
      </Row>
    );
  }
}

P.propTypes = {
  children: PropTypes.node,

  /**
   * Set to full width
   */
  fullWidth: PropTypes.bool,

  /**
   * Specify a custom class
   */
  className: PropTypes.string,
};
