


import Image from 'next/image'
import congratulation from '../../public/images/congratulation.png'

interface UserProp {
  id: string;
  username: string | null;
  email: string | null;
  emailVerified: string | null;
  image: string | null;
  hassedPassword: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface User {
  currentUser: UserProp | null;
}

const Welcome: React.FC<User> = ({ currentUser }) => {
  return (
    <div className='w-full h-screen flex px-4 items-center justify-center overflow-hidden'>
      <div className='w-[500px]  h-auto bg-transparent border-[1px] border-purple-600 rounded-md shadow-md'>
      <h2 className='py-2 text-sm text-center font-medium text-green-500'>
            Thank you {currentUser && currentUser.username} for trying out this feature.
          </h2>
        <div>
          <Image src={congratulation} alt='congrats' />
        </div>
        <div className='flex flex-col items-center justify-center py-4'>
          <h1 className='text-white text-xl font-medium text-center'>
            Congratulations <br /> you have successfully Registered!
          </h1>
       
        </div>  
      </div>
    </div>
  );
}

export default Welcome;
