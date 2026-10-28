import fs from 'node:fs';

const gradlePath = 'android/app/build.gradle';
let gradle = fs.readFileSync(gradlePath, 'utf8');

// 1. Key properties load karne ka code
const propsLoading = `
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {`;

if (!gradle.includes('keystoreProperties')) {
  gradle = gradle.replace('android {', propsLoading);
}

// 2. Signing config add karna
const signingConfigs = `
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
`;

if (!gradle.includes('signingConfigs {')) {
  gradle = gradle.replace(/buildTypes\s*\{/, signingConfigs + '\n    buildTypes {');
}

// 3. Release build ko signing config se jodna
if (!gradle.includes('signingConfig signingConfigs.release')) {
  gradle = gradle.replace(/release\s*\{/, 'release {\n            signingConfig signingConfigs.release');
}

fs.writeFileSync(gradlePath, gradle);
console.log('✅ Patched build.gradle successfully');
