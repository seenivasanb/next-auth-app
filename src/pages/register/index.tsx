import Button from '@/components/forms/button';
import Input from '@/components/forms/input';
import { register } from '@/helpers/auth/operations';
import { RegisterPageType } from '@/types/pages/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

const RegisterPage = ({ onRegister = register }: RegisterPageType) => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [registerMessage, setRegisterMessage] = useState("");
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = useCallback((e: any) => {
        setRegisterForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }));
    }, []);


    const onSubmit = async (e: any) => {
        e.preventDefault();
        const { username, password, confirmPassword } = registerForm;

        if (!username || !password || !confirmPassword) {
            setRegisterMessage("Please fill all the fields!");
            return
        }

        if (password !== confirmPassword) {
            setRegisterMessage("Passwords does not matched!");
            return
        }

        try {
            setSubmitting(true);
            const response = await onRegister(registerForm);

            if (response?.error) {
                setRegisterMessage(response.error);
            } else {
                setRegisterMessage("Register succeed");
                router.push("/dashboard");
            }
            setSubmitting(true);
        } catch (error) {
            setRegisterMessage("Server is not responding");
        } finally {
            setSubmitting(false)
        }
    };

    return (

        <div className="bg-slate-100 p-8 shadow-md">
            <h2 className='text-2xl text-purple-600 font-bold mb-6'>Register</h2>
            <form onSubmit={onSubmit}
                className="flex flex-col mb-4">
                {registerMessage && <p className="text-pink-600 mb-6">{registerMessage}</p>}
                <Input
                    name="username"
                    placeholder="Enter your username"
                    onChange={onChange} />
                <Input
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    onChange={onChange} />
                <Input
                    name="confirmPassword"
                    placeholder="Enter your confirm password"
                    type="password"
                    onChange={onChange} />
                {submitting
                    ? <Button name="Submitting" disabled />
                    : <Button name="Register" />
                }            </form>

            <div className="flex text-slate-500 justify-center">
                Have an account? <Link className="ml-1 text-purple-600" href="/login">Login</Link>
            </div>
        </div>
    )
}

export default RegisterPage;