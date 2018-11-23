import React, { Component } from 'react';
import config from 'config';
import Prismic from 'prismic-javascript';
import {
  Switch,
  Route,
  BrowserRouter,
  Link,
} from 'react-router-dom';
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
  }

  componentDidMount() {
    Prismic.api(config.apiEndpoint).then((api) => {
      api.getSingle('site').then((doc) => {
        const ids = doc.data.projects.map(proj => proj.project.id);
        this.getProjects(api, ids);
      });
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
      return (
        <BrowserRouter>
          <CursorProvider>
            <h1 className="title">
              <Link to="/">Cassidy Villanos</Link>
            </h1>
            <Switch>
              <Route
                exact
                path="/work/:uid"
                render={({ match }) => {
                  const index = this.getIndex(match.params.uid);
                  return (<Viewer
                    index={index}
                    images={projects[index].images}
                    title={projects[index].title}
                    description={projects[index].description}
                    selectProject={this.selectProject}
                  />);
                }}
              />
              <Route
                exact
                path="/"
                render={() =>
                  <ThumbnailContainer projects={projects} selectProject={this.selectProject} />
                }
              />
            </Switch>
          </CursorProvider>
        </BrowserRouter>
      );
    }
    return (
      <div className="loading">Cassidy Villanos</div>
    );
  }
}

export default App;
