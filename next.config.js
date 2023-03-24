/**
@type {import('next').NextConfig}  */

module.exports = {
  // basePath: '/search',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['image.tmdb.org', 'via.placeholder.com'],
  },
};
