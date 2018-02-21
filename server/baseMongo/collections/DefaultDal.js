let BaseMongo = require("../BaseMongo");

class DefaultDal extends BaseMongo {
    constructor(db, collectionName) {
        super();
        this.db = db;
        this.collectionName = collectionName;
    }
}

module.exports = DefaultDal;