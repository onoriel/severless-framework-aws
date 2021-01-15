
'use strict';

const dynamodb = require('./dynamodb');

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  // fetch from the database
  dynamodb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the item.',
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
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
