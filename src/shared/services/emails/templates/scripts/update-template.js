/**
 * Create and update SES templates for nicer/better emails.
 * @author dassiorleando
 */
 const AWS = require("aws-sdk");
 const SES = new AWS.SES({ region: "us-east-2" });
 
 // Let's get the template to create/save
 const template = require("./vin-template");

 
 (async () => {
   const result = await SES.updateTemplate(template).promise();
 })();