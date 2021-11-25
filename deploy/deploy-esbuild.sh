#!/bin/sh
#source ../.env
#cd s3-compress-after-presign
pwd
export $(grep -v '^#' ./.env | xargs -d '\n')
rm -R dist

echo "npm run esbuild-ydb"
npm run esbuild-ydb
#cp package.json ./dist/package.json


echo "Создание версии функции $FUNCTION_NAME"
yc serverless function version create \
  --function-name=$FUNCTION_NAME \
  --runtime nodejs14 \
  --entrypoint index.handler \
  --memory 256m \
  --execution-timeout 8s \
  --source-path ./dist/esbuild \
  --service-account-id=$SERVICE_ACCOUNT_ID \
  --folder-id $FOLDER_ID \
  --environment DOCUMENT_API_ENDPOINT=$DOCUMENT_API_ENDPOINT,DATABASENAME=$DATABASENAME,YDB_SDK_LOGLEVEL=$YDB_SDK_LOGLEVEL,LOGLEVEL=$LOGLEVEL,ENTRYPOINT=$ENTRYPOINT

