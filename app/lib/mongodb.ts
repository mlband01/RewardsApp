import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore - Global mongoose connection
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore - Global mongoose connection
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  // Clear any previous promise if it exists but didn't resolve
  if (cached.promise) {
    console.log('Clearing previous MongoDB connection promise');
    cached.promise = null;
  }

  const opts = {
    bufferCommands: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 60000, // Increased timeout for slow connections
    socketTimeoutMS: 60000,
    family: 4, // Use IPv4, skip trying IPv6
    connectTimeoutMS: 60000,
  };

  // Mask the password in the connection string for logging
  const maskedUri = MONGODB_URI?.toString().replace(
    /(mongodb(\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/,
    '$1*****$4'
  );
  
  console.log('Connecting to MongoDB with URI:', maskedUri);
  
  try {
    console.log('Attempting MongoDB connection...');
    
    // Create the connection promise
    cached.promise = mongoose.connect(MONGODB_URI!, opts);
    
    // Wait for the connection to be established
    cached.conn = await cached.promise;
    
    // Ensure the connection is ready
    await new Promise((resolve) => {
      if (cached.conn?.connection.readyState === 1) {
        resolve(true);
      } else {
        cached.conn?.connection.once('connected', () => resolve(true));
      }
    });
    
    console.log('MongoDB connected successfully to database:', 
      cached.conn.connection.db ? cached.conn.connection.db.databaseName : 'unknown');
    
    return cached.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    // Reset the connection promise on failure
    cached.promise = null;
    cached.conn = null;
    
    // Provide detailed error message
    let errorMessage = 'Failed to connect to MongoDB';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
      console.error('Error stack:', error.stack);
    } else {
      errorMessage += `: ${String(error)}`;
    }
    
    // Log additional connection details for debugging
    console.error('Connection details:', {
      uri: maskedUri,
      options: opts
    });
    
    throw new Error(errorMessage);
  }
}

export default dbConnect; 