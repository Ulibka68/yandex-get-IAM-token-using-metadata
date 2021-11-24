#!/bin/sh
#source ../.env
cd s3-compress-after-presign
pwd
export $(grep -v '^#' ./.env | xargs -d '\n')
rm -R dist

echo "npx tsc --build tsconfig.json"
npx tsc --build tsconfig.json
cp package.json ./dist/package.json


echo "Создание версии функции $FUNCTION_NAME"
yc serverless function version create \
  --function-name=$FUNCTION_NAME \
  --runtime nodejs14 \
  --entrypoint index.handler \
  --memory 256m \
  --execution-timeout 8s \
  --source-path ./dist \
  --service-account-id=$SERVICE_ACCOUNT_ID \
  --folder-id $FOLDER_ID \
  --environment AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY,AWS_REGION=$AWS_REGION,AWS_ENDPOINT=$AWS_ENDPOINT,COMPRESSBACKETNAME=$COMPRESSBACKETNAME,TMPBACKETNAME=$TMPBACKETNAME,COMPRESSBACKET_PREFIX=$COMPRESSBACKET_PREFIX

