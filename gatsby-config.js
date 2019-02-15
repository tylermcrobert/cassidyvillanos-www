module.exports = {
  siteMetadata: {
    title: 'Gatsby Microsite Playground',
    description: 'Messing around with Gatsby',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'cassidyvillanos',
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
      },
    },
  ],
};
