# Stencil + Ionic + GraphQL demo = awesomeness!

## Development tools

You must have the following tools installed on your machine:

- Node (ver. 14+) and npm
- pnpm (ver. 5+), just run `npm i -g pnpm` to install
- an IDE of your choice (VSCode recommended)

## How to start the demo

In the root directory, run thse commands in sequence:

```bash
pnpm i:all
pnpm run gqlgen
pnpm run watch
```

The API server should listen on port `3000`.
The Stencil app should open on browser, port `3333`.

**NOTE**: API server nedds a little time to build, if you see some "connection refused" errors
on browser console try to wait a bit and then reload the page manually.
