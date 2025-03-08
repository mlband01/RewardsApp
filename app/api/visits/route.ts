import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Visit from '@/app/models/Visit';
import User from '@/app/models/User';

// GET /api/visits - Get all visits for a user
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const userId = req.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const visits = await Visit.find({ user: userId })
      .populate('restaurant')
      .sort({ date: -1 });
    
    return NextResponse.json(visits);
  } catch (error) {
    console.error('Error fetching visits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visits' },
      { status: 500 }
    );
  }
}

// POST /api/visits - Record a new visit
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { userId, restaurantId, starsEarned = 1 } = body;
    
    if (!userId || !restaurantId) {
      return NextResponse.json(
        { error: 'User ID and Restaurant ID are required' },
        { status: 400 }
      );
    }
    
    // Create the visit
    const visit = await Visit.create({
      user: userId,
      restaurant: restaurantId,
      date: new Date(),
      starsEarned
    });
    
    // Update user's total visits and stars
    const user = await User.findById(userId);
    
    if (user) {
      user.totalVisits += 1;
      user.totalStars += starsEarned;
      user.lastVisit = new Date();
      
      // Update tier based on total stars
      if (user.totalStars >= 50) {
        user.tier = 'platinum';
      } else if (user.totalStars >= 25) {
        user.tier = 'gold';
      } else if (user.totalStars >= 10) {
        user.tier = 'silver';
      }
      
      await user.save();
    }
    
    // Return the visit with populated restaurant
    const populatedVisit = await Visit.findById(visit._id).populate('restaurant');
    
    return NextResponse.json(populatedVisit, { status: 201 });
  } catch (error) {
    console.error('Error recording visit:', error);
    return NextResponse.json(
      { error: 'Failed to record visit' },
      { status: 500 }
    );
  }
} 