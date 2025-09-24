import LoginForm from '@/components/forms/LoginForm'
import Link from 'next/link'
import React from 'react'

export default function Login() {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <LoginForm></LoginForm>
        </div>
    )
}
