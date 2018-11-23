import React from 'react';
import getImageSize from 'util/getImageSize';
import config from 'config';
import { RichText } from 'prismic-reactjs';
import Thumbnail from 'components/Thumbnail/Thumbnail';
import './ThumbnailContainer.scss';

const Thumbnails = ({
  selectProject, projects,
}) => {
  const thumbnails = projects.map((result) => {
    const { uid, title } = result;
    return (
      <Thumbnail
        title={RichText.asText(title)}
        image={getImageSize(result.images[0], config.thumbnailSize)}
        uid={uid}
        key={uid}
        selectProject={() => selectProject(uid)}
      />);
  });

  return (
    <div className="thumbnails">
      {thumbnails}
    </div>
  );
};

export default Thumbnails;
