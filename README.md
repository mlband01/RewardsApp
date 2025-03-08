# Restaurant Rewards App

A web application where users earn stars based on visits to different restaurants, which unlock rewards after reaching certain thresholds.

## Features

- User authentication (login/register)
- Dashboard with restaurant tiles
- Individual restaurant pages with reward tiers
- Visual progress indicators for rewards
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/restaurant-rewards-app.git
cd restaurant-rewards-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

For testing purposes, you can use the following credentials:

- Email: user@example.com
- Password: password

## How It Works

1. Users create an account or log in
2. The dashboard displays a grid of participating restaurants
3. Users can click on a restaurant to view its details and reward tiers
4. Each visit to a restaurant earns the user 1 star for that specific restaurant
5. Stars accumulate and unlock rewards at specific thresholds (10, 20, 30, 40, and 50 stars)
6. Users can view their progress toward each reward tier

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)

## Project Structure

- `/app` - Next.js app directory
  - `/components` - Reusable UI components
  - `/dashboard` - Dashboard page with restaurant tiles
  - `/restaurant/[id]` - Individual restaurant pages
  - `/login` - Login page
  - `/register` - Registration page
  - `/data` - Mock data for restaurants and rewards

## Future Enhancements

- Backend integration with a database
- QR code scanning for visit verification
- Push notifications for new rewards
- Admin panel for managing restaurants and rewards
- User profile page to view all earned rewards
- Social sharing functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details. 