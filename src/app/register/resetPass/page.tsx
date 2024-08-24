import ResetPasswordForm from "./ResetPasswordForm"8

interface Props{
    params: {
        jwt: string
    }
}

const ResetPassword = ({params}: Props) => {
  return (
    <div>
        <ResetPasswordForm  jwtUserId={params.jwt}/>
    </div>
  )
}

export default ResetPassword