import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useMouseMover from '../../hooks/useMouseMover';
import Styled from './styled';

function Index({ projects }) {
  const [currentUrl, setCurrentUrl] = useState(null);
  const overlayRef = useRef();

  useMouseMover(overlayRef);

  return (
    <>
      <Styled.Overlay ref={overlayRef}>
        <img src={currentUrl} alt="" />
      </Styled.Overlay>
      <Styled.Container>
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
      </Styled.Container>
    </>
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
