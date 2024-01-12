import mongoose from 'mongoose';

export async function connectMongoDB() {
	try {
		console.log(process.env.MONGODB_URL);
		console.error(process.env.MONGODB_URL)
		if (Number(mongoose.connection.readyState) !== 1) {
			await mongoose.connect(process.env.MONGODB_URL as string);
			console.log('Connected to MongoDB');
		}
	} catch (error) {
		console.log('Error connecting to MongoDB', error);
	}
}
