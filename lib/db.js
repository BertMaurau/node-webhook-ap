'use strict';

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/webhookAP';


/*  Document Structure *\
   {
      "_id": "59dccaea0c7ef1455c727659",
      "client_id": "255",
      "db_id": "353",
      "database": "MyDatabase",
      "webhooks": [{
         "url": "https://www.domain.com/url1",
         "customers": {
            "actions": ["create", "update", "delete"]
         },
         "products": {
            "actions": ["update"]
         }
      }, {
         "url": "https://www.domain.com/url2",
         "customers": {
            "actions": ["create"]
         },
         "products": {
            "actions": [""]
         }
      }]
   }
*/

exports.getByDBID = function(db_id, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        // Find the client where the db-id matches
        var cursor = db.collection('clients').find({ db_id: db_id }).toArray(function(err, result) {
            if (err) {
                // Handle errors here
                console.log(err);
            } else if (result) {
                // Return the result to set function
                callback(null, result);
            }
        });

    });

};