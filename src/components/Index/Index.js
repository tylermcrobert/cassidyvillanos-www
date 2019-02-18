import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import Styled from './styled';
import Layout from '../Layout/Layout';
import ResponsiveImg from '../../components/ResponsiveImg/ResponsiveImg';


function Index({ projects }) {
  return (
    <Layout>
      {(props) => {
        console.log(props.enableParallaxMouse());
        return (
          <div>
            {projects.map(({ uid, title }, i) => (
              <Styled.Link
                key={uid}
              >
                {title}
              </Styled.Link>
            ))}
          </div>
        );
      }
    }
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


/*

const [currentIndex, setCurrentIndex] = useState(null);
const [transitioning, setTransitioning] = useState(false);
const [currentUid, setCurrentUid] = useState(false);

const overlayRef = useRef();
const slowMove = useRef();

useMousePos(({ x, y }) => {
  if (!transitioning) {
    const transformVal = `translate3d(${x}px ,${y}px, 0) scale(.8)`;
    overlayRef.current.style.transform = transformVal;
  }
});

useMousePos(({ x, y }) => {
  const offsetX = (x / (window.innerWidth / 2)) * 0.6;
  const offsetY = (y / (window.innerHeight / 2)) * 0.6;
  const transformVal = `translate3d(${offsetX}% ,${offsetY}%, 0)`;
  slowMove.current.style.transform = transformVal;
});

function centerOverlay() {
  overlayRef.current.style.transform = 'translate3d(50%, 50%, 0) scale(.8)';
}

function transition(e, uid) {
  e.preventDefault();
  setTransitioning(true);
  centerOverlay();
  setCurrentUid(uid);
}

console.log(currentUid);

*/
