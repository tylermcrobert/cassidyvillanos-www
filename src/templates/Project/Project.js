import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Layout';

export default ({ pageContext: { data } }) => { //eslint-disable-line
  return <Project {...data} />;
};

export function Project({ images, title }) {
  return (
    <Layout>
      <h1>{title}</h1>
      {images.map(url => <img key={url} src={url} alt="" />)}
    </Layout>
  );
}

Project.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};
