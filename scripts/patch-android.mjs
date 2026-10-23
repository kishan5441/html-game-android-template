import fs from 'node:fs';

const manifestPath = 'android/app/src/main/AndroidManifest.xml';
let manifest = fs.readFileSync(manifestPath, 'utf8');

// Orientation + hardware acceleration
manifest = manifest.replace(
  /android:name="\.MainActivity"/,
  'android:name=".MainActivity"\n            android:screenOrientation="sensorLandscape"\n            android:hardwareAccelerated="true"'
);

// Permissions
if (!manifest.includes('android.permission.INTERNET')) {
  manifest = manifest.replace(
    '</manifest>',
    `  <uses-permission android:name="android.permission.INTERNET" />\n  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />\n  <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />\n</manifest>`
  );
}

fs.writeFileSync(manifestPath, manifest);
console.log('Patched AndroidManifest.xml');
