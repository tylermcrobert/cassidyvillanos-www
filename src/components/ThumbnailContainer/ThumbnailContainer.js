import React from 'react';
import getImageSize from 'util/getImageSize';
import config from 'config';
import { RichText } from 'prismic-reactjs';
import Title from 'components/Title/Title';
import './ThumbnailContainer.scss';

const Thumbnails = ({
  selectProject, projects, titleSize,
}) => {
  const thumbnails = projects.map((result) => {
    const { uid, title } = result;
    return (
      <Title
        title={RichText.asText(title)}
        image={getImageSize(result.images[0], config.thumbnailSize)}
        uid={uid}
        key={uid}
        selectProject={() => selectProject(uid)}
      />);
  });

  return (
    <div className="thumbnails">
      <div style={{ fontSize: `calc(${titleSize}vw + ${titleSize}vh)` }}>
        {thumbnails}
      </div>
    </div>
  );
};

export default Thumbnails;
