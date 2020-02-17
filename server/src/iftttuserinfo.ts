import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: {
        name: "dp-test",
        id: "dp-test-id"
      }
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  };
};
