import { Schema, model } from "mongoose";

const keywordSchema = new Schema({
    identifer: String,
    keywords: [String],
    responses: [String]
}, {
    collection: 'keywords'
});

const Keyword = model("Keyword", keywordSchema);

export default Keyword;