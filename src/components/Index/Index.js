import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import useMousePos from '../../hooks/useMousePos';
import Styled from './styled';
import Layout from '../Layout/Layout';
import ResponsiveImg from '../../components/ResponsiveImg/ResponsiveImg';

function Index({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const overlayRef = useRef();

  useMousePos(({ x, y }) => {
    const transformVal = `translate3d(${x}px ,${y}px, 0) scale(.8)`;
    overlayRef.current.style.transform = transformVal;
  }, { enabled: !transitioning });

  useMousePos(({ x, y }) => {
    console.log(x, y);
  }, { enabled: true });

  function transition(e, uid) {
    e.preventDefault();
    setTransitioning(true);
    overlayRef.current.style.transform = 'translate3d(50%, 50%, 0) scale(.8)';

    setTimeout(() => {
      navigate(`/${uid}/`);
    }, 300);
  }

  return (
    <Layout>
      <Styled.Overlay ref={overlayRef} transitioning={transitioning} >
        {currentIndex !== null && <ResponsiveImg data={projects[currentIndex].imageRes} />}
      </Styled.Overlay>
      <Styled.Container>
        <div>
          {projects.map(({ uid, title }, i) => (
            <Styled.Link
              key={uid}
              to={`/${uid}`}
              onMouseEnter={() => !transitioning && setCurrentIndex(i)}
              onMouseLeave={() => !transitioning && setCurrentIndex(null)}
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
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default Index;
