
'use client'
import LoadingButton from "@/component/LoadingButton";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";

interface Props {
    jwtUserId: string
}

const FormSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword']
});

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserId }: Props) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<InputType>({
        resolver: zodResolver(FormSchema)
    });

    const onSubmit: SubmitHandler<InputType> = async (data) => {
        setIsLoading(true);
        toast('Loading, please wait.....');

        try {
            await axios.post('/api/register/resetPassword', {
                jwtUserId,
                password: data.password
            });
            toast.success('Your password has been reset successfully');
            reset();
            router.push('/login');
        } catch (error) {
            toast.error('Reset failed');
            console.error('Reset error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form className="w-[500px] h-auto bg-white flex flex-col gap-2 rounded-md shadow-md p-8" >
                <h2 className="text-center font-medium text-lg text-slate-800 mb-4">Reset Your Password</h2>
                <div className={`relative ${errors?.password ? 'mb-3' : 'mb-0'}`}>
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
                <div className={`relative ${errors?.confirmPassword ? 'mb-3' : 'mb-0'}`}>
                    <Input
                        {...register('confirmPassword')}
                        disabled={isLoading}
                        className="py-2 px-4"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        required
                    />
                    {errors.confirmPassword && (
                        <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.confirmPassword.message?.toString()}</div>
                    )}
                </div>
                <div className='w-full bg-slate-700 text-center mt-4 hover:bg-slate-900 rounded-md shadow-md'>
                    <LoadingButton isLoading={isLoading} onClick={handleSubmit(onSubmit)}  buttonText="Reset" />
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
