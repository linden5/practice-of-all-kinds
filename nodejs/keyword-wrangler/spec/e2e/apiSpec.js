"use strict";

var request = require("request");
var dbSession = require("../../src/backend/dbSession.js");
var Server = require("../../src/backend/server.js").Server;
var resetDatabase = require("../resetDatabase.js");
var async = require("async");

describe("The API", function() {
    var server;

    beforeEach(function(done) {
        server = Server(8081);
        server.listen(function(err) {
            resetDatabase(dbSession, function() {
                done(err);
            });
        });
    });

    afterEach(function(done) {
        server.close(function() {
            resetDatabase(dbSession, function() {
                done();
            });            
        });
    });

    it("should respond to a GET request at /api/keywords/", function(done) {
        var expected = {
            "_items": [
                {"id": 1, "value": "Aubergine", "categoryID": 1},
                {"id": 2, "value": "Onion", "categoryID": 1},
                {"id": 3, "value": "Knife", "categoryID": 2}
            ]
        };

        async.series([
            function(callback) {
                console.log("----------------");
                console.log("insert Aubergine");
                dbSession.insert(
                    "keyword", 
                    {"value": "Aubergine", "categoryID":1},
                    function(err) {
                        console.log("insert Aubergine finish");
                        callback(err);});
            },

            function(callback) {
                console.log("insert Onion");
                dbSession.insert(
                    "keyword", 
                    {"value": "Onion", "categoryID":1},
                    function(err) {
                        console.log("insert Onion finish");
                        callback(err);});
            },

            function(callback) {
                console.log("insert Knife");
                dbSession.insert(
                    "keyword",
                    {"value": "Knife", "categoryID":2},
                    function(err) {
                        console.log("insert Knife finish");
                        callback(err)});
            }
        ], function(err, results) {
            if (err) throw(err);
            console.log("------------------");
            console.log("Send get");
            request.get(
                {
                    "url": "http://localhost:8081/api/keywords",
                    "json": true
                },
                function(err, res, body) {
                    console.log("Response received");
                    expect(res.statusCode).toBe(200);
                    expect(body).toEqual(expected);
                    done();
                });
        });
    });
});