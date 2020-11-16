# Stencil + Ionic + GraphQL demo = awesomeness!

## Development tools

You must have the following tools installed on your machine:

- Node (>= 14) and npm
- pnpm (>= 5), just run `npm i -g pnpm`
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
