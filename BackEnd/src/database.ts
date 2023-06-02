import { config } from 'dotenv';
config();
import { connect } from 'mongoose';
connect(process.env.MONGO_URI as string);

function connectToDatabase() {
	return connect(process.env.MONGO_URI as string);
}

export { connectToDatabase };
