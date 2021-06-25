/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    src: { url: '/' },
  },
  workspaceRoot: '../',
  plugins: [
    [
      'snowpack-plugin-copy',
      {
        patterns: [
          {
            source: ['src/*.d.ts'],
            destination: 'lib',
          },
        ],
      },
    ],
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    // entrypoints:['Button.tsx']
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    external:['react', '@chakra-ui/react', '@chakra-ui/icons']
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out:'lib'
    /* ... */
  },
};
