# 🚀 Routines for Cloture

These are the serverless functions that run every half hour and run our scrapers.

They then sent a QGL POST to our API in an attempt to save the data.

## Installation

`yarn install`

## Development

To spin up the development server locally, run `yarn dev`

This is an alias for the `serverless offline` command which uses the serverless-offline plugin to spin up a development server with our lambdas at various endpoints.

The functions are then triggered, starting the flow that in production would only run every hour.

## Deployment

`yarn deploy:prod`

This command set the `NODE_ENV` to production, loading the correct environment variables, and then deploys the function to the cloud (configuration inside the `serverless.ts` file) on the prod stage.

You can also deploy to the dev stage with the `yarn deploy:dev` command, which is an alias for the development stage with serverless.
