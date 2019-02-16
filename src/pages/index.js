import React from 'react';
import { graphql } from 'gatsby';
import Index from '../components/Index/Index';

export default ({ data }) => { //eslint-disable-line

  const projectData = data.prismicSite.data.projects.map((item) => {
    const projData = item.project.document[0];
    return {
      uid: projData.uid,
      imageRes: projData.data.images[0],
      title: projData.data.title.text,
    };
  });

  return (
    <Index projects={projectData} />
  );
};

export const projectsQuery = graphql`
  {
    prismicSite {
      data {
        site_name
        projects {
          project {
            document {
              uid
              data {
                title {
                  text
                }
                images {
                  image {
                    ...responsive
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment responsive on image_2 {
    localFile {
      childImageSharp {
        thumbnail: resize(width: 420, quality: 80) {
          src
        }
        mobile: fixed(width: 840, quality: 80) {
          src
        }
        laptop: fixed(width: 1680, quality: 80) {
          src
        }
        desktop: fixed(width: 2520, quality: 80) {
          src
        }
        desktopXl: fixed(width: 2880, quality: 80) {
          src
        }
      }
    }
  }
`;
