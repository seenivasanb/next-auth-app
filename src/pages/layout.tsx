import Provider from '@/components/forms/provider'
import React from 'react'

type LayoutType = {
    children: any
}

const Layout = ({ children }: LayoutType) => {
    return (
        <Provider>
            <main className={`flex min-h-screen flex-col items-center p-24`}>
                <h1 className='text-4xl font-bold text-slate-500 mb-10'><span className="text-purple-600">Next</span> Auth App</h1>
                {children}
            </main>
        </Provider>
    )
}

export default Layout