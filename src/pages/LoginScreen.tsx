import React from 'react'
import { useAuthStore } from '../../src/store/authStore'
import { Button } from '../../src/components/ui/Button'
import { Input } from '../components/ui/Input'
import { useForm } from 'react-hook-form'
import Error from '../components/ui/Error'


const Login: React.FC = () => {
    const login = useAuthStore((s) => s.login)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: { name: '', email: '' } });


    const onSubmit = (data: { name: string; email: string }) => {
        login({ name: data.name, email: data.email });
    }

    return (
        <div className="grid h-[calc(100vh-100px)] place-items-center p-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10 bg-gradient-to-br from-rose-50 to-blue-50">
                <h1 className="mb-1 text-center text-blue-900 text-2xl font-bold">Mini Dashboard</h1>
                <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">Sign in with any name & email</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <Input
                            {...register("name", { required: "Name field is required", minLength: { value: 3, message: "Name must be at least 3 characters" }, pattern: { value: /^[A-Za-z\s]+$/i, message: "Name must contain only letters and spaces" } })}
                            placeholder="Jane Doe"
                            onBlur={(e) => {
                                const trimmed = e.target.value.trim();
                                setValue("name", trimmed, { shouldValidate: true });
                            }}
                        />
                        <Error message={errors.name?.message} />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <Input
                            {...register("email", {
                                required: "Email is required", pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            onBlur={(e) => {
                                const trimmed = e.target.value.trim();
                                setValue("email", trimmed, { shouldValidate: true });
                            }}
                            placeholder="Jane@gmail.com"
                        />
                        <Error message={errors.email?.message} />
                    </div>
                    <Button className="w-full" type="submit">Continue</Button>
                </form>
                <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">Mock authentication • Data stays in your browser</p>
            </div>
        </div>
    )
}


export default Login