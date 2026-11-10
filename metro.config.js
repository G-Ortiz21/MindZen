const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  // Ruta relativa a la raíz del proyecto
  cssEntryFile: './src/global.css',
  dtsFile: './src/uniwind-types.d.ts',
});
