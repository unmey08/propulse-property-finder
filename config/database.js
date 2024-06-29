import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true); //only fields specified in schema are stored in DB
    // if DB connected, don't connect again
    if (connected) {
        console.log('Mongo DB is already connected');
        return;
    }

    //connect to Mongo DB
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        connected = true;
        console.log('DB Connected');
    }
    catch (err) {
        console.log(err);
    }
}

export default connectDB;