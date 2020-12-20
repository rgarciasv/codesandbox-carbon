import React, { useState, useEffect, Children } from "react";
import ReactDOM from "react-dom";
import { breakpoints } from "@carbon/elements";
import { ChevronRight32, ChevronLeft32, Close32 } from "@carbon/icons-react";
import cx from "classnames";
import FocusTrap from "focus-trap-react";
import useMedia from "use-media";
import PropTypes from "prop-types";
import { Grid, Row, Column } from "../Grid";

function ImageGallery({ children }) {
  const [portalsNode, updateNode] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, updateActiveImageIndex] = useState(null);
  const childrenAsArray = Children.toArray(children);
  const rightNavButton = cx({
    "right-nav": true,
    "first-right-nav": activeImageIndex === 0,
    "nav-buttons": activeImageIndex > 0
  });
  const leftNavButton = cx("left-nav", "nav-buttons");
  const isMobile = useMedia({ maxWidth: breakpoints.md.width });

  // Creates the node to go into the portalsNode state.
  useEffect(() => {
    const node = document.createElement("div");
    document.body.appendChild(node);
    updateNode(node);

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  // Depending on if the gallery is open or not, this adds the addNoScroll class so the screen behind the modal doesn't scroll when opened.
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.classList.add("add-no-scroll");
    }

    return () => {
      document.body.classList.remove("add-no-scroll");
    };
  }, [isGalleryOpen]);

  // Removes "add-no-scroll" if view is shrunk to mobile view when the gallery is open
  useEffect(() => {
    if (
      (isMobile && document.body.classList.contains("add-no-scroll")) ||
      !isGalleryOpen
    ) {
      document.body.classList.remove("add-no-scroll");
    }

    return () => {
      if (!isMobile && isGalleryOpen) {
        document.body.classList.add("add-no-scroll");
      }
    };
  }, [isGalleryOpen, isMobile]);

  // Opens gallery if the breakpoint isn't mobile
  function openGalleryForImage(index) {
    return e => {
      e.preventDefault();
      if (!isMobile) {
        setIsGalleryOpen(true);
        updateActiveImageIndex(index);
      }
    };
  }

  function closeGallery() {
    setIsGalleryOpen(false);
    updateActiveImageIndex(null);
  }

  function selectNextImage() {
    if (activeImageIndex + 1 < childrenAsArray.length) {
      updateActiveImageIndex(activeImageIndex + 1);
    }
  }

  function selectPrevImage() {
    if (activeImageIndex - 1 >= 0) {
      updateActiveImageIndex(activeImageIndex - 1);
    }
  }

  function onKeyDown(event) {
    if (event.key === "Escape") {
      closeGallery();
      return;
    }
    if (event.key === "ArrowLeft") {
      selectPrevImage();
      return;
    }
    if (event.key === "ArrowRight") {
      selectNextImage();
    }
  }

  return (
    <>
      <figure role="group" aria-label="Gallery of Various Media">
        <Row className={"gallery-container"}>
          {Children.map(children, (child, index) =>
            React.cloneElement(child, {
              onClick: openGalleryForImage(index)
            })
          )}
        </Row>
      </figure>
      {portalsNode &&
        isGalleryOpen &&
        !isMobile &&
        ReactDOM.createPortal(
          <FocusTrap>
            {/* Because of FocusTrap, the key down events will propagate up removing the accessibility problem that would be created by having a keydown event listener on a non-interactive element. */}
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <div
              role="group"
              className={"in-dialog-gallery-container"}
              onKeyDown={onKeyDown}
            >
              <Row>
                <Column colLg={2}>
                  <button
                    type="button"
                    className={"close-button"}
                    onClick={closeGallery}
                  >
                    <Close32 className={"icon"} />
                  </button>
                </Column>
              </Row>
              <Grid className={cx("bx--grid--full-width", "gallery-grid")}>
                <Row className={"gallery-row"}>
                  <Column colLg={3} className={"nav-buttons-container"}>
                    {activeImageIndex - 1 >= 0 && (
                      <button
                        type="button"
                        className={leftNavButton}
                        onClick={selectPrevImage}
                      >
                        <ChevronLeft32 className={"icon"} />
                      </button>
                    )}
                  </Column>
                  <Column colLg={6}>
                    {childrenAsArray[activeImageIndex].props.children.props
                      .mdxType === "GifPlayer"
                      ? React.cloneElement(
                          childrenAsArray[activeImageIndex].props.children,
                          {
                            isInDialog: true
                          }
                        )
                      : React.cloneElement(childrenAsArray[activeImageIndex], {
                          isInDialog: true
                        })}
                  </Column>
                  <Column colLg={3} className={"nav-buttons-container"}>
                    {activeImageIndex + 1 < childrenAsArray.length && (
                      <button
                        type="button"
                        className={rightNavButton}
                        onClick={selectNextImage}
                      >
                        <ChevronRight32 className={"icon"} />
                      </button>
                    )}
                  </Column>
                </Row>
              </Grid>
            </div>
          </FocusTrap>,
          portalsNode
        )}
    </>
  );
}

ImageGallery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default ImageGallery;
