import React from 'react';
import { RichText } from 'prismic-reactjs';
import ProjectThumbnail from 'components/ProjectThumbnail/ProjectThumbnail';

const Thumbnails = ({
  doc, selectProject,
}) => (
  <div className="thumbnails">
    { doc.results.map((result) => {
      const { uid, data } = result;
      return (
        <ProjectThumbnail
          title={RichText.asText(data.title)}
          image={data.thumbnail.mobile.url}
          uid={uid}
          key={uid}
          selectProject={() => selectProject(uid)}
        />);
    })}
  </div>
);

export default Thumbnails;
