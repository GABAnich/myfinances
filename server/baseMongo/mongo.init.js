// setup db connection

let BaseMongo = require("./BaseMongo.js");
let config = require("../../config");

var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

module.exports.init = function() {
    if (config.url === undefined || config.url === null) {
        return;
    }

    MongoClient.connect(config.url, function(err, database) {
        if (err) throw err;

        if (config.dbName === undefined || config.dbName === null) {
            return;
        }
        db = database.db(config.dbName);

        var obj = new BaseMongo();
        obj.collection = db.collection("collection");

        // obj.insertOne(
        //     {text: "text12"},
        //     { writeConcern: { w : "majority", wtimeout : 100 } })
        //     .then(function() {
        //         console.log("Added obj");
        //     })
        //     .catch(function() {
        //         console.log("Error");
        //     });

        // obj.insertMany(
        //     [{text: "text9"}, {text: "text10"}, {text: "text11"}], {})
        //     .then(function() {
        //         console.log("Added obj");
        //     })
        //     .catch(function() {
        //         console.log("Error (");
        //     });

        // obj.findOne({"_id": new mongodb.ObjectID("5a85dfb99ec98dddd5aeff8f")},
        //     {projection: {_id: 0} })
        // .then(function(doc) {
        //     console.log(doc);
        // })
        // .catch(function() {
        //     console.log("Error");
        // });

        // obj.find({}, {projection: {_id: 0}})
        // .skip(2)
        // .limit(4)
        // .toArray()
        // .then(function(docs) {
        //     console.log(docs);
        // })
        // .catch(function(err) {
        //     if (err) throw err;
        // });

        // obj.updateOne({"_id": new mongodb.ObjectID("5a85dfb99ec98dddd5aeff8f")},
        //         {$set: {text: "Jesica"}},
        //         {}
        //     )
        //     .then(function(res) {
        //         console.log(res);
        //     })
        //     .catch(function(err) {
        //         if (err) throw err;
        //     });

        // obj.updateMany({text: "text9"}, { $set: { text: "Jesica1" } })
        // .then(function(res) {
        //     console.log(res);
        // })
        // .catch(function(err) {
        //     if (err) throw err;
        // });

        // obj.deleteOne({text: "text10"})
        // .then(function() {
        //     console.log("Deleted");
        // })
        // .catch(function(err) {
        //     if (err) throw err;
        // });

        // obj.deleteMany({text: "text11"}, {})
        // .then(function() {
        //     console.log("Deleted");
        // })
        // .catch(function(err) {
        //     if (err) throw err;
        // });

        database.close();
    });
}