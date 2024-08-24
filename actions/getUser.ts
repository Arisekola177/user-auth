
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '../src/lib/prisma'


export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getUser() {
    try {
        const session = await getSession();

        if (!session || !session.user || !session.user.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            },
        
        });

        if (!currentUser) {
            return null;
        }

        const user = {
            ...currentUser,
            createdAt: currentUser.createdAt ? currentUser.createdAt.toISOString() : null,
            updatedAt: currentUser.updatedAt ? currentUser.updatedAt.toISOString() : null,
            emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
        };

        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

      








