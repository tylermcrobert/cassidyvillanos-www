export default {
  apiEndpoint: 'https://cassidyvillanos.prismic.io/api/v2',

  linkResolver(doc) {
    if (doc.type === 'project') return `/${doc.uid}`;
    return '/';
  },
};
