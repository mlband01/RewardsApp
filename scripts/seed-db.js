// This script seeds the database with initial data
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Define schemas
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  joinDate: Date,
  lastVisit: Date,
  totalVisits: Number,
  totalStars: Number,
  favoriteRestaurant: String,
  status: String,
  tier: String,
  isAdmin: Boolean
});

const RestaurantSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  category: String
});

const RewardSchema = new mongoose.Schema({
  name: String,
  description: String,
  starsRequired: Number,
  tier: String
});

// Create models
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);
const Reward = mongoose.models.Reward || mongoose.model('Reward', RewardSchema);

// Sample data
const restaurants = [
  {
    name: 'Burger Palace',
    description: 'Gourmet burgers and craft shakes in a casual, family-friendly atmosphere.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000',
    category: 'Fast Food'
  },
  {
    name: 'Pizza Heaven',
    description: 'Authentic wood-fired pizzas with premium toppings and homemade sauce.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000',
    category: 'Italian'
  },
  {
    name: 'Sushi Delight',
    description: 'Fresh, high-quality sushi and Japanese specialties prepared by master chefs.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000',
    category: 'Japanese'
  },
  {
    name: 'Taco Fiesta',
    description: 'Authentic Mexican street tacos and refreshing margaritas in a vibrant setting.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1000',
    category: 'Mexican'
  },
  {
    name: 'Pasta Paradise',
    description: 'Handmade pasta and traditional Italian dishes with a modern twist.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1000',
    category: 'Italian'
  },
  {
    name: 'Breakfast Barn',
    description: 'All-day breakfast favorites and specialty coffee in a cozy, rustic environment.',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1000',
    category: 'Breakfast'
  }
];

const rewards = [
  {
    name: 'Free Beverage',
    description: 'Enjoy a complimentary drink of your choice with any purchase.',
    starsRequired: 10,
    tier: 'bronze'
  },
  {
    name: '10% Discount',
    description: 'Receive 10% off your entire order.',
    starsRequired: 20,
    tier: 'silver'
  },
  {
    name: 'Free Appetizer',
    description: 'Choose any appetizer from our menu, on the house!',
    starsRequired: 30,
    tier: 'gold'
  },
  {
    name: '20% Discount',
    description: 'Enjoy 20% off your entire order.',
    starsRequired: 40,
    tier: 'gold'
  },
  {
    name: 'Free Entrée',
    description: 'Select any main dish from our menu for free with any purchase.',
    starsRequired: 50,
    tier: 'platinum'
  }
];

// List of first names
const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
  'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen',
  'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Margaret', 'Anthony', 'Betty', 'Mark', 'Sandra',
  'Donald', 'Ashley', 'Steven', 'Dorothy', 'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna',
  'Kenneth', 'Michelle', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Edward', 'Deborah',
  'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Laura', 'Jeffrey', 'Sharon', 'Ryan', 'Cynthia',
  'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Shirley', 'Eric', 'Angela', 'Jonathan', 'Helen',
  'Stephen', 'Anna', 'Larry', 'Brenda', 'Justin', 'Pamela', 'Scott', 'Nicole', 'Brandon', 'Samantha',
  'Benjamin', 'Katherine', 'Samuel', 'Emma', 'Gregory', 'Ruth', 'Frank', 'Christine', 'Alexander', 'Catherine'
];

// List of last names
const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
  'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
  'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King',
  'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter',
  'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins',
  'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey',
  'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez',
  'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross',
  'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington'
];

// Email domains
const emailDomains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
  'aol.com', 'protonmail.com', 'mail.com', 'zoho.com', 'yandex.com'
];

// Function to generate a random date within the last year
const generateRandomDate = (startDate) => {
  const start = startDate || new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate;
};

// Function to generate a random phone number
const generateRandomPhone = () => {
  return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
};

// Function to generate a realistic email from a name
const generateEmail = (firstName, lastName) => {
  const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
  const random = Math.random();
  
  if (random < 0.33) {
    // firstname.lastname@domain.com
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
  } else if (random < 0.66) {
    // firstinitial.lastname@domain.com
    return `${firstName.charAt(0).toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
  } else {
    // firstnamelastname@domain.com (possibly with a number)
    const useNumber = Math.random() > 0.7;
    const number = useNumber ? Math.floor(Math.random() * 100) : '';
    return `${firstName.toLowerCase()}${lastName.toLowerCase()}${number}@${domain}`;
  }
};

// Seed the database
const seedDB = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Reward.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      phone: '(555) 123-4567',
      joinDate: new Date(),
      lastVisit: new Date(),
      totalVisits: 0,
      totalStars: 0,
      favoriteRestaurant: '',
      status: 'active',
      tier: 'platinum',
      isAdmin: true
    });
    
    console.log('Created admin user');
    
    // Create demo user
    const demoUserPassword = await bcrypt.hash('password', 10);
    await User.create({
      name: 'Demo User',
      email: 'user@example.com',
      password: demoUserPassword,
      phone: '(555) 987-6543',
      joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      lastVisit: new Date(),
      totalVisits: 15,
      totalStars: 20,
      favoriteRestaurant: 'Burger Palace',
      status: 'active',
      tier: 'silver',
      isAdmin: false
    });
    
    console.log('Created demo user');
    
    // Create 200 test users with real names and emails
    const testUsers = [];
    const defaultPassword = await bcrypt.hash('password123', 10);
    
    for (let i = 1; i <= 200; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const fullName = `${firstName} ${lastName}`;
      const email = generateEmail(firstName, lastName);
      const joinDate = generateRandomDate();
      const lastVisitDate = generateRandomDate(joinDate);
      const totalVisits = Math.floor(Math.random() * 50) + 1;
      const totalStars = totalVisits + Math.floor(Math.random() * 20);
      
      // Determine tier based on total stars
      let tier;
      if (totalStars < 10) {
        tier = 'bronze';
      } else if (totalStars < 25) {
        tier = 'silver';
      } else if (totalStars < 50) {
        tier = 'gold';
      } else {
        tier = 'platinum';
      }
      
      testUsers.push({
        name: fullName,
        email,
        password: defaultPassword,
        phone: generateRandomPhone(),
        joinDate,
        lastVisit: lastVisitDate,
        totalVisits,
        totalStars,
        favoriteRestaurant: restaurants[Math.floor(Math.random() * restaurants.length)].name,
        status: Math.random() > 0.1 ? 'active' : 'inactive', // 90% active, 10% inactive
        tier,
        isAdmin: false
      });
      
      // Insert in batches of 50 to avoid overwhelming the database
      if (testUsers.length === 50 || i === 200) {
        await User.insertMany(testUsers);
        testUsers.length = 0; // Clear the array
        console.log(`Created users batch ${Math.ceil(i / 50)} of ${Math.ceil(200 / 50)}`);
      }
    }
    
    console.log('Created 200 test users');
    
    // Create restaurants
    await Restaurant.insertMany(restaurants);
    console.log('Created restaurants');
    
    // Create rewards
    await Reward.insertMany(rewards);
    console.log('Created rewards');
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

// Run the seed function
connectDB().then(() => {
  seedDB();
}); 