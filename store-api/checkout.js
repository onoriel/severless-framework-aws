'use strict';

const dynamodb = require('./dynamodb');

module.exports.checkout = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    // ExpressionAttributeNames : {
    //   '#stock' : 'stock'
    // },
    ExpressionAttributeValues: {
      ":p": 1,   // Substract 1 to stock
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET stock = stock - :p, updatedAt = :updatedAt ',
    ReturnValues: 'ALL_NEW',
  };

  // update the database
  dynamodb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t update the item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
