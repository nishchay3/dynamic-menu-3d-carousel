import { useEffect, useRef, useState } from "react";
import arrowLeft from "../assets/images/arrow-left.svg";
import arrowRight from "../assets/images/arrow-right.svg";
import image1 from "../assets/images/image-1.png";
import image2 from "../assets/images/image-2.png";
import image3 from "../assets/images/image-3.png";
import image4 from "../assets/images/image-4.png";
import image5 from "../assets/images/image-5.png";
import dotIndicator from "../assets/images/dot-indicator.svg";
import dotIndicatorBlue from "../assets/images/dot-indicator-blue.svg";
import classes from "./Carousel.module.scss";

const defaultImages = [
  { url: image1, alt: "image1" },
  { url: image2, alt: "image2" },
  { url: image3, alt: "image3" },
  { url: image4, alt: "image4" },
  { url: image5, alt: "image5" },
];

export const Carousel = () => {
  /**
   * Set initial gallery class order array
   */
  const [galleryClassOrder, setGalleryClassOrder] = useState(() => {
    const order = [];
    for (let i = 1; i <= defaultImages.length; i++) {
      order.push(i);
    }
    return order;
  });

  /**
   * Ref to the gallery items container.
   */
  const galleryItemsRef = useRef();

  /**
   * Effect to initialize the gallery items class names and render pointers.
   */
  useEffect(() => {
    for (let i = 0; i < galleryItemsRef.current.children.length; i++) {
      const elemArr = galleryItemsRef.current.children;
      const galleryItemClassName = `GalleryItem${i + 1}`;
      elemArr[i].classList.add(classes[galleryItemClassName]);
    }
    renderPointers();
  }, []);

  /**
   * Effect to update the gallery items' class names and render pointers when the class order changes.
   */
  useEffect(() => {
    translateGalleryItems();
    renderPointers();
  }, [galleryClassOrder]);

  /**
   * Handler for the previous button click.
   * @description Rotate backwards the gallery class order array by 1
   */
  const handlePrevious = () => {
    let temp = [...galleryClassOrder];
    temp.unshift(temp.pop());
    setGalleryClassOrder(temp);
  };

  /**
   * Handler for the next button click.
   * @description Rotate forward the gallery class order array by 1
   */
  const handleNext = () => {
    let temp = [...galleryClassOrder];
    temp.push(temp.shift());
    setGalleryClassOrder(temp);
  };

  /**
   * Handler for clicking on a pointer.
   * @description Rotate the gallery class order array by the difference between
   * clicked pointer index and centre index
   */
  const handlePointerClick = (galleryItem) => {
    let diff =
      galleryClassOrder.indexOf(galleryItem) -
      Math.round(defaultImages.length / 2 - 1);
    if (diff < 0) {
      let temp = [...galleryClassOrder];
      for (let i = 0; i < diff * -1; i++) {
        temp.unshift(temp.pop());
      }
      setGalleryClassOrder(temp);
    }
    if (diff > 0) {
      let temp = [...galleryClassOrder];
      for (let i = 0; i < diff; i++) {
        temp.push(temp.shift());
      }
      setGalleryClassOrder(temp);
    }
  };

  /**
   * Handler for clicking on an image.
   * @description Rotate the gallery class order array by the difference between
   * clicked image index and 3
   */
  const handleImageClick = (imageIndex) => {
    let diff = galleryClassOrder.indexOf(3) - imageIndex;
    console.log(galleryClassOrder, diff);
    if (diff < 0) {
      let temp = [...galleryClassOrder];
      for (let i = 0; i < diff * -1; i++) {
        temp.unshift(temp.pop());
      }
      setGalleryClassOrder(temp);
    }
    if (diff > 0) {
      let temp = [...galleryClassOrder];
      for (let i = 0; i < diff; i++) {
        temp.push(temp.shift());
      }
      setGalleryClassOrder(temp);
    }
  };

  /**
   * Translate the gallery items by updating their class names.
   */
  function translateGalleryItems() {
    for (let i = 0; i < galleryItemsRef.current.children.length; i++) {
      const elemArr = galleryItemsRef.current.children;
      elemArr[i].classList.remove(elemArr[i].classList[1]);
    }
    for (let i = 0; i < galleryItemsRef.current.children.length; i++) {
      const elemArr = galleryItemsRef.current.children;
      const galleryItemClassName = `GalleryItem${galleryClassOrder[i]}`;
      elemArr[i].classList.add(classes[galleryItemClassName]);
      elemArr[i].id = galleryClassOrder[i];
    }
  }

  /**
   * Render the gallery pointers.
   * @returns An array of JSX elements representing the pointers.
   */
  function renderPointers() {
    let activeIndex = galleryClassOrder[2];
    let result = [];
    for (let i = 1; i <= defaultImages.length; i++) {
      if (i === activeIndex) {
        result.push(
          <button
            className={classes.GalleryControlsNext}
            onClick={() => {
              handlePointerClick(i);
            }}
            key={i}
            type="button"
          >
            <img src={dotIndicatorBlue} alt="dot indicator blue" />
          </button>
        );
      } else {
        result.push(
          <button
            className={classes.GalleryControlsNext}
            onClick={() => {
              handlePointerClick(i);
            }}
            key={i}
            type="button"
          >
            <img src={dotIndicator} alt="dot indicator" />
          </button>
        );
      }
    }
    return result;
  }

  /**
   * Render the Carousel component.
   * @returns The JSX element representing the Carousel component.
   */
  return (
    <div className={classes.CarouselWrapper}>
      <div className={classes.Headers}>
        <h1>Featured Products</h1>
        <p>Explore and discover a variety of products</p>
      </div>
      <div className={classes.Gallery}>
        <div className={classes.GalleryContainer} ref={galleryItemsRef}>
          {defaultImages &&
            defaultImages.map((image, index) => {
              return (
                <img
                  className={classes.GalleryItem}
                  src={image.url}
                  alt={image.alt}
                  key={index}
                  onClick={() => {
                    handleImageClick(index);
                  }}
                />
              );
            })}
        </div>
        <div className={classes.GalleryControls}>
          <button
            className={classes.GalleryControlsPrevious}
            onClick={handlePrevious}
            type="button"
          >
            <img src={arrowLeft} alt="arrow left" />
          </button>
          <div className={classes.PointerWrapper}>{renderPointers()}</div>
          <button
            className={classes.GalleryControlsNext}
            onClick={handleNext}
            type="button"
          >
            <img src={arrowRight} alt="arrow right" />
          </button>
        </div>
      </div>
    </div>
  );
};
