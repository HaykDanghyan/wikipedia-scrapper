import mongoose from "mongoose"

const Schema = mongoose.Schema;

const InvertedIndexSchema = new Schema({
    word: {
        type: String, 
        required: true
    },
    id: {
        type: [mongoose.Types.ObjectId],
        required: true
    }
});

const InvertedIndexes = mongoose.model("InvertedIndexes", InvertedIndexSchema);

export default InvertedIndexes;