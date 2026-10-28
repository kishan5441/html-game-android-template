import fs from 'node:fs';

const gradlePath = 'android/app/build.gradle';
let gradle = fs.readFileSync(gradlePath, 'utf8');

// 1. Properties load karne ka code top par
if (!gradle.includes('keystoreProperties.load')) {
  const props = `
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {`;
  gradle = gradle.replace('android {', props);
}

// 2. Signing Config block (Safe null handling ke saath)
if (!gradle.includes('signingConfigs {')) {
  const signing = `
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias'] ?: ""
            keyPassword keystoreProperties['keyPassword'] ?: ""
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword'] ?: ""
        }
    }
    buildTypes {`;
  gradle = gradle.replace('buildTypes {', signing);
}

// 3. Release build type ke andar signingConfig lagana
if (!gradle.includes('signingConfig signingConfigs.release')) {
  gradle = gradle.replace(
    /buildTypes\s*\{\s*release\s*\{/,
    `buildTypes {
        release {
            signingConfig signingConfigs.release`
  );
}

fs.writeFileSync(gradlePath, gradle);
console.log('✅ Patched build.gradle perfectly');
