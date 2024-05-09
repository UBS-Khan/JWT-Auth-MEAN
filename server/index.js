import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import roleRoutes from './routes/roles.js';

const app = express();
dotenv.config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('The Database has been connected!');
    } catch (error) {
        throw error;
    }
}

app.use(json());
app.use('/account', authRoutes);
app.use('/roles', roleRoutes);

app.listen(8080, () => {
    connectMongoDB()
    return console.log('The Server is up and running!');
})