import { APIGatewayProxyEvent } from "aws-lambda";
import { isString } from "../util";

export const parseInput = (event: APIGatewayProxyEvent) => {
  const inputString = isString(event.body)
    ? event.body
    : JSON.stringify(event.body);
  const input = JSON.parse(inputString);
  return input;
};
