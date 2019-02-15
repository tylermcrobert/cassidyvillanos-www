import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useMouseMover from '../../hooks/useMouseMover';
import Styled from './styled';

function Index({ projects }) {
  const [currentUrl, setCurrentUrl] = useState(null);
  const overlayRef = useRef();

  useMouseMover(overlayRef);

  return (
    <div>
      <Styled.Overlay ref={overlayRef}>
        <img src={currentUrl} alt="" width={200} />
      </Styled.Overlay>
      {projects.map(({ uid, image, title }) => (
        <a
          key={uid}
          href={`#${uid}`}
          onMouseEnter={() => setCurrentUrl(image)}
          onMouseLeave={() => setCurrentUrl(null)}
        >
          {title}
        </a>
      ))}
    </div>
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
