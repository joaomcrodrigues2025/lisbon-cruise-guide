import { NextResponse } from 'next/server';
import { getAllAttractions } from '@/lib/data';

export async function GET() {
  try {
    const attractions = await getAllAttractions();
    return NextResponse.json(attractions);
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return NextResponse.json({ error: 'Failed to fetch attractions' }, { status: 500 });
  }
}
