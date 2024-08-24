import Image from "next/image"
import { getUser } from "../../actions/getUser";
import Link from "next/link";


const Navbar = async () => {

    const currentUser = await getUser()
 

  return (
    <div className="w-full border-b-[2px] border-slate-600 shadow-xl">
         <div className="w-10/12 mx-auto flex  justify-between items-center py-4">
            <div>
                <h2 className="text-white font-semibold text-xl">
                    <Link href='/'>
                    Auth
                 </Link>
                </h2>
            </div>
            <div className="text-white ">
                {
                    currentUser ? 
                    (
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                        <Image src={currentUser.image || ''} alt={currentUser.username || ''} width={30}  height={30} className="rounded-full"/>
                        <p>{currentUser.email}</p>
                        </div>
                        <button className="bg-slate-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-slate-950 text-sm">
                            <Link href='/signout'>
                            Sign Out
                            </Link>
                        </button>
                     </div>
                    ) : (null)
                }
            </div>
        </div> 
    </div>
  )
}

export default Navbar