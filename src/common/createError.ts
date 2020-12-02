import { APIGatewayProxyResult } from "aws-lambda";

// Log error and return to user.
export const createError = (e: Error): APIGatewayProxyResult => {
  console.error("❌", e);
  return {
    statusCode: 502,
    body: JSON.stringify({ message: e.message, name: e.name }),
  };
};
