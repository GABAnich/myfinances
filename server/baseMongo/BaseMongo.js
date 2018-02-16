class BaseMongo {
    insertOne(doc, options) {
        if (Object.keys(doc).length === 0) {
            return;
        }

        return this.collection.insertOne(doc, options);
    }

    insertMany(docs, options) {
        if (!Array.isArray(docs)) {
            return;
        } else if (docs.length === 0) {
            return;
        }

        return this.collection.insertMany(docs, options);
    }

    findOne(query, options) {
        return this.collection.findOne(query, options);
    }

    find(query, options) {
        return this.collection.find(query, options);
    }

    updateOne(filter, update, options) {
        return this.collection.updateOne(filter, update, options);
    }

    updateMany(filter, update, options) {
        return this.collection.updateMany(filter, update, options);
    }

    deleteOne(filter, options) {
        return this.collection.deleteOne(filter, options);
    }

    deleteMany(filter, options) {
        return this.collection.deleteMany(filter, options);
    }
}

module.exports = BaseMongo;