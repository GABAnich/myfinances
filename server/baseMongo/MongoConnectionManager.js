const config = require("../../config");
const dbConfig = config.dbConfig;
const arrayOfCollections = config.collections;

const DefaultDal = require("./collections/DefaultDal");

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const fs = require("fs");
const path = require("path");

class MongoConnectionManager {
	constructor() {
		this.db = undefined;
		if (dbConfig.url === undefined || dbConfig.dbName === undefined) {
			throw new Error("config.url or config.dbName undefined");
		}
		this.dbUrl = dbConfig.url + dbConfig.dbName;
		this.collections = {};
	}

	setCollections() {
		arrayOfCollections.forEach(collectionName => {
			let location = "collections/" + collectionName.charAt(0).toUpperCase() + 
                        collectionName.slice(1) + "Dal.js";
			location = path.resolve(__dirname, location);

			if (fs.existsSync(location)) {
				this.collections[collectionName + "Dal"] = 
                    new (require(location))(this.connection, collectionName);
			} else {
				this.collections[collectionName + "Dal"] =
                    new DefaultDal(this.connection, collectionName);
			}
		});
	}

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
