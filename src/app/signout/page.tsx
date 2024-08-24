import Nulldata from "@/component/Nulldata"
import { getUser } from "../../../actions/getUser"
import SignOutModal from "./SignOutModal"


const page =async () => {
  const currentUser = await getUser()


  if (!currentUser) {
    return(
      <Nulldata title="Oops!. You have to log-in first." />
  )}

  return (
    <div>
      <SignOutModal />
    </div>
  )
}

export default page