import posed from 'react-pose';
import { easing } from 'popmotion';

const DURATION = 600;
const DELAY = DURATION * 0.33;
const EASE_DEFAULT = easing.cubicBezier(0.4, 0.0, 0.2, 1);
const EASE_ACCEL = easing.cubicBezier(0.4, 0.0, 1, 1);
const EASE_DECEL = easing.cubicBezier(0.0, 0.0, 0.2, 1);


const viewAppear = {
  transition: {
    delay: (DURATION + (DELAY * 0.75)),
    duration: (DURATION * 0.75),
    ease: EASE_DECEL,
  },
};

const viewDisppear = {
  transition: {
    duration: DURATION * 0.5,
    ease: EASE_ACCEL,
  },
};

const ThumbnailWrapper = posed.div({
  visible: { y: '0%', ...viewAppear },
  hidden: { y: '-5%', ...viewDisppear },
});

const ViewerWrapper = posed.div({
  visible: { y: '0%', ...viewAppear },
  hidden: { y: '5%', ...viewDisppear },
});

const curtainSettings = {
  transition: ({ from, to }) => ({
    type: 'keyframes',
    values: [from, 0, 0, to],
    times: [0, 0.3, 0.7, 1],
    duration: DURATION,
    delay: DELAY,
    easings: EASE_DEFAULT,
  }),
};

const Curtain = posed.div({
  up: {
    y: '100%',
    ...curtainSettings,
  },

  down: {
    y: '-100%',
    ...curtainSettings,
  },
});

const GalleryImage = posed.div({
  visible: {
    y: '0%',
    transition: {
      delay: ((DURATION * 0.75) + DELAY),
      duration: (DURATION * 0.3),
      ease: EASE_DECEL,
    },
  },
  hidden: {
    y: '7%',
    transition: {
      duration: (DURATION * 0.75),
      ease: EASE_ACCEL,
    },
  },
});


export { Curtain, ThumbnailWrapper, ViewerWrapper, GalleryImage };
