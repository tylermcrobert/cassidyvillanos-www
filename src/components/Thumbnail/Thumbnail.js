import React from 'react';
import { Link } from 'react-router-dom';
import './Thumbnail.scss';

const ProjectThumbnail = ({
  title, image, uid,
}) => (
  <div className="thumbnails__thumbnail" >
    <Link to={`/work/${uid}`}>
      <img src={image} alt={`${title} — Cassidy Villanos`} />
    </Link>
    <p>{title}</p>
  </div>
);

ProjectThumbnail.defaultProps = {
  title: 'title',
  image: null,
};

export default ProjectThumbnail;
