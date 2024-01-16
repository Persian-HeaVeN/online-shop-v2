import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import Account from '@/models/accounts';
import { getServerSession } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { connectMongoDB } from './mongodb';

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			async authorize(credentials: any) {
				try {
					await connectMongoDB();
					const { email, password } = credentials;
					const user = await Account.findOne({ email: email });
					if (!user) {
						return null;
					}
					const passwordMatched = await bcrypt.compare(
						password,
						user.password
					);
					if (!passwordMatched) {
						return null;
					}
					return user;
				} catch (error) {
					console.error('Error: ', error);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user, session, trigger }: any) {
			if (trigger === 'update') {
				Object.keys(session).map(async (key: any) => {
					token[key] = session[key];
					await Account.updateOne(
						{ email: token.email },
						{ [key]: session[key] }
					);
				});
			}

			

			// pass in user datas to token
			if (user) {
				return {
					...token,
					cart: user.cart,
					favorites: user.favorites,
					personalinfo: user.personalinfo,
					siteinfo: user.siteinfo,
				};
			}
			return token;
		},
		async session({ token, user, session }) {
			// pass in user datas to session
			return {
				...session,
				user: {
					...session.user,
					cart: token.cart,
					favorites: token.favorites,
					personalinfo: token.personalinfo,
					siteinfo: token.siteinfo,
					name: token.name,
				},
			};
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/entry',
	},
} satisfies NextAuthOptions;

export function getServerAuth() {
	return getServerSession(authOptions);
}
