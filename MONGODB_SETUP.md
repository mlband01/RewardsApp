# MongoDB Setup for Rewards App

This guide will help you set up MongoDB for the Rewards App.

## Prerequisites

- Node.js and npm installed
- MongoDB Atlas account (free tier is sufficient) or local MongoDB installation

## Setup Steps

### 1. Set Up MongoDB

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (the free tier is sufficient)
3. Set up a database user with password
   - Go to Database Access → Add New Database User
   - Create a username and password (save these for later)
   - Set privileges to "Read and Write to Any Database"
4. Whitelist your IP address
   - Go to Network Access → Add IP Address
   - Add your current IP address or use 0.0.0.0/0 for development (allows access from anywhere)
5. Get your connection string
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string (it will look like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rewardsapp?retryWrites=true&w=majority`)
   - Replace `<username>` and `<password>` with your database user credentials

#### Option B: Local MongoDB Installation

1. Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service
3. Your connection string will be: `mongodb://localhost:27017/rewardsapp`

### 2. Configure Environment Variables

1. Create a `.env.local` file in the project root (if not already created)
2. Add the following variables:

```
MONGODB_URI=your_mongodb_connection_string_here
MONGODB_DB=rewardsapp
NEXTAUTH_SECRET=your_random_secret_here
```

Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string.

For `NEXTAUTH_SECRET`, you can generate a random string using:
```
openssl rand -base64 32
```
or any other random string generator.

### 3. Seed the Database

Run the following command to seed the database with initial data:

```
npm run seed
```

This will:
- Create an admin user (email: admin@example.com, password: admin123)
- Create a demo user (email: user@example.com, password: password)
- Add sample restaurants and rewards

### 4. Start the Application

```
npm run dev
```

## Troubleshooting

### Connection Issues

- Ensure your MongoDB connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Verify that your database user has the correct permissions

### Seeding Issues

- If you encounter errors during seeding, check the MongoDB connection
- Ensure all required environment variables are set correctly

## Database Structure

The application uses the following collections:

- **Users**: Store user information and authentication details
- **Restaurants**: Store restaurant information
- **Visits**: Track user visits to restaurants
- **Rewards**: Define available rewards
- **UserRewards**: Track which rewards users have earned

## API Routes

The application provides the following API routes for database interaction:

- `/api/auth/[...nextauth]`: Authentication endpoints
- `/api/users`: User management
- `/api/users/[id]`: Individual user operations
- `/api/restaurants`: Restaurant management
- `/api/visits`: Visit tracking

## Next Steps

After setting up MongoDB, you can:

1. Customize the models in the `app/models` directory
2. Add more API routes as needed
3. Implement additional features like user profiles or analytics 