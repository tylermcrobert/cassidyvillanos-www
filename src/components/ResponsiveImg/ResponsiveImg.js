import React from 'react';

export default ({ data }) => {
  if (!data) {
    throw new Error('no image data supplied to <ResponsiveImage />');
  }
  const transformed = Object
    .entries(data.image.localFile.childImageSharp)
    .reduce((result, [sizeKey, value]) => (
      { ...result, [sizeKey]: value.src }
    ), {});


  const {
    thumbnail,
    mobile,
    laptop,
    desktop,
    desktopXl,
  } = transformed;

  return (
    <img
      srcSet={`
       ${thumbnail} 420w,
       ${mobile} 840w,
       ${laptop} 1680w,
       ${desktop} 2520w,
       ${desktopXl} 2880w,
     `}
      sizes="75vw"
      src={thumbnail}
      alt=""
    />);
};
