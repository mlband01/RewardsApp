export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  lastVisit: string;
  totalVisits: number;
  totalStars: number;
  favoriteRestaurant: string;
  status: 'active' | 'inactive';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

// Function to generate a random date within the last year
const generateRandomDate = (startDate?: Date): string => {
  const start = startDate || new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0];
};

// Function to generate a random phone number
const generateRandomPhone = (): string => {
  return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
};

// Restaurant names for random assignment
const restaurantNames = [
  'Burger Palace',
  'Pizza Heaven',
  'Sushi Delight',
  'Taco Fiesta',
  'Pasta Paradise',
  'Breakfast Barn'
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

// Function to generate a random name
const generateRandomName = (): { firstName: string, lastName: string } => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { firstName, lastName };
};

// Function to generate a realistic email from a name
const generateEmail = (firstName: string, lastName: string): string => {
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

// Generate 200 fake users
export const generateUsers = (): User[] => {
  const users: User[] = [];
  
  for (let i = 1; i <= 200; i++) {
    const { firstName, lastName } = generateRandomName();
    const fullName = `${firstName} ${lastName}`;
    const email = generateEmail(firstName, lastName);
    const joinDate = generateRandomDate();
    const lastVisitDate = generateRandomDate(new Date(joinDate));
    const totalVisits = Math.floor(Math.random() * 50) + 1;
    const totalStars = totalVisits + Math.floor(Math.random() * 20);
    
    // Determine tier based on total stars
    let tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    if (totalStars < 10) {
      tier = 'bronze';
    } else if (totalStars < 25) {
      tier = 'silver';
    } else if (totalStars < 50) {
      tier = 'gold';
    } else {
      tier = 'platinum';
    }
    
    users.push({
      id: `user-${i}`,
      name: fullName,
      email,
      phone: generateRandomPhone(),
      joinDate,
      lastVisit: lastVisitDate,
      totalVisits,
      totalStars,
      favoriteRestaurant: restaurantNames[Math.floor(Math.random() * restaurantNames.length)],
      status: Math.random() > 0.1 ? 'active' : 'inactive', // 90% active, 10% inactive
      tier
    });
  }
  
  return users;
};

// Generate the users once
export const users = generateUsers();

// Function to get a user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Function to search users by name or email
export const searchUsers = (query: string): User[] => {
  const lowerCaseQuery = query.toLowerCase();
  return users.filter(
    user => 
      user.name.toLowerCase().includes(lowerCaseQuery) || 
      user.email.toLowerCase().includes(lowerCaseQuery)
  );
};

// Function to filter users by status
export const filterUsersByStatus = (status: 'active' | 'inactive' | 'all'): User[] => {
  if (status === 'all') return users;
  return users.filter(user => user.status === status);
};

// Function to filter users by tier
export const filterUsersByTier = (tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'all'): User[] => {
  if (tier === 'all') return users;
  return users.filter(user => user.tier === tier);
};

// Function to sort users by a specific field
export const sortUsers = (users: User[], field: keyof User, direction: 'asc' | 'desc'): User[] => {
  return [...users].sort((a, b) => {
    if (direction === 'asc') {
      return a[field] > b[field] ? 1 : -1;
    } else {
      return a[field] < b[field] ? 1 : -1;
    }
  });
}; 