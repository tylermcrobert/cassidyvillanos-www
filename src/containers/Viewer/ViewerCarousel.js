import React from 'react';

const ViewerCarousel = ({
  imageList, slideIndex, nextImage, prevImage,
}) => (
  <div className="viewer__imageContainer">
    <div className="viewer__imageContainer__image">
      {imageList}
    </div>

  </div>
);

export default ViewerCarousel;
