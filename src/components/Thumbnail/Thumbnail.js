import React from 'react';
import { Link } from 'react-router-dom';
import CursorTrigger from 'containers/Cursor/CursorTrigger';
import './Thumbnail.scss';

const ProjectThumbnail = ({
  title, image, uid,
}) => (
  <>
    <CursorTrigger
      z-index={0}
      className="thumbnails__thumbnail"
      cursor={<img src={image} className="thumbnails__thumbnail--image" alt={`${title} — Cassidy Villanos`} />}
    >
      <Link to={`/work/${uid}`}>
        {title}
      </Link>
    </CursorTrigger>
</>

);

ProjectThumbnail.defaultProps = {
  title: 'title',
  image: null,
};

export default ProjectThumbnail;
