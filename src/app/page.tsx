export const revalidate = 0;

import { getUser } from "../../actions/getUser";
import LoginForm from "./login/LoginForm";
import Welcome from '../component/Welcome'


export default async function Home() {
  const currentUser = await getUser()


  if (!currentUser) {
    return(
    <div className="flex items-center justify-center h-screen">
      <LoginForm />
     </div> 
  )}
  return (
    <main className="">
          <Welcome currentUser={currentUser}/> 
    </main>
  );
}
