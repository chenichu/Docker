//Load the SDK
var AWS = require('aws-sdk');

// Load Credentials
AWS.config.loadFromPath('./config.json');

//Enable Logging for SDK
AWS.config.logger = console;

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = "https://sqs.us-west-2.amazonaws.com/123456789012/TestQueue";

var params = {
  AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
        "All"
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function(err, data) {
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {
      console.log("Received message");
      console.log("---")
      
      var messageId= data.Messages[0].MessageId;
      var messageBody= data.Messages[0].Body;
      console.log("Message ID: " + messageId + ", Body: " + messageBody);

      var deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle
      };

      sqs.deleteMessage(deleteParams, function(err, data) {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message Deleted", data);
        }
      });

      console.log("---")
      console.log("Message Recieved and Processed!")
    }
  });