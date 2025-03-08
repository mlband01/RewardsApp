import { Restaurant } from '../components/RestaurantCard'

export const restaurants: Restaurant[] = [
  {
    id: 'burger-palace',
    name: 'Burger Palace',
    description: 'Gourmet burgers and craft shakes in a casual, family-friendly atmosphere.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000',
    stars: 12,
    totalStars: 25,
    category: 'Fast Food'
  },
  {
    id: 'pizza-heaven',
    name: 'Pizza Heaven',
    description: 'Authentic wood-fired pizzas with premium toppings and homemade sauce.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000',
    stars: 8,
    totalStars: 15,
    category: 'Italian'
  },
  {
    id: 'sushi-delight',
    name: 'Sushi Delight',
    description: 'Fresh, high-quality sushi and Japanese specialties prepared by master chefs.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000',
    stars: 20,
    totalStars: 30,
    category: 'Japanese'
  },
  {
    id: 'taco-fiesta',
    name: 'Taco Fiesta',
    description: 'Authentic Mexican street tacos and refreshing margaritas in a vibrant setting.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1000',
    stars: 5,
    totalStars: 10,
    category: 'Mexican'
  },
  {
    id: 'pasta-paradise',
    name: 'Pasta Paradise',
    description: 'Handmade pasta and traditional Italian dishes with a modern twist.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1000',
    stars: 15,
    totalStars: 22,
    category: 'Italian'
  },
  {
    id: 'breakfast-barn',
    name: 'Breakfast Barn',
    description: 'All-day breakfast favorites and specialty coffee in a cozy, rustic environment.',
    image: 'https://images.unsplash.com/photo-1533089860892-a9b969df67e3?q=80&w=1000',
    stars: 30,
    totalStars: 45,
    category: 'Breakfast'
  }
]

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id)
}

export const rewardTiers = [
  {
    stars: 10,
    reward: 'Free Beverage',
    description: 'Enjoy a complimentary drink of your choice with any purchase.'
  },
  {
    stars: 20,
    reward: '10% Discount',
    description: 'Receive 10% off your entire order.'
  },
  {
    stars: 30,
    reward: 'Free Appetizer',
    description: 'Choose any appetizer from our menu, on the house!'
  },
  {
    stars: 40,
    reward: '20% Discount',
    description: 'Enjoy 20% off your entire order.'
  },
  {
    stars: 50,
    reward: 'Free Entrée',
    description: 'Select any main dish from our menu for free with any purchase.'
  }
] 