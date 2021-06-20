/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    // directory name: 'build directory'
    public: '/',
    src: '/dist'
  },
  plugins: [
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-typescript',
    ['@snowpack/plugin-webpack', {
      sourceMap: true
    }]
  ],
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html',
    },
  ],
  optimize: {
    bundle: true,
    minify: true,
    treeshake: true
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  alias: {
    'react': 'preact/compat',
    'react-dom': 'preact/compat'
  }
};
