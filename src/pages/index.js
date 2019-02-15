import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Index from '../components/Index/Index';

export default () => {
  const projectsQuery = useStaticQuery(graphql`
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

  `).prismicSite.data.projects.map((item) => {
    const projData = item.project.document[0];
    return {
      uid: projData.uid,
      image: projData.data.images[0].image.mobile.url,
      title: projData.data.title.text,
    };
  });

  return (
    <Index projects={projectsQuery} />
  );
};
