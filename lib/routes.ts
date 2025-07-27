
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Habit from '@/models/HabitSchema';

export async function GET() {
  try {
    await dbConnect();
    
    const habits = await Habit.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ habits }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch habits' },
      { status: 500 }
    );
  }
}