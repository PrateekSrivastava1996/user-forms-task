const userCollection = require("../models/user");
const find = (condition) => userCollection.find(condition);
const findOne = (condition) => userCollection.findOne(condition);
const findById = (condition) => userCollection.findById(condition);
const post = (payload) => userCollection.create(payload);
const get = (condition) => userCollection.find(condition);

module.exports = {
     findOne,
     post,
     get,
     find,
     findById,
};
