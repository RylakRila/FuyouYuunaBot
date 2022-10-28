import { Schema, model } from 'mongoose';

const MemeSchema = new Schema({
    category: String,
    images: [String],
}, {
    collection: 'memes',
});

const Meme = model('Meme', MemeSchema);

export default Meme;