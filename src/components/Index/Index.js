import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useMouseMover from '../../hooks/useMouseMover';
import Styled from './styled';
import Layout from '../Layout/Layout';

function Index({ projects }) {
  const [currentUrl, setCurrentUrl] = useState(null);
  const overlayRef = useRef();

  useMouseMover(overlayRef);

  return (
    <Layout>
      <Styled.Overlay ref={overlayRef} visible={currentUrl !== null}>
        <img src={currentUrl} alt="" />
      </Styled.Overlay>
      <Styled.Container>
        <div>
          {projects.map(({ uid, image, title }) => (
            <Styled.Link
              key={uid}
              href={`#${uid}`}
              onMouseEnter={() => setCurrentUrl(image)}
              onMouseLeave={() => setCurrentUrl(null)}
            >
              {title}
            </Styled.Link>
          ))}
        </div>
      </Styled.Container>
    </Layout>
  );
}

Index.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default Index;
