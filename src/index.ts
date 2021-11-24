// require("dotenv").config(".env");
import { YC } from "./yc";
import fetch from "node-fetch";

module.exports.handler = async function (
  event: YC.CloudFunctionsHttpEvent,
  context: YC.CloudFunctionsContext
) {
  const { httpMethod, queryStringParameters } = event;

  if (httpMethod === "OPTIONS") {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify("Hello from Lambda!"),
    };
    return response;
  }

  if (httpMethod != "GET")
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        errMsg: "Используйте метод GET ",
      }),
      isBase64Encoded: false,
    };

  const inpFnames: Array<string> = context.getPayload();

  /* const outObject = {
    info: "Тестовый вызов ОК",
  };*/

  const outObject = await getIam();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(outObject),
    isBase64Encoded: false,
  };
};

const metaDataUrlIamToken =
  "http://169.254.169.254/computeMetadata/v1/instance/service-accounts/default/token";
const headers = { "Metadata-Flavor": "Google" };

async function getIam() {
  const resp = await fetch(metaDataUrlIamToken, {
    headers: headers,
  });
  return {
    code: resp.status,
    body: await resp.json(),
  };
}
