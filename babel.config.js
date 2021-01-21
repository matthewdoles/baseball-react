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
          shared: './src/shared',
        },
      },
    ],
  ],
};
