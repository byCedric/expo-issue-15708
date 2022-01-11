# Expo issue 15708

There might be an issue with `expo-updates` related to the embedded bundle.
When people build a new app with EAS, that includes `expo-updates`, the first load will crash.

> Only happens on Android so far

## Repro conditions

- App **MUST NOT** have _any_ updates
- App should be build with EAS
  > `$ eas build -p all --profile production`
- Install the production APK on an Android phone or simulator

## Symptoms

- When the app doesn't have updates, the manifest endpoint returns `NOT_FOUND`. This results in the app thinking it doesn't have a bundle to load, and crashes.
- The same happens when the phone is in airplane mode, and no update was downloaded before.
