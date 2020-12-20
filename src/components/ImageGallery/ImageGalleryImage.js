import React from "react";
import PropTypes from "prop-types";
import { Column } from "../Grid";

function ImageGalleryImage({
  title,
  alt,
  col,
  isInDialog = false,
  children,
  className,
  onClick,
}) {
  if (isInDialog) {
    return (
      <>
        <h3 className={"image-title"}>{title}</h3>
        <div className={"image-in-dialog"}>{children}</div>
      </>
    );
  }

  return (
    <Column colLg={col} className={className}>
      <figure className={"figure"} role="group" aria-label={alt}>
        <div
          className={"image-button-wrapper"}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClick(e);
            }
          }}
          onClick={onClick}
        >
          {children}
        </div>
      </figure>
    </Column>
  );
}

ImageGalleryImage.propTypes = {
  title: PropTypes.string,
  alt: PropTypes.string.isRequired,
  col: PropTypes.number,
  isInDialog: PropTypes.bool,
  children: PropTypes.object,
};

export default ImageGalleryImage;
