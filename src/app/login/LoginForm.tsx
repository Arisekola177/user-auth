'use client'
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {useForm, SubmitHandler, FieldValues} from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import LoadingButton from "@/component/LoadingButton";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

const LoginForm = () => {

  const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

   const {register, handleSubmit,  reset, formState:{errors}} = useForm({
        resolver: zodResolver(FormSchema)
      })

      

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
          toast('Loading, please wait.....')
            setIsLoading(true)
          signIn('credentials', {
             ...data,
           redirect: false
        }).then((response) => {
      if (response?.ok) {
        router.push('/')
        router.refresh()
        toast.success('Logged In')
        setIsLoading(false)
      }
      if (response?.error) {
        toast.error(response.error)
        setIsLoading(false)
      }
    })
      }
  return (
    <div className="w-full flex justify-center items-center px-6 h-screen">
    <div className="bg-white rounded-md shadow-md w-[400px] h-auto py-10 px-6 ">
               <h2 className="text-center font-semibold text-xl mb-6">Welcome Back!</h2>
              <div className="">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
             
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
                <div className={`relative col-span-2  ${errors?.password ? 'mb-3' : 'mb-0'}`}>
                   <Input 
                    {...register('password')}
                    disabled={isLoading}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                  />
                   <FaEyeSlash 
                className={`absolute right-2 top-1/2 text-xs transform -translate-y-1/2 cursor-pointer ${showPassword ? 'hidden' : 'block'}`}
                onClick={() => setShowPassword(true)}
              />
              <FaEye 
                className={`absolute right-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer ${showPassword ? 'block' : 'hidden'}`}
                onClick={() => setShowPassword(false)}
              />
             {errors.password && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.password.message?.toString()}</div>
              )}
                </div>
                <div className='w-full bg-slate-700 text-center mt-2 hover:bg-slate-900 rounded-md shadow-md'>
              <LoadingButton isLoading={isLoading} onClick={handleSubmit(onSubmit)} buttonText="Login" />
           </div>

              </form>
              <Link href='/forgotPassword' className="py-2 text-xs text-slate-800">Forget Password?</Link>
              <p className="text-xs mt-4 text-center font-medium">Don't have an account? <Link className="text-blue-500 hover:underline duration-300" href='/register'>Register</Link> here </p>
      </div>
    </div>
    </div>
  )
}

export default LoginForm