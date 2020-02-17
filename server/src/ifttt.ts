import { APIGatewayEvent } from "aws-lambda";
import { iftttSecret } from "./secrets";

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  let statusCode = 200;
  const iftttkey = event.headers["Ifttt-Channel-Key"];
  const iftttServiceKey = event.headers["Ifttt-Service-Key"];
  if (iftttkey && iftttkey.localeCompare(iftttSecret) !== 0) {
    statusCode = 401;
  }
  if (iftttServiceKey && iftttServiceKey.localeCompare(iftttSecret) !== 0) {
    statusCode = 401;
  }
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      data: {
        headers: event.headers
      }
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  };
};
