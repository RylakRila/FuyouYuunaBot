import { Schema, model } from 'mongoose';

const MemeSchema = new Schema({
    category: String,
    options: [String],
}, {
    collection: 'memes',
});

const Meme = model('Meme', MemeSchema);

export default Meme;