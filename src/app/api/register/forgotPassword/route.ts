
import { signJwt } from "@/lib/jwt";
import { compileResetPassTemplate, sendMail } from "@/lib/mail";
import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const body = await req.json(); 
    const { email } = body; 

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'No user with such email' }, { status: 404 });
    }

    // Generate JWT token for user ID
    const jwtUserId = signJwt({
      id: user.id,
    });

    // Prepare the reset password URL
    const safeUsername = user.username || 'User';
    const resetPassUrl = `${process.env.NEXTAUTH_URL}/resetPassword/${jwtUserId}`;

    // Compile the reset password email template
    const template = compileResetPassTemplate(safeUsername, resetPassUrl);

    // Send reset password email
    await sendMail({
      to: user.email as string,
      subject: 'Reset Your Password',
      body: template,
    });

    // Respond with success
    return NextResponse.json({ message: 'Password reset link has been sent to your email' });
  } catch (error) {
    console.error('Error in forgotPassword route:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
