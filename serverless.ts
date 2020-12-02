import type { Serverless, Functions } from "serverless/aws";
import * as funcs from "./src/handlers";

// Create our POST functions
// And have them run:
// 1) After events at the specific API
// 2) Every hour

const functions: Functions = {};
for (const func in funcs) {
  functions[func] = {
    handler: `index.${func}`,
    timeout: 20,
    events: [
      {
        schedule: {
          rate: "rate(1 hour)",
        },
      },
    ],
  };

  // When in development, add a POST endpoint to trigger with Postman
  if (process.env.IS_LOCAL === "true") {
    functions[func].events.push({
      http: {
        method: "post",
        path: `${func}`,
      },
    });
  }
}

const serverlessConfiguration: Serverless = {
  service: "webscraper-apis",
  frameworkVersion: "2",
  custom: {
    dotenv: {
      logging: false,
    },
    // Set offline port for the http server and
    // the lambdaPort to specify the AWS function
    "serverless-offline": {
      lambdaPort: 3000,
      httpPort: 3001,
    },
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
      forceExclude: ["puppeteer"],
    },
  },
  plugins: [
    "serverless-webpack",
    "serverless-offline",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  // Add our functions...
  functions,
};

module.exports = serverlessConfiguration;
