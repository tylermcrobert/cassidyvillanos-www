import React, { Component } from 'react';
import config from 'config';
import Prismic from 'prismic-javascript';
import { Link, withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import getImageSize from 'util/getImageSize';
import ThumbnailContainer from 'components/ThumbnailContainer/ThumbnailContainer';
import Viewer from 'containers/Viewer/Viewer';
import CursorProvider from 'containers/Cursor/CursorProvider';
import 'styles/reset.css';
import './App.scss';

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

  getIndex = uid =>
    this.state.projects
      .map(proj => proj.uid)
      .indexOf(uid)

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
    if (projects && imagesLoaded) {
      const index = 0;

      return (
        <div className={`app -view-is-${this.props.view}`}>
          <CursorProvider>
            <h1 className="title">
              <Link to="/">{config.title}</Link>
            </h1>
            <div className="wrapper">
              <ThumbnailContainer projects={projects} selectProject={this.selectProject} />
              <Viewer
                index={index}
                images={projects[index].images}
                title={projects[index].title}
                description={projects[index].description}
                selectProject={this.selectProject}
              />
            </div>
          </CursorProvider>
        </div>
      );
    }
    return (
      <div className="loading">{config.title}</div>
    );
  }
}

export default withRouter(App);
