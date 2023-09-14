"use client"

import Button from '@/components/forms/button'
import { signOut, useSession } from 'next-auth/react'
import React, { memo } from 'react'

const DashboardPage = () => {

    const { data: session }: any = useSession();
    const user = session?.user;

    console.log("Dashboard");

    const handleSignOut = () => {
        signOut({ redirect: true, callbackUrl: "/" });
    }

    return (<div>
        <h2 className='text-2xl text-purple-600 font-bold mb-6'>Dashboard</h2>

        <div className='mb-8 p-8 rounded-md bg-white'>
            <div className="text-xl font-bold mb-6 text-slate-500 border-dotted border-b-2 pb-2">User Info:</div>
            {user && <pre className="text-slate-500">{JSON.stringify(user, null, 2)}</pre>}
        </div>

        <Button name="Signout" onClick={handleSignOut} />
    </div>
    )
}

export default memo(DashboardPage)