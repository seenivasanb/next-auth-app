import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

type ProviderType = {
    session?: Session,
    children: ReactNode
}

const Provider = ({ session, children }: ProviderType) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Provider