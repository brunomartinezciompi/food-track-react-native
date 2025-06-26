module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/navigation/screens',
            '@navigation': './src/navigation',
            '@constants': './src/constants',
            '@assets': './src/assets',
            '@types': './src/types.ts',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@services': './src/services',
          },
        },
      ],
    ],
  };
}; 