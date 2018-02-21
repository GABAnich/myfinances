const BaseMongo = require("../BaseMongo");
const { ObjectID } = require("mongodb");

class UsersDal extends BaseMongo {
    constructor(db, collectionName) {
        super();
        this.db = db;
        this.collectionName = collectionName;
        this.ObjectID = ObjectID;
    }

    findById(id) {
        let query = {
            _id: new this.ObjectID(id)
        };

        return this.findOne(query);
    }

    findByLogin(login) {
        let query = {
            login: login
        };

        return this.findOne(query);
    }

    updateById(id, update, options) {
        let query = {
            _id: new this.ObjectID(id)
        };

        return this.updateOne(query, update, options);
    }

    updateByLogin(login, update, options) {
        let query = {
            login: login
        };

        return this.updateOne(query, update, options);
    }

    createUser(login, password, firstName, lastName) {
        let query = {
            login: login,
            password: password,
            firstName: firstName,
            lastName: lastName
        }

        return this.insertOne(query);
    }

    deleteById(id) {
        let query = {
            _id: new this.ObjectID(id)
        }

        return this.deleteOne(query);
    }

    deleteByLogin(login) {
        let query = {
            login: login
        }

        return this.deleteOne(query);
    }
}

module.exports = UsersDal;
