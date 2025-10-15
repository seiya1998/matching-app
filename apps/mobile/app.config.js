const APP_VARIANT = process.env.APP_VARIANT ?? 'development';
const IS_PRODUCTION = APP_VARIANT === 'production';
const APP_NAME = IS_PRODUCTION ? 'Mirai' : `Mirai (${APP_VARIANT})`;
const APP_ID = IS_PRODUCTION
  ? 'com.mirai.app'
  : `com.mirai.app.${APP_VARIANT}`;

export default {
  expo: {
    name: APP_NAME,
    slug: "mirai-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "mirai",
    userInterfaceStyle: "light",
    runtimeVersion: {
      policy: 'appVersion'
    },
    newArchEnabled: true,
    ios: {
      supportsTablet: false,
      bundleIdentifier: APP_ID,
      simulator: true,
      config: {
        usesNonExemptEncryption: false
      },
      infoPlist: {
        CFBundleLocalizations: ['ja_JP'],
        CFBundleDevelopmentRegion: 'ja_JP'
      }
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      package: APP_ID,
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-build-properties",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000"
          }
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "78767224-8208-49d2-97d0-2c9473edc2a5"
      }
    }
  }
};