const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Configuração padrão do Metro (bundler do React Native / Expo)
const config = getDefaultConfig(__dirname);

// Integra o NativeWind processando o global.css
module.exports = withNativeWind(config, { input: './global.css' });
