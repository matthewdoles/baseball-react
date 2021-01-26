module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          functions: './src/functions',
          hooks: './src/hooks',
          images: './src/images',
          pages: './src/pages',
          shared: './src/shared',
        },
      },
    ],
  ],
};
