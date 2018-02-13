var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

class BaseMongo {
    insertOne(doc, options, callback) {
        if (Object.keys(doc).length === 0) {
            return;
        }

        if (typeof options === "function") (callback = options), (options = {});
        options = options || {};

        this.collection.insertOne(doc, options, function(err, res) {
            if (err) throw err;

            if (typeof callback === "function") {
                callback(document);
            }
        });
    }

    insertMany(docs, options, callback) {
        if (!Array.isArray(docs)) {
            return;
        } else if (docs.length === 0) {
            return;
        }

        if (typeof options === "function") (callback = options), (options = {});
        options = options || {};

        this.collection.insertMany(docs, options, function(err, res) {
            if (err) throw err;

            if (typeof callback === "function") {
                callback(res);
            }
        });
    }

    findOne(query, projection, callback) {
        if (typeof query === "function") (callback = query), (query = {}), (projection = {});
        if (typeof projection === "function") (callback = projection), (projection = {});
        query = query || {};
        projection = projection || {};

        this.collection.findOne(query, projection, function(err, document) {
            if (err) throw err;

            if (typeof callback === "function") {
                callback(document);
            }
        });
    }

    // Don't work, cursor is undefined
    find(query, options, callback, methods) {
        var selector = query;
        if (typeof callback !== "function") {
            if (typeof options === "function") {
                callback = options;
                options = undefined;
            } else if (options == null) {
                callback = typeof selector === "function" ? selector : undefined;
                selector = typeof selector === "object" ? selector : undefined;
            }
        }

        
        if (methods === undefined || methods === null) {
            methods = {
                skip: 0,
                limit: 0
            }
        } else if (Object.keys(methods).length === 0 && methods.constructor === Object) {
            if (methods.skip === undefined || methods.skip === null) {
                methods.skip = 0;
            }

            if (methods.limit === undefined || methods.limit === null) {
                methods.skip = 0;
            }
        }

        var cursor = this.collection.find(query);
        // cursor is undefined
        console.log(cursor);
        // cursor.skip(methods.skip);
        // cursor.limit(methods.limit);
        // cursor.toArray(function(err, document) {
        //     if (err) throw err;

        //     if (typeof callback === "function") {
        //         callback(document);
        //     }
        // });
    }

    updateOne(filter, update, options, callback) {
        if (typeof options === "function") (callback = options), (options = {});
        options = options || {};

        this.collection.updateOne(filter, update, options, function(err, document) {
            if (err) throw err;

            if (typeof callback === "function") {
                callback(document);
            }
        });
    }

    updateMany(filter, update, options, callback) {
        if (typeof options === 'function') (callback = options), (options = {});
        options = options || {};

        this.collection.updateMany(filter, update, options, function(err, document) {
            if (err) throw err;

            if (typeof callback === "function") {
                callback(document);
            }
        })
    }

    deleteOne(filter, options, callback) {
        if (typeof options === "function") (callback = options), (options = {});

        this.collection.deleteOne(filter, options, function(err, document) {
            if (err) throw err;

            if (typeof callback === "function") {
                callback(document);
            }
        });

    }

    deleteMany(filter, options, callback) {
        if (typeof options === "function") (callback = options), (options = {});

        this.collection.deleteMany(filter, options, function(err, document) {
            if (err) throw err;

            if (typeof callback === "function") {
                callback(document);
            }
        });
    }
}

var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, database) {
    if (err) throw err;

    db = database.db("mydb");

    // db.createCollection("collection", function(err, res) {
    //     if (err) throw err;

    //     console.log("Created collection");
    // });

    var obj = new BaseMongo();
    obj.collection = db.collection("collection");

    // obj.insertOne(
    //     {text: "func2"},
    //     { writeConcern: { w : "majority", wtimeout : 100 } },
    //     function(doc) {
    //         console.log(doc);
    //         console.log("func2");
    //     });

    // obj.insertMany(
    //     [{text: "20"}, {text: "20"}, {text: "20"}], 
    //     function(doc) {
    //         console.log(doc);
    //         console.log("done")
    //     });

    // obj.findOne({"_id": new mongodb.ObjectID("5a81dde81d9661c40c3f2415")}, function(doc) {
    //     console.log(doc);
    // });

    // obj.find({text: "20"}, {_id: 0}, function(doc) {
    //     console.log(doc);
    // });

    // obj.find(function(doc) {
    //     console.log(doc);
    // });

    // obj.updateOne({"_id": new mongodb.ObjectID("5a81dde81d9661c40c3f2415")},
    //         {$set: {author: "Jesica"}},
    //         {},
    //         function(doc) {
    //             console.log(doc);
    //         }
    //     );

    // obj.updateMany({text: 30}, { $set: { text: 540 } }, function(doc) {
    //     console.log(doc);
    // });

    // obj.deleteOne({"_id": new mongodb.ObjectID("5a81dde81d9661c40c3f2416")}, function(doc) {
    //     console.log(doc);
    // });

    // obj.deleteMany({text: "20"}, {}, function(doc) {
    //     console.log(doc);
    // });

    database.close();
});