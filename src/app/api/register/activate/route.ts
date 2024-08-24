// src/app/api/register/activate/route.ts

import { verifyJwt } from "@/lib/jwt";
import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

export async function POST(req: Request): Promise<NextResponse> {
    try {
      const { jwtUserId } = await req.json();
  
  
      const payload = verifyJwt(jwtUserId);
      console.log('Decoded payload:', payload);
  
      const userId = payload?.id;
  
      if (!userId) {
        return NextResponse.json('userNotExist', { status: 404 });
      }
  
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return NextResponse.json('userNotExist', { status: 404 });
      }
  
      if (user.emailVerified) {
        return NextResponse.json('alreadyActivated', { status: 400 });
      }
  
      await prisma.user.update({
        where: { id: userId },
        data: { emailVerified: new Date() },
      });
  
      console.log('User successfully activated:', userId);
      return NextResponse.json('success');
    } catch (error) {
      console.error('Error in activation:', error);
      return NextResponse.json('error', { status: 500 });
    }
  }
  