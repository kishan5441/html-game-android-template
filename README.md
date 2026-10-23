# Hitman Cyber Shooter — Android

An offline HTML5 cyberpunk platformer shooter, packaged as a native Android app using Capacitor and built via GitHub Actions.

## 🎮 Game

- Cyberpunk platformer with multi-type enemies, boss fights, slow-mo headshots
- Offline, no ads (v1), no data collected
- Landscape, touch-optimized

## 📱 Play Store

- **Package ID:** `com.yourname.hitmancyber`
- **Min SDK:** 23 (Android 6.0)
- **Target SDK:** 35 (Android 15)
- **Versioning:** `versionCode = 100 + run_number`, `versionName` from git tag `v*`

## 🏗️ Build

Builds run automatically on GitHub Actions. No local Android SDK or Node.js required.

### Trigger a build

**Manual:** Actions → "Build Android AAB" → Run workflow

**Tag-based (preferred):**
```bash
git tag v1.0.0
git push origin v1.0.0
