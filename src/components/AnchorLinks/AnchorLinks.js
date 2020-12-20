import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class AnchorLinks extends React.Component {
  render() {
    const { children, small } = this.props;
    const isColumn = React.Children.count(children) > 6;
    const classNames = classnames("anchor--list", {
      "anchor--list--small": small,
      "anchor--multiple-columns": isColumn,
    });

    return (
      <ul className={classNames}>
        {React.Children.map(children, (link, i) => (
          <li key={i} className="anchor--list-item">
            {link}
          </li>
        ))}
      </ul>
    );
  }
}

AnchorLinks.propTypes = {
  children: PropTypes.node.isRequired,
  small: PropTypes.bool,
};
