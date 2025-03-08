import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

// GET /api/users - Get all users (admin only)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // In a real app, you would check if the user is an admin here
    
    const users = await User.find({}).select('-password');
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user (register)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { name, email, password, phone } = body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      joinDate: new Date(),
      lastVisit: new Date(),
      totalVisits: 0,
      totalStars: 0,
      favoriteRestaurant: '',
      status: 'active',
      tier: 'bronze',
      isAdmin: false
    });
    
    // Don't return the password
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      joinDate: user.joinDate,
      lastVisit: user.lastVisit,
      totalVisits: user.totalVisits,
      totalStars: user.totalStars,
      favoriteRestaurant: user.favoriteRestaurant,
      status: user.status,
      tier: user.tier,
      isAdmin: user.isAdmin
    };
    
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 