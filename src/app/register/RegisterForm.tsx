'use client'
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {useForm, SubmitHandler, FieldValues} from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingButton from "@/component/LoadingButton";
import axios from 'axios'

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const FormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

const RegisterForm = () => {

    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

   const {register, handleSubmit, watch, reset, formState:{errors}} = useForm({
        resolver: zodResolver(FormSchema)
      })


        const onSubmit: SubmitHandler<FieldValues> = (data) => {
            toast('Loading, please wait.....')
            setIsLoading(true)
              axios.post('/api/register', data)
              .then(() => {
                toast.success('Account created. An activation mail has been sent to your email');
                  setIsLoading(false)
              }).catch((error) => {
                toast.error('Registration failed');
                console.error('Registration error:', error);
              }).finally(() => {
                setIsLoading(false)
                reset()
              });
      }
  return (
    <div className="w-full flex justify-center px-6 items-center h-screen">
    <div className="bg-white rounded-md shadow-md w-[400px] h-auto ">
               <h2 className="text-center font-semibold text-xl py-4">Register</h2>
  
     <div className="px-10 py-10">
              <form  className="flex flex-col gap-4">
              <div className={`relative col-span-2  ${errors?.username ? 'mb-3' : 'mb-0'}`}>
                <Input 
                    {...register('username')}
                    id='username'
                     placeholder="Username"
                     type="text"
                     disabled={isLoading}
                     className="py-2 px-4"
                     required
                  />
                  {errors.username && (
                     <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                      {errors.username.message?.toString()}
                      </div>
                      )}
                </div>
                <div className={`relative col-span-2  ${errors?.email ? 'mb-3' : 'mb-0'}`}>
                <Input 
                    {...register('email')}
                    placeholder="Email"
                     type="email"
                     className="py-2 px-4"
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
                    className="py-2 px-4"
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
                <div className='w-full bg-slate-700 text-center mt-4 hover:bg-slate-900 rounded-md shadow-md'>
              <LoadingButton isLoading={isLoading} onClick={handleSubmit(onSubmit)} buttonText="Register" />
           </div>

              </form>
              <p className="text-xs mt-4 text-center font-medium">Already have an account? <Link className="text-blue-500 hover:underline duration-300" href='/login'>Login</Link> here </p>
      </div>
    </div>
    </div>
  )
}

export default RegisterForm