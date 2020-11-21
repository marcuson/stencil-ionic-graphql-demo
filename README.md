# Stencil + Ionic + GraphQL demo = awesomeness!

## Development tools

You must have at least the following tools installed on your machine:

- Node (ver. 14+) and npm
- pnpm (ver. 5+), just run `npm i -g pnpm` to install
- an IDE of your choice (VSCode recommended)

IF you want to try out the Android app, you should also have installed:

- Android Studio
- Android SDK (you can install it via SDK Manager inside Android Studio). Remember to install SDK
  API level 29 or the build will not work

## How to install required dependencies

In the root directory, just run:

```bash
pnpm i:all
```

## How to start the web demo

In the root directory, run these commands in sequence:

```bash
pnpm run gqlgen
pnpm run watch
```

The API server should listen on port `3000`.
The Stencil app should open on browser, port `3333`.

**NOTE**: API server needs a little time to build, if you see some "connection refused" errors
on browser console try to wait a bit and then reload the page manually.

## How to start the Android demo

**NOTE**: For this to work, your phone and PC should be connected to the same subnet!

Connect your phone to your PC in debug mode. Then in the root directory, from another shell, run:

```bash
pnpm run android
```

Android Studio should open. You can build and install the app on your mobile via Gradle task
"installDebug" (this might take a while the first time).

Then start the web demo to spin up the API server (see previous section).

The API server should listen on port `3000` of your PC. You can open the app on your phone (search
for 'sig-demo-app' on your app drawer).
