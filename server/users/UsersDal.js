const BaseMongo = require("../baseMongo/BaseMongo");
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

    updateById(id, update, options) {
        let query = {
            _id: new this.ObjectID(id)
        };

        return this.updateOne(query, update, options);
    }

    // login, password, PIP
}

module.exports = UsersDal;

// let obj = new UserDal(db, "collection");
// obj.findById("5a86e7dfb8378027c05c8b3f")
//     .then(doc => {
//         console.log(doc);
//     })
//     .catch(err => {
//         if (err) throw err;
//     })

