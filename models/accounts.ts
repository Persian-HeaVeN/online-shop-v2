import mongoose, { Schema, models } from 'mongoose';

const accountSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: 'user',
		},
		cart: {
			type: Array,
			default: [],
		},
		favorites: {
			type: Array,
            default: [],
		},
		authenticated: {
			type: Boolean,
			default: false,
		},
		personalinfo: {
			type: Object,
			default: {},
		},
	},
	{ timestamps: true }
);

const Account = models.Account || mongoose.model('Account', accountSchema);

export default Account;
