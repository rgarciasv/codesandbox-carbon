import React from "react";
import PropTypes from "prop-types";
import { Row } from "../Grid";

export default class DoDontRow extends React.Component {
  render() {
    const { children } = this.props;

    return <Row className={"do-dont-row"}>{children}</Row>;
  }
}

DoDontRow.propTypes = {
  children: PropTypes.node.isRequired,
};
