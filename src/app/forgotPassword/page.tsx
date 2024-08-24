'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import LoadingButton from "@/component/LoadingButton"
import { toast } from "react-toastify"
import axios from "axios"


const FormSchema = z.object({
   email: z.string().email('Please enter a valid email')
})

type InputType = z.infer<typeof FormSchema>

const forgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, reset, formState:{errors}} = useForm<InputType>({
        resolver: zodResolver(FormSchema)
    })

    
    const onSubmit: SubmitHandler<InputType> = async (data) => {
       toast('Loading, please wait.....')
      setIsLoading(true)
        axios.post('/api/register/forgotPassword', data)
        .then(() => {
          toast.success('A password reset link has been sent to your mail');
            setIsLoading(false)
        }).catch((error) => {
          toast.error('Reset failed');
          console.error('Reset error:', error);
        }).finally(() => {
          setIsLoading(false)
          reset()
        });
      }
  return (
    <div className="w-full flex items-center px-6 justify-center h-screen">
       <form className="w-[500px] h-auto bg-white rounded-md shadow-md p-10">
        <h2  className="text-center text-slate-800 font-medium text-xl mb-4">Forgot Password</h2>
          <h2 className="text-center text-slate-800 font-medium text-lg mb-4">Enter the email linked to your account</h2>
          <div className={`relative col-span-2  ${errors?.email ? 'mb-3' : 'mb-0'}`}>
                <Input 
                    {...register('email')}
                    placeholder="Email"
                     type="email"
                     disabled={isLoading}
                     required
                  />
                   {errors.email && (
                 <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.email.message?.toString()}</div>
              )}
              </div>
              <div className='w-40 bg-slate-700 text-center mt-4 hover:bg-slate-900 rounded-md shadow-md'>
              <LoadingButton isLoading={isLoading} onClick={handleSubmit(onSubmit)} buttonText="Submit" />
           </div>
       </form>
    </div>
  )
}

export default forgotPassword