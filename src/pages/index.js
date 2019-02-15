import React from 'react';
import { graphql } from 'gatsby';
import Index from '../components/Index/Index';

export default ({ data }) => { //eslint-disable-line
  const projectData = data.prismicSite.data.projects.map((item) => {
    const projData = item.project.document[0];
    return {
      uid: projData.uid,
      image: projData.data.images[0].image.mobile.url,
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
          projects{
            project{
              document {
                uid
                data{
                  title{
                    text
                  }
                  images{
                    image{
                      mobile{
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
`;
