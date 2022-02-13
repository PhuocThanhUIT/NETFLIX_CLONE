const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title: {type: "string", required: true, unique: true},
    type: {type: "string"},
    genre: {type: "string"},
    content:{type:"array"},
    },
    {timestamps: true}
);

module.exports = mongoose.model("List",ListSchema);