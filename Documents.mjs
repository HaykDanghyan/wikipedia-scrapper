import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    url: {
        type: String, 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});

const Documents = mongoose.model("Documents", DocumentSchema);

export default Documents