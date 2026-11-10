// Plugin de configuración local (config plugin).
//
// `expo-splash-screen` escribe siempre en `android/app/src/main/res/values/styles.xml`
// el item `windowSplashScreenAnimatedIcon` apuntando a `@drawable/splashscreen_logo`,
// pero solo crea ese drawable cuando se configura `image` en el plugin.
// Como este proyecto no usa imágenes personalizadas, la referencia queda rota y
// el enlace de recursos de Android falla en `:app:processReleaseResources`.
//
// Este plugin elimina esa referencia para dejar una pantalla de inicio de solo
// color (el `backgroundColor` configurado en `expo-splash-screen`).
//
// Orden importante: en `app.json` este plugin debe ir ANTES de
// `expo-splash-screen`. Los mods de Expo se encadenan en orden inverso (el
// último registrado ejecuta primero y delega en los anteriores), así que
// registrarse antes es lo que hace que esta corrección se aplique al final.
const { withAndroidStyles } = require('expo/config-plugins');

const SPLASH_STYLE_NAME = 'Theme.App.SplashScreen';
const MISSING_DRAWABLE = 'splashscreen_logo';

const isBrokenSplashReference = (item) => {
  const name = item?.$?.name ?? '';
  const value = String(item?._ ?? '');
  return name === 'windowSplashScreenAnimatedIcon' || value.includes(MISSING_DRAWABLE);
};

const withColorOnlySplash = (config) =>
  withAndroidStyles(config, (modConfig) => {
    const styles = modConfig.modResults.resources.style ?? [];
    modConfig.modResults.resources.style = styles.map((style) => {
      if (style?.$?.name !== SPLASH_STYLE_NAME) {
        return style;
      }
      return {
        ...style,
        item: (style.item ?? []).filter((item) => !isBrokenSplashReference(item)),
      };
    });
    return modConfig;
  });

module.exports = withColorOnlySplash;
