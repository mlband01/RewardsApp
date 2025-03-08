import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Restaurant from '@/app/models/Restaurant';

// GET /api/restaurants - Get all restaurants
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const restaurants = await Restaurant.find({});
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    );
  }
}

// POST /api/restaurants - Create a new restaurant (admin only)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    // In a real app, you would check if the user is an admin here
    
    const body = await req.json();
    const restaurant = await Restaurant.create(body);
    
    return NextResponse.json(restaurant, { status: 201 });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    return NextResponse.json(
      { error: 'Failed to create restaurant' },
      { status: 500 }
    );
  }
} 