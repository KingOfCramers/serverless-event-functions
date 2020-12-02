import { APIGatewayProxyResult } from "aws-lambda";

// Log success and return result.
export const createSuccess = (body: string): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body,
  };
};
