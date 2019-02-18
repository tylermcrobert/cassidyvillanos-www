import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import posed from 'react-pose';
import Layout from '../../components/Layout/Layout';
import Styled from './styled';
import { Overlay } from '../../components/Index/styled';

export default ({ data }) => { //eslint-disable-line
  const imgurls = data.prismicProject.data.images
    .map(item => item.image.localFile.childImageSharp)
    .map(imageSizes => (
      Object
        .entries(imageSizes)
        .reduce((result, [sizeKey, value]) => (
          { ...result, [sizeKey]: value.src }
        ), {})
    ));

  return <Project images={imgurls} title={data.prismicProject.data.title.text} />;
};

export const pageQuery = graphql`
  query pageQuery($uid: String!) {
    prismicProject(uid: {eq: $uid}) {
      data {
        title{
          text
        }
        images {
          image {
            ...responsive
          }
        }
      }
    }
  }
`;

export function Project({ images, title }) {
  const [slide, setSlide] = useState(0);

  const prevIndex = slide ? slide - 1 : images.length - 1;
  const nextIndex = (slide + 1) % images.length;

  const prevSlide = () => setSlide(prevIndex);
  const nextSlide = () => setSlide(nextIndex);

  return (
    <Layout title={title}>
      <Styled.ProjectWrapper>
        <PosedOverlay page pose="normal" initialPose="small">
          {images.map(({
       thumbnail,
       mobile,
       laptop,
       desktop,
       desktopXl,
     }, i) => (
       <Styled.Image
         srcSet={`
            ${thumbnail} 420w,
            ${mobile} 840w,
            ${laptop} 1680w,
            ${desktop} 2520w,
            ${desktopXl} 2880w,
          `}
         sizes="75vw"
         key={thumbnail}
         fixed={thumbnail}
         alt=""
         current={slide === i}
         width="100%"
       />))}
        </PosedOverlay>
        <Styled.Bar>
          <Styled.Prev onClick={prevSlide} />
          <Styled.Next onClick={nextSlide} />
        </Styled.Bar>
      </Styled.ProjectWrapper>
    </Layout>
  );
}

const PosedOverlay = posed(Overlay)({
  small: {
    scale: 0.8,
    y: '50%',
    x: '50%',
    delay: 20,
    transition: {
      ease: [0.39, 0.575, 0.565, 1],
      duration: 175,
    },
  },
  normal: {
    scale: 1,
    y: '50%',
    x: '50%',
    delay: 20,
    transition: {
      ease: [0.39, 0.575, 0.565, 1],
      duration: 175,
    },
  },
});


Project.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    laptop: PropTypes.string.isRequired,
    desktop: PropTypes.string.isRequired,
    desktopXl: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
};
