import mongoose from 'mongoose';

export async function connectMongoDB() {
	try {
		if (Number(mongoose.connection.readyState) !== 1 && Number(mongoose.connection.readyState) !== 2) {
			await mongoose.connect(process.env.MONGODB_URL as string);
			console.log('Connected to MongoDB');
		}
	} catch (error) {
		console.error('Error connecting to MongoDB', error);
	}
}
