import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { compileActivationTemplate, compileResetPassTemplate, sendMail } from '@/lib/mail';
import { signJwt, verifyJwt } from '@/lib/jwt';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { email, password, username } = body;
    const hassedPassword = await bcrypt.hash(password, 10);

    const defaultImageUrl = "https://randomuser.me/api/portraits/men/1.jpg";

  
    const user = await prisma.user.create({
      data: {
        username,
        email,
        hassedPassword, 
        image: defaultImageUrl,
      },
    });

   const jwtUserId = signJwt({
    id: user.id
   })

    const activationUrl = `${process.env.NEXTAUTH_URL}/register/activation/${jwtUserId}`;

  
    const safeUsername = user.username || 'User';
    const template = compileActivationTemplate(safeUsername, activationUrl);


    await sendMail({
      to: user.email as string,
      subject: 'Activate Your Account',
      body: template, 
    });

    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error occurred while creating user:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}


type ActivateUserFunc = (jwtUserid: string)=> Promise <'userNotExist' | 'alreadyActivated' | 'success'>;

export const activateUser:ActivateUserFunc = async (jwtUserId) => {
  const payload = verifyJwt(jwtUserId)

  const userId = payload?.id

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if(!user) return 'userNotExist'
  if(user.emailVerified) return 'alreadyActivated'
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      emailVerified : new Date()
    }
  })
  return 'success'
}





