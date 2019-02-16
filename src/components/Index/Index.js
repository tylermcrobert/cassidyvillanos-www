import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import useMouseMover from '../../hooks/useMouseMover';
import Styled from './styled';
import Layout from '../Layout/Layout';

function Index({ projects }) {
  const [currentUrl, setCurrentUrl] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const overlayRef = useRef();

  useMouseMover(overlayRef, { enabled: !transitioning });

  function transition(e, uid) {
    e.preventDefault();
    setTransitioning(true);
    overlayRef.current.style.transform = 'translate3d(50%, 50%, 0)';

    setTimeout(() => {
      navigate(`/${uid}/`);
    }, 1000);
  }

  return (
    <Layout>
      <Styled.Overlay
        ref={overlayRef}
        visible={currentUrl !== null}
        transitioning={transitioning}
      >
        <img src={currentUrl} alt="" />
      </Styled.Overlay>
      <Styled.Container>
        <div>
          {projects.map(({ uid, image, title }) => (
            <Styled.Link
              key={uid}
              to={`/${uid}`}
              onMouseEnter={() => !transitioning && setCurrentUrl(image)}
              onMouseLeave={() => !transitioning && setCurrentUrl(null)}
              onClick={e => transition(e, uid)}
              transitioning={transitioning}
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
