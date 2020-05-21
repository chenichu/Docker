var AWS = require('aws-sdk');

var sts = new AWS.STS();

var params = {
};
sts.getCallerIdentity(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
  /*
  data = {
   Account: "123456789012", 
   Arn: "arn:aws:iam::123456789012:user/Alice", 
   UserId: "AKIAI44QH8DHBEXAMPLE"
  }
  */
});