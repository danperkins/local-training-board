import { APIGatewayEvent } from "aws-lambda";
import { add, sub } from "date-fns";
const items = [
  {
    created_at: sub(new Date(), { minutes: 7 }).toISOString(),
    call_time: add(new Date(), { days: 4 }).toISOString(),
    customer_name: "Robert",
    meta: {
      id: "dp-test-5",
      timestamp: 1581384692
    }
  },
  {
    created_at: sub(new Date(), { minutes: 8 }).toISOString(),
    call_time: add(new Date(), { days: 2 }).toISOString(),
    customer_name: "Beth",
    meta: {
      id: "dp-test-4",
      timestamp: 1581384682
    }
  },
  {
    created_at: sub(new Date(), { minutes: 10 }).toISOString(),
    call_time: add(new Date(), { days: 5 }).toISOString(),
    customer_name: "Jenny",
    meta: {
      id: "dp-test-3",
      timestamp: 1581384582
    }
  },
  {
    created_at: sub(new Date(), { minutes: 22 }).toISOString(),
    call_time: add(new Date(), { days: 2 }).toISOString(),
    customer_name: "James",
    meta: {
      id: "dp-test-2",
      timestamp: 1581384482
    }
  },
  {
    created_at: sub(new Date(), { minutes: 93 }).toISOString(),
    call_time: add(new Date(), { days: 1 }).toISOString(),
    customer_name: "Frank",
    meta: {
      id: "dp-test-1",
      timestamp: 1581382582
    }
  }
];

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  try {
    const body = JSON.parse(event.body || "{}");
    let limit = body.limit >= 0 || body.limit < 50 ? body.limit : 50;
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: items.slice(items.length - limit)
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    };
  }
};
