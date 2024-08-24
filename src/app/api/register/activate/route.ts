// src/app/api/register/activate/route.ts

import { NextResponse } from 'next/server';
import { activateUser } from '../route';


export async function POST(request: Request) {
  try {
    // Parse the request body
    const { jwtUserId } = await request.json();
    
    if (!jwtUserId) {
      return NextResponse.json({ error: 'JWT User ID is required' }, { status: 400 });
    }

    // Call the activateUser function
    const result = await activateUser(jwtUserId);

    // Handle different results
    if (result === 'userNotExist') {
      return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
    }
    
    if (result === 'alreadyActivated') {
      return NextResponse.json({ message: 'User already activated' }, { status: 200 });
    }
    
    if (result === 'success') {
      return NextResponse.json({ message: 'User activated successfully' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
