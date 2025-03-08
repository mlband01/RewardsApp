import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/mongodb';
import User from '@/app/models/User';
import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

interface UserWithAdmin {
  id: string;
  name?: string | null;
  email?: string | null;
  isAdmin: boolean;
}

// Demo users for testing when MongoDB is not available
const DEMO_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    password: 'password123',
    isAdmin: false
  },
  {
    id: '2',
    name: 'Demo Admin',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true
  }
];

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        isAdmin: { label: 'Is Admin', type: 'boolean' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing credentials: email or password not provided');
          throw new Error('Missing credentials');
        }

        try {
          // Check if this is an admin login attempt
          const isAdminLogin = credentials.isAdmin === 'true';
          console.log(`Login attempt as ${isAdminLogin ? 'admin' : 'regular user'}`);
          
          // First try to use demo users (for when MongoDB is not available)
          const demoUser = DEMO_USERS.find(user => 
            user.email === credentials.email && 
            user.password === credentials.password &&
            (isAdminLogin ? user.isAdmin : true)
          );
          
          if (demoUser) {
            console.log(`Demo user authenticated successfully: ${demoUser.email}`);
            return {
              id: demoUser.id,
              name: demoUser.name,
              email: demoUser.email,
              isAdmin: demoUser.isAdmin,
            };
          }
          
          // If no demo user matched, try MongoDB connection
          try {
            // Ensure MongoDB connection is fully established before proceeding
            const connection = await dbConnect();
            if (!connection) {
              console.error('Failed to establish MongoDB connection');
              throw new Error('Database connection failed');
            }
            
            console.log(`Attempting to find user with email: ${credentials.email}`);
            
            // Find user with matching email - ensure connection is ready
            const user = await User.findOne({ email: credentials.email }).exec();
            
            if (!user) {
              console.error(`User not found with email: ${credentials.email}`);
              throw new Error('No user found with this email');
            }
            
            // For admin login, verify the user is actually an admin
            if (isAdminLogin && !user.isAdmin) {
              console.error(`Admin login attempted for non-admin user: ${credentials.email}`);
              throw new Error('Not authorized as admin');
            }
            
            // Verify password
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            
            if (!isPasswordValid) {
              console.error(`Invalid password for user: ${credentials.email}`);
              throw new Error('Invalid password');
            }
            
            // Update last visit and total visits
            user.lastVisit = new Date();
            user.totalVisits = (user.totalVisits || 0) + 1;
            await user.save();
            
            console.log(`User authenticated successfully: ${credentials.email}`);
            
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
            };
          } catch (dbError) {
            console.error('MongoDB authentication error:', dbError);
            // If MongoDB authentication fails but we have a matching demo user, use that
            if (credentials.email === 'user@example.com' && credentials.password === 'password123' && !isAdminLogin) {
              return {
                id: '1',
                name: 'Demo User',
                email: 'user@example.com',
                isAdmin: false
              };
            } else if (credentials.email === 'admin@example.com' && credentials.password === 'admin123' && isAdminLogin) {
              return {
                id: '2',
                name: 'Demo Admin',
                email: 'admin@example.com',
                isAdmin: true
              };
            }
            throw new Error(`Authentication failed: ${dbError instanceof Error ? dbError.message : 'Database error'}`);
          }
        } catch (error) {
          console.error('Authentication error:', error);
          if (error instanceof Error) {
            throw new Error(`Authentication failed: ${error.message}`);
          } else {
            throw new Error('Authentication failed');
          }
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 