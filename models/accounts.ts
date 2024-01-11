import mongoose, { Schema, models } from 'mongoose';

const accountSchema = new Schema(
	{
		name: {
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
		siteinfo: {
			type: Object,
			default: {},
		},
	},
	{ timestamps: true }
);

const Account = models.Account || mongoose.model('Account', accountSchema);

export default Account;
