var db = require('./lib/db.js');

var express = require('express');
var http = require('http');
var app = express();

var port = process.env.PORT || 3000;

app.use('/:dbId/:typeId/:actionId/:modelId', async function(req, res, next) {

    objResponse = validateParams(req.params);

    if (objResponse.code !== 200) {
        res.json(objResponse);
        next();
    } else {

        // Continue and fetch document
        db.getByDBID(objResponse.data.dbId, function(err, result) {
            res.jsonp(result);
            next();
        });
    }
});

app.listen(port);
console.log('I\'m waiting for your requests on port ' + port + '!');

// Function to check the given URL params
function validateParams(query) {

    var objResponse = {
        code: 200, // Contains the response code
        message: null, // Will contain the error message
        data: {} // Contains the valid data
    };

    // \/ The part below can be handled a lot better, but ohwell.. for now..

    // Validate DB ID
    if (!query.dbId) {
        objResponse.message = '{dbId} not specified!';
        objResponse.code = 406;
    } else {
        objResponse.data.dbId = query.dbId;
    }
    // Validate Type ID
    if (!query.typeId) {
        objResponse.message = '{typeId} not specified!';
        objResponse.code = 406;
    } else {
        // Check if it's an allowd type
        if (!["customer", "product"].includes(query.typeId)) {
            objResponse.message = '{typeId} must be a member of ["customer", "product"]!';
            objResponse.code = 406;
        } else {
            objResponse.data.typeId = query.typeId;
        }
    }
    // Validate Type ID
    if (!query.actionId) {
        objResponse.message = '{actionId} not specified!';
        objResponse.code = 406;
    } else {
        // Check if it's an allowd action
        if (!["create", "update", "delete"].includes(query.actionId)) {
            objResponse.message = '{actionId} must be a member of ["create", "update", "delete"]!';
            objResponse.code = 406;
        } else {
            objResponse.data.actionId = query.actionId;
        }
    }
    // Validate Model ID ID
    if (!query.modelId) {
        objResponse.message = '{modelId} not specified!';
        objResponse.code = 406;
    } else {
        objResponse.data.modelId = query.modelId;
    }

    return objResponse;
}