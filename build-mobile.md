
# Mobile Build Instructions for Wasfah AI Kitchen Pal

## Prerequisites

Before building for mobile platforms, ensure you have:

### For iOS:
- macOS with Xcode installed
- iOS development account (for device testing)
- CocoaPods installed: `sudo gem install cocoapods`

### For Android:
- Android Studio installed
- Java Development Kit (JDK) 11 or higher
- Android SDK and build tools

## Initial Setup

1. **Install Capacitor dependencies:**
```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
```

2. **Build the web application:**
```bash
npm run build
```

3. **Add mobile platforms:**
```bash
# Add iOS platform
npx cap add ios

# Add Android platform  
npx cap add android
```

4. **Sync project with native platforms:**
```bash
npx cap sync
```

## Building and Running

### For iOS:
```bash
# Open iOS project in Xcode
npx cap open ios

# Or run directly
npx cap run ios
```

### For Android:
```bash
# Open Android project in Android Studio
npx cap open android

# Or run directly
npx cap run android
```

## Production Build Steps

### iOS Production:
1. Open the project in Xcode: `npx cap open ios`
2. Set up signing certificates and provisioning profiles
3. Archive the application (Product > Archive)
4. Upload to App Store Connect

### Android Production:
1. Generate signed APK or AAB in Android Studio
2. Build > Generate Signed Bundle/APK
3. Upload to Google Play Console

## Configuration Files

- **capacitor.config.ts**: Main Capacitor configuration
- **android/**: Android-specific files and resources
- **ios/**: iOS-specific files and resources

## Important Notes

- Run `npx cap sync` after any changes to web assets
- Update native dependencies with `npx cap update`
- Test on physical devices for best results
- Ensure all required permissions are configured in native configs

## App Store Requirements

### iOS:
- App icons: 1024x1024 for App Store, various sizes for device
- Launch screens configured
- Privacy policy URL (if using personal data)
- App description and keywords

### Android:
- App icons: 512x512 for Play Store, various densities for devices
- Feature graphic: 1024x500
- Privacy policy (required for apps requesting permissions)
- App description and store listing

## Troubleshooting

- If build fails, try cleaning: `npx cap clean`
- Update Capacitor: `npm update @capacitor/core @capacitor/cli`
- Check platform-specific logs in Xcode/Android Studio
- Ensure web build is successful before syncing
