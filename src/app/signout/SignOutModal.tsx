'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";

const SignOutModal = () => {

      const handleSignOut = async () => {
        await signOut({ callbackUrl: '/login' });
        localStorage.removeItem('hasShownWelcome');
      };
  return (
    <div className="w-full h-screen flex items-center justify-center">
         <div className="bg-white w-[400px] flex flex-col items-center justify-center py-10 px-6 rounded-md shadow-md">
               <h2>Are You sure you want to sign-out?</h2>
               <div className="flex items-center justify-center gap-4 mt-4">
                   <button  className="bg-blue-500 text-sm rounded-md py-2 px-4 hover:bg-blue-700 text-white">
                    <Link href='/'>
                      No
                    </Link>
                    </button>
                   <button onClick={handleSignOut} className="bg-red-500 text-sm rounded-md py-2 px-4 hover:bg-red-700 text-white">Yes</button>
               </div>
        </div>
    </div>
  )
}

export default SignOutModal