import mongoose from 'mongoose';

let connected: boolean = false;

const connectDb = async () => {
    mongoose.set('strictQuery', true)

    //If the DB is already connected then don't connect again.
    if (connected) {
        console.log('MongoDB is connected')
        return;
    }
    //Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        connected = true;
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;