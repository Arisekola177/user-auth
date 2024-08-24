// import { verifyJwt } from "@/lib/jwt";
// import prisma from '../../../../lib/prisma';
// import bcrypt from 'bcryptjs';

// type ResetPasswordFunc = (jwtUserid: string, password: string)=> Promise <'userNotExist'  | 'success'>;

// export const resetPassword: ResetPasswordFunc = async (jwtUserId, password) => {
//   const payload = verifyJwt(jwtUserId)

//    if(!payload) return 'userNotExist'

//   const userId = payload?.id

//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     }
//   })

//   if(!user) return 'userNotExist'

//   const result = await prisma.user.update({
//     where: {
//       id: userId
//     },
//     data: {
//       hassedPassword: await bcrypt.hash(password, 10)
//     }
//   })
//   if(result) return 'success'
//   else throw new Error('Something went wrong!')
// }


import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jwtUserId, password } = body;

    if (!jwtUserId || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify the JWT to extract user ID
    const payload = verifyJwt(jwtUserId);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const userId = payload.id;

    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
    }

    // Hash the new password
    const newHassedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hassedPassword: newHassedPassword, // Ensure this field matches your schema
      },
    });

    // Respond with success
    return NextResponse.json({ message: 'Password reset successful' });

  } catch (error) {
    console.error('Error in resetPassword route:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

