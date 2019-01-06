import React from 'react';
import { Link } from 'react-router-dom';
import { Heading, Thumbnail } from './styles';

const ProjectThumbnail = ({
  title, image, uid,
}) => (
  <Heading
    z-index={0}
    cursor={<Thumbnail src={image} alt={`${title} — Cassidy Villanos`} />}
  >
    <Link to={`/work/${uid}`}>
      {title}
    </Link>
  </Heading>
);


ProjectThumbnail.defaultProps = {
  title: 'title',
  image: null,
};

export default ProjectThumbnail;
