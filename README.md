# EcommDemo Mobile Application

## Overview
EcommDemo is a mobile application designed for demonstration purposes. Follow the instructions below to set up, run, and troubleshoot the application on both Android and iOS platforms.

## Prerequisites
- Node.js installed on your machine.
- Yarn package manager installed.
- Android Studio (for Android development).
- Xcode with Command Line Tools (for iOS development).

## Installation Instructions

### Clone the Repository
```bash
git clone https://github.com/paingpyaethu/EcommDemo
```

### Switch to the Correct Branch
The latest branch is `dev`. Ensure you are on this branch:
```bash
git checkout dev
```

### Remove Git History (Optional)
If required, you can remove the Git history:
```bash
rm -rf .git
```

### Install Dependencies
Install the necessary dependencies using Yarn:
```bash
yarn install
```

### Set Up the `.env` File
Before running the application, create a `.env` file in the root directory and fill it with the required information. Here is an example:

```env
API_END_POINT: http://[HOST FROM BACKEND]:[PORT FROM BACKEND]/[API_URL FROM BACKEND]
PHOTO_URL_END_POINT: http://[HOST FROM BACKEND]:[PORT FROM BACKEND]/api/storage/images
```

#### Example Configuration:
```env
API_END_POINT: http://192.168.8.100:8000/api/demo-ecomm/v1
PHOTO_URL_END_POINT: http://192.168.8.100:8000/api/storage/images
```

## Running the Application

### General Commands
- For Android:
  ```bash
  yarn android
  ```
- For iPhone 15:
  ```bash
  yarn iphone15
  ```
- For iPad:
  ```bash
  yarn ipad
  ```
- For iOS (general):
  ```bash
  yarn ios
  ```

### Android Specific Instructions
If you encounter issues during the build process:
1. Clean the Android build files:
   ```bash
   yarn clean:android
   yarn clean:gradle
   ```
2. Re-run the Android app:
   ```bash
   yarn android
   ```

#### Optional
You can build the app or sync with the Gradle file using Android Studio to ensure a clean build.

### iOS Specific Instructions

1. Install CocoaPods dependencies:
   ```bash
   yarn pod:install
   ```
2. Run the iOS simulator with a specific device:
   ```bash
   yarn ios
   ```
3. Ensure the correct `NODE_BINARY` path is set in `.xcode.env.local`.

#### Troubleshooting iOS Build Issues
If you encounter build issues:
1. Clean the iOS build files:
   ```bash
   yarn clean:ios
   ```
2. Delete `Gemfile.lock` and reinstall the dependencies:
   ```bash
   rm Gemfile.lock
   bundle install
   ```
3. Reinstall CocoaPods dependencies:
   ```bash
   yarn pod:install
   ```
4. Rebuild the app.

## Important Notes
- After modifying the `API_END_POINT` or `PHOTO_URL_END_POINT` in the `.env` file, restart the terminal and run the following command to reset the cache:
  ```bash
  yarn start --reset-cache
  ```
  Reload the app afterward.

## Conclusion
Congratulations! You have successfully set up and run the EcommDemo application. If you encounter any issues or have any questions, feel free to reach out.

Thank you!
