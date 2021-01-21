module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          images: './src/images',
          shared: './src/shared',
        },
      },
    ],
  ],
};
