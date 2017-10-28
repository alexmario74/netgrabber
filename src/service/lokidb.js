'use strict'

const getCollection = (db, collName) => 
    (db.getCollection(collName) || db.addCollection(collName))

const isDevice = doc => !!doc.measures;

const getIdFilter = doc => {
    if (doc.id) return {id: doc.id};
    
    if (isDevice(doc)) return {name: doc.name};

    return {name: doc.name, device: doc.device, time: doc.time};
}

const store = (lokidb, coll, object) => {
    if (Array.isArray(object))
        object.forEach(obj => storeOne(lokidb, coll, obj));
    else
        storeOne(lokidb, coll, object);
}

const storeOne = (lokidb, coll, object) => {
    console.log('aaa', object);
    let doc = JSON.parse(object.serialize());

    const dbDoc = coll.findOne(getIdFilter(doc));

    if (dbDoc) {
        dbDoc.measures = doc.measures;
        coll.update(dbDoc);
    }
    
    coll.insert(doc);
}

const getAll = (db, coll) => coll.chain().find().data()

module.exports.MakeCache = function (lokidb, collName) {
    const coll = getCollection(lokidb, collName);

    return {
        store: store.bind(null, lokidb, coll),
        getAll: getAll.bind(null, lokidb, coll)
    }
};

exports = module.exports;