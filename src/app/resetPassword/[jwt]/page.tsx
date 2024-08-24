import { verifyJwt } from "@/lib/jwt"
import ResetPasswordForm from "./ResetPasswordForm";



interface Props{
    params: {
        jwt: string
    }
}


const page = ({params}: Props) => {

  const payload = verifyJwt(params.jwt);

  if(!payload)
    return (
  <div className="w-full h-screen flex items-center justify-center text-red-500 text-2xl">
     <h2>The Url is not valid!</h2>

  </div>)

  
  return (
    <div>
        <ResetPasswordForm  jwtUserId={params.jwt}/>
    </div>
  )
}

export default page