const config = require("../../config").dbConfig;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

class MongoConnectionManager {
    constructor() {
        this.db = undefined;
        // validation
        this.dbUrl = config.url + config.dbName;
    }

    // Promise or sync
    connect() {
        return MongoClient.connect(this.dbUrl)
            .then(db => {
                this.setConnection(db);
            })
            .catch(err => {
                if (err) throw err;
            });  

    }

    setConnection(db) {
        this.db = db;
    }

    closeConnection() {
        if (this.db === undefined) {
            return;
        }

        this.db.close();
        console.log("DB connection closed");
    }

    get connection() {
        return this.db;
    }

    getDbUrl() {
        return this.dbUrl;
    }
}

module.exports = new MongoConnectionManager();

// let obj = new MongoConnectionManager();
// obj.connect()
//     .then(() => {
//         console.log("Connected");
//         return obj.connection;
//     })
//     .then((connection) => {
//         console.log(connection);
//     })
//     .then(() => {
//         obj.closeConnection();
//     })
//     .catch((err) => {
//         if (err) throw err;
//     });

// const BaseMongo = require("./BaseMongo.js");
// var obj = new BaseMongo();
// obj.collection = db.collection("collection");

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