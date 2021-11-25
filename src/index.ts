require("dotenv").config(".env");
import { YC } from "./yc";
import fetch from "node-fetch";
import {
  getLogger,
  Driver,
  Logger,
  MetadataAuthService,
  Session,
} from "ydb-sdk";

const databaseName = process.env.DATABASENAME!;
const logger = getLogger({ level: process.env.LOGLEVEL! });
const entryPoint = process.env.ENTRYPOINT!;
let driver: Driver = null as unknown as Driver; // singleton

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

  // const inpFnames: Array<string> = context.getPayload();

  /* const outObject = {
    info: "Тестовый вызов ОК",
  };*/

  await initYDBdriver();

  const outObject: any = driver ? { res: true } : { res: false };

  await driver.tableClient.withSession(async (session) => {
    outObject.tableDef = await describeTable(session, "series", logger);
  });

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

export async function initYDBdriver() {
  if (driver) return; // singleton
  logger.info("Start preparing driver ...");
  const authService = new MetadataAuthService(databaseName);
  driver = new Driver(entryPoint, databaseName, authService);

  if (!(await driver.ready(10000))) {
    logger.fatal(`Driver has not become ready in 10 seconds!`);
    process.exit(1);
  }
  return driver;
}

export async function describeTable(
  session: Session,
  tableName: string,
  logger: Logger
) {
  logger.info(`Describing table: ${tableName}`);
  const result = await session.describeTable(tableName);
  const resultObj: any = { info: `Describe table  ${tableName}` };
  const columns = [];
  for (const column of result.columns) {
    columns.push({
      name: column.name,
      type: column.type!.optionalType!.item!.typeId!,
    });
  }
  resultObj.columns = columns;
  return resultObj;
}
