import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  Context,
  Callback,
} from "aws-lambda";

export interface InputType {
  url: string;
  puppeteer: boolean;
}

export interface HouseDisclosureInput extends InputType {
  year: number;
  state: string;
}

export interface InputWithSelector extends InputType {
  selector?: string;
  unique?: boolean;
  limit?: number;
}

export type Handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => Promise<APIGatewayProxyResult>;
