import 'next-auth';

interface ExtendedUser {
	name?: string;
	email?: string;
	favorites?: [];
	authenticated?: boolean;
	cart?: [];
	personalinfo?: {};
	siteinfo?: {};
}

declare module 'next-auth' {
	interface Session {
		user?: ExtendedUser;
	}
}
