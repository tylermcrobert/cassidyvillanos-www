import React from 'react';
import leadingZero from 'util/leadingZero';

const ViewerCarousel = ({
  imageList, slideIndex, nextImage, prevImage,
}) => (
  <div className="viewer__imageContainer">
    <div className="viewer__imageContainer__image">
      {imageList}
    </div>
    <div className="viewer__imageContainer__text">
      <span onClick={prevImage}>⟵</span>
      {leadingZero(slideIndex + 1)} / {leadingZero(imageList.length)}
      <span onClick={nextImage}>⟶</span>
    </div>
  </div>
);

export default ViewerCarousel;
