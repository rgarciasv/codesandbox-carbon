import React from "react";
import cx from "classnames";
import { Grid } from "../Grid";

const Main = (props) => (
  <Grid
    className={cx("main", {
      padded: props.padded,
    })}
    {...props}
  />
);

export default Main;
