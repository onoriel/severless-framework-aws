# Serverless Store

This is a web store built on Serverless Framework. To be deployed on AWS

![alt text](https://raw.githubusercontent.com/nachomillangarcia/openwebinars-serverless-store/master/architecture.png)


It is composed by a web client (deployed in S3), 5 lambda functions, an API Gateway and a table in DynamoDB.

Currently the client only contains views to create a new item (`create.html`), and list currents items and checkout one item (`index.html`)

## Bootstrap local environment

```
npm install
sls dynamodb install
sls offline start
```

In another terminal run this to bootstrap dynamodb tables:

```
sls dynamodb migrate
```

API is now available in http://localhost:3000

Open `./client/local/index.html` or `./client/local/create.html` to get the client in your browser.


## Deploy to AWS

First, configure `serverless.yaml` to use your preferred region and change the service name to not collide when creating S3 buckets for the client.

Then, deploy serverless services:

```
sls deploy
```

Once completed, configure the client by editing the file `./client/dev/config.js` and setting the endpoint for your API. (This step is to be improved with automation)

Finally, deploy the client to S3 with serveless finch plugin:
```
sls client deploy
```
