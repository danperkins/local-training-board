import { APIGatewayEvent } from "aws-lambda";
import { add, sub } from "date-fns";
import { iftttSecret } from "./secrets";
const items = [
  {
    created_at: sub(new Date(), { minutes: 10 }).toISOString(),
    call_time: add(new Date(), { days: 5 }).toISOString(),
    customer_name: "dan.perkins.testuser",
    meta: {
      id: "dp-test-1",
      timestamp: 1581384582
    }
  }
];

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
  const data = {
    accessToken:
      "eyJraWQiOiJUSFdTT0hQQ0xBd1JVaEZwZ3YycVNLU3hsWStDait3Mm1ScVkrVzZRUDBBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlN2IwZDViNi1jMzAwLTRkMGMtOGU2NS1hZTJkOTI0OThkNjMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImVtYWlsIiwiYXV0aF90aW1lIjoxNTgxMzg1MDU5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8xQ0hMaHFta1kiLCJleHAiOjE1ODEzODg2NTksImlhdCI6MTU4MTM4NTA1OSwidmVyc2lvbiI6MiwianRpIjoiNjFlZDZkZWQtNDZmZC00ZTE4LTgyY2ItY2RiMjI1NmZhNGUzIiwiY2xpZW50X2lkIjoiMmRodm5iM21mbTV2dWRhMGZiMzE3M3Ztc2oiLCJ1c2VybmFtZSI6ImlmdHR0LnRlc3QifQ.ISVYMaaRlYpOGJaCqIQc2guaLy_TK9UQjUgDH7BiWgcO3l1qM7DunyTn1LwVCAI8853zmDdORXc9lN45-XGdv65KmCr1lU-8UyZXeALOnSB81N4_Dc2NgEYm2_tChx3AmY3xJRCShvPpHG7AHX0XDtqkMO1njfLawAVXAVwyXOajoP_ldKJS61DQWZu1E4xx3dg585XrRNKcU8K3rHkL5fcNvR_DdM3n2AXlhx09qq4Wb8Qd_OuFg-6XpZTkgbmEfonIH0wCH6anINNnFJlSSYWf3t7B_6HIueCZJKL8g1OPcf13VjTIl4CZZ4G_HeAs27Bx83g-RDltXTSKKUmYkA",
    samples: {
      triggers: {
        dptest: {},
        new_thing_created: {}
      },
      triggerFieldValidations: {},
      actions: {},
      actionRecordSkipping: {}
    }
  };
  return {
    statusCode,
    body:
      statusCode === 200
        ? JSON.stringify({
            data
          })
        : "",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  };
};
