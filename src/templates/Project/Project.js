import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';

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

  return <Project images={imgurls} title="test" />;
};

export const pageQuery = graphql`
  query pageQuery($uid: String!) {
    prismicProject(uid: {eq: $uid}) {
      data {
        images {
          image {
            localFile {
              childImageSharp {
                thumbnail: resize(width: 420, quality: 80) {
                  src
                }
                mobile: fixed(width: 840, quality: 80) {
                  src
                }
                laptop: fixed(width: 1680, quality: 80) {
                  src
                }
                desktop: fixed(width: 2520, quality: 80) {
                  src
                }
                desktopXl: fixed(width: 2880, quality: 80) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function Project({ images, title }) {
  return (
    <Layout>
      <h1>{title}</h1>
      {images.map(({
       thumbnail,
       mobile,
       laptop,
       desktop,
       desktopXl,
      }) => (
        <img
          srcSet={`
            ${thumbnail} 420w,
            ${mobile} 840w,
            ${laptop} 1680w,
            ${desktop} 2520w,
            ${desktopXl} 2880w,
          `}
          sizes="75vw"
          key={thumbnail}
          src={thumbnail}
          alt=""
          width="100%"
        />))}
    </Layout>
  );
}

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
