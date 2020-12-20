import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { CheckmarkFilled24, Misuse24 } from "@carbon/icons-react";
import { Column } from "../Grid";

export default class DoDont extends React.Component {
  renderCaption = (caption, captionTitle) => {
    if (caption || captionTitle) {
      return (
        <div className={"caption"}>
          {captionTitle && <p className={"title"}>{captionTitle}</p>}
          {caption && <p className={"description"}>{caption}</p>}
        </div>
      );
    }
  };

  render() {
    const {
      children,
      caption,
      captionTitle,
      text,
      aspectRatio,
      color,
      type,
      ...columnProps
    } = this.props;

    const iconClassNames = classnames({
      icon: true,
      "icon-correct": type === "do",
      "icon-incorrect": type === "dont"
    });

    const wrapperClassNames = classnames({
      example: true,
      correct: type === "do",
      incorrect: type === "dont",
      square: aspectRatio === "1:1",
      dark: color === "dark"
    });

    return (
      <Column colMd={4} colLg={4} {...columnProps}>
        <div className={wrapperClassNames}>
          <div className={"card"}>
            <div className={"card-content"}>
              {type === "do" ? (
                <CheckmarkFilled24 className={iconClassNames} />
              ) : (
                <Misuse24 className={iconClassNames} />
              )}
              <div className={"content"}>
                {children}
                {text ? <p className={"text"}>{text}</p> : null}
              </div>
            </div>
          </div>
          {this.renderCaption(caption, captionTitle)}
        </div>
      </Column>
    );
  }
}

DoDont.defaultProps = {
  type: "do"
};

DoDont.propTypes = {
  children: PropTypes.node,
  /** title for the caption (optional) */
  caption: PropTypes.string,
  /** description for the card caption (optional) */
  captionTitle: PropTypes.string,
  /** text displayed in the example card */
  text: PropTypes.string,
  /** 1:1 to force square example */
  aspectRatio: PropTypes.string,
  /** set to "dark" for dark background card */
  color: PropTypes.string,
  /** set to "do" for do, and "dont" for dont */
  type: PropTypes.string
};
