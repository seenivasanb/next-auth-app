"use client"

import Button from '@/components/forms/button';
import Input from '@/components/forms/input';
import { LoginFormType } from '@/types/auth/operations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react'


const LoginPage = ({ logIn }: any) => {

    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [loginForm, setLoginForm] = useState<LoginFormType>({
        username: '',
        password: ''
    });

    const [loginMessage, setLoginMessage] = useState("");
    const onChange = useCallback((e: any) => {
        setLoginForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }));
    }, []);

    const onSubmit = async (e: any) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            const response = await logIn(loginForm);

            if (response?.ok) {
                setLoginMessage("Login succeed")
                router.push("/dashboard");
            } else {
                setLoginMessage(response?.error!);
            }
            setSubmitting(false);
        } catch (error) {
            setLoginMessage("Network error, try later")
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="bg-slate-100 p-8 shadow-md">
            <h2 className='text-2xl text-purple-600 font-bold mb-6'>Login</h2>
            <form onSubmit={onSubmit}
                className="flex flex-col mb-4">
                {loginMessage && <p className="text-pink-600 mb-6">{loginMessage}</p>}
                <Input
                    name="username"
                    placeholder="Enter your username"
                    onChange={onChange} />
                <Input
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    onChange={onChange} />
                {submitting
                    ? <Button name="Submitting" disabled />
                    : <Button name="Login" />
                }
            </form>

            <div className="flex text-slate-500 justify-center">
                Not have an account? <Link className="ml-1 text-purple-600" href="/register">Register</Link>
            </div>
        </div>
    )
}

export default LoginPage