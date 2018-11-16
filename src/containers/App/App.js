import React, { Component } from 'react';
import prismicConfig from 'prismic-config';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import ProjectThumbnail from 'components/ProjectThumbnail/ProjectThumbnail';
import 'styles/reset.css';
import './App.css';

class App extends Component {
  state = {
    doc: null,
  }
  componentDidMount() {
    Prismic.api(prismicConfig.apiEndpoint).then((api) => {
      api.query(Prismic.Predicates.at('document.type', 'project')).then((doc) => {
        this.setState({ doc });
      });
    });
  }
  render() {
    const { doc } = this.state;
    if (doc) {
      return (
        <div>
          { doc.results.map((result) => {
            const { uid, data, last_publication_date: date } = result;
            return (
              <ProjectThumbnail
                date={date}
                title={RichText.asText(data.title)}
                image={data.images[0].image.mobile.url}
                description={RichText.render(data.description)}
                uid={uid}
                key={uid}
              />);
          })}
        </div>
      );
    }
    return (
      <div>Loading</div>
    );
  }
}

export default App;
