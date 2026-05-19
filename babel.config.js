module.exports = function (api) {
  // Cache do Babel para builds mais rápidos
  api.cache(true);

  return {
    presets: [
      // jsxImportSource permite className no JSX via NativeWind
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // Plugin do Reanimated — deve ser o último da lista
      'react-native-reanimated/plugin',
    ],
  };
};
