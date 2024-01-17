import 'next-auth';

interface ExtendedUser {
	name?: string;
	email?: string;
	favorites?: [];
	authenticated?: boolean;
	cart?: [];
	personalinfo?: {};
	siteinfo?: {
		profile: number;
		wallet: number,
	};
}

declare module 'next-auth' {
	interface Session {
		user?: ExtendedUser;
	}
}
