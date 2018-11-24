import posed from 'react-pose';
import { easing } from 'popmotion';

const DURATION = 600;
const DELAY = DURATION * 0.33;
const EASE_DEFAULT = easing.cubicBezier(0.4, 0.0, 0.2, 1);
const EASE_ACCEL = easing.cubicBezier(0.4, 0.0, 1, 1);
const EASE_DECEL = easing.cubicBezier(0.0, 0.0, 0.2, 1);

const transition = {
  transition: {
    duration: DURATION * 2,
  },
};

const viewAppear = {
  transition: {
    delay: (DURATION + DELAY),
    duration: (DURATION * 0.25),
    ease: EASE_DECEL,
  },
};

const viewDisppear = {
  transition: {
    duration: DELAY * 1.5,
    ease: EASE_ACCEL,
  },
};

const ThumbnailWrapper = posed.div({
  visible: { y: '0vh', opacity: 1, ...viewAppear },
  hidden: { y: '-2vh', opacity: 0, ...viewDisppear },
});

const ViewerWrapper = posed.div({
  ...transition,
  visible: { y: '0vh', opacity: 1, ...viewAppear },
  hidden: { y: '2vh', opacity: 0, ...viewDisppear },
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
    y: '100vh',
    ...curtainSettings,
  },

  down: {
    y: '-100vh',
    ...curtainSettings,
  },
});


export { Curtain, ThumbnailWrapper, ViewerWrapper };
