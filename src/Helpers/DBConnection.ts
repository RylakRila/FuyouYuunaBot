import { connect } from 'mongoose';

export const connectMongoDB = async (url: string) => {
    console.log("Connecting to MongoDB...");
    
    await connect(url)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => {
            console.error(err);
        });
}
