# RewardsApp

A rewards application built with Next.js that allows users to track their visits and earn rewards.

## Features

- User authentication with NextAuth.js
- Admin and regular user roles
- Mock authentication for testing without MongoDB
- Responsive design

## Demo Credentials

**Regular User:**
- Email: user@example.com
- Password: password123

**Admin User:**
- Email: admin@example.com
- Password: admin123

## Technologies Used

- Next.js 14
- React
- NextAuth.js
- MongoDB (optional)
- Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with your environment variables (see below)
4. Run the development server: `npm run dev`

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=rewardsapp
NEXTAUTH_SECRET=a_very_long_secret_value_at_least_32_chars
NEXTAUTH_URL=http://localhost:3000
```

Note: The application includes mock authentication, so you can test it without setting up MongoDB.

## Notes

This application was created as a demonstration project. The MongoDB connection is optional as the app includes mock authentication for testing purposes. 