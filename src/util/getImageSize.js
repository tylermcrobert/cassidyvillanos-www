const getImageSize = (img, size) => {
  if (img) {
    return (img[size]) ? img[size].url : img.url;
  }
  return null;
};

export default getImageSize;
