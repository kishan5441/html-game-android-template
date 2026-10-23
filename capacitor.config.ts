import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourname.hitman',
  appName: 'Hitman Cyber Shooter',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#050811',
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      showSpinner: false
    }
  }
};

export default config;
