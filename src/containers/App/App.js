import React, { Component } from 'react';
import config from 'config';
import Prismic from 'prismic-javascript';
import { Link, withRouter } from 'react-router-dom';
import getImageSize from 'util/getImageSize';
import posed from 'react-pose';
import ThumbnailContainer from 'components/ThumbnailContainer/ThumbnailContainer';
import Viewer from 'containers/Viewer/Viewer';
import CursorProvider from 'containers/Cursor/CursorProvider';
import 'styles/reset.css';
import './App.scss';

const transition = {
  transition: {
    default: { duration: 300 },
    ease: 'circIn',
  },
};

const Home = posed.div({
  visible: { y: '0vh', opacity: 1, ...transition },
  hidden: { y: '-100vh', opacity: 0, ...transition },
});

const ViewerWrapper = posed.div({
  visible: { y: '0vh', opacity: 1, ...transition },
  hidden: { y: '100vh', opacity: 0, ...transition },
});


class App extends Component {
  state = {
    projects: null,
    imagesLoaded: false,
    currentUid: null,
  }

  componentDidMount() {
    Prismic.api(config.apiEndpoint).then((api) => {
      api.getSingle('site').then((doc) => {
        const ids = doc.data.projects.map(proj => proj.project.id);
        this.getProjects(api, ids);
      });
    });
  }

  componentDidUpdate() {
    this.setUid();
  }

  setUid = () => {
    const match = this.props.match.params;
    const { uid } = match;
    this.setState((prevState) => {
      if (uid && prevState.currentUid !== uid) {
        return { currentUid: uid };
      }
      return null;
    });
  }

  getProjects = (api, ids) => {
    api.getByIDs(ids).then((doc) => {
      this.setState({
        projects: doc.results.map(result => ({
          uid: result.uid,
          title: result.data.title,
          description: result.data.description,
          images: result.data.images.map(img => img.image),
        })),
      }, () => {
        this.preload();
      });
    });
  }

  getIndex = uid => (uid
    ? this.state.projects
      .map(proj => proj.uid)
      .indexOf(uid)
    : 0)

  preload = () => {
    const images = this.state.projects.map(proj => proj.images[0]);
    const thumbnails = images.map(img => getImageSize(img, config.thumbnailSize));
    const mainImage = images.map(img => getImageSize(img, config.viewerSize));


    this.loadImages(mainImage);

    Promise.all([
      ...this.loadImages(thumbnails),
    ]).then(() => {
      this.setState({ imagesLoaded: true });
    });
  }

  loadImages = (imgs) => {
    const imgStatuses = [];
    imgs.forEach((url, i) => {
      imgStatuses[i] = new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve({ status: 'ok' });
        img.onerror = () => resolve({ status: 'error' });
      });
    });
    return imgStatuses;
  }

  render() {
    const { projects, imagesLoaded } = this.state;
    const { view } = this.props;
    if (projects && imagesLoaded) {
      const index = this.getIndex(this.state.currentUid);
      return (<>
        <h1 className="title">
          <Link to="/">{config.title}</Link>
        </h1>
        <div className="wrapper">
          <Home
            pose={view === 'home' ? 'visible' : 'hidden'}
            className={`section section--home ${view === 'home' ? '-active' : ''}`}
          >
            <CursorProvider >
              <ThumbnailContainer projects={projects} selectProject={this.selectProject} />
            </CursorProvider>
          </Home>
          <ViewerWrapper
            className={`section section--viewer ${view === 'viewer' ? '-active' : ''}`}
            pose={view === 'viewer' ? 'visible' : 'hidden'}
          >
            <CursorProvider>
              <Viewer
                index={index}
                images={projects[index].images}
                title={projects[index].title}
                description={projects[index].description}
                selectProject={this.selectProject}
              />
            </CursorProvider>
          </ViewerWrapper>
        </div>
        </>
      );
    }
    return (
      <div className="loading">{config.title}</div>
    );
  }
}

export default withRouter(App);
