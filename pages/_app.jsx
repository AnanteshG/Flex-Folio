import { SessionProvider } from 'next-auth/react'
import '../app/globals.css'
import Header from '../components/Header'
import { useRouter } from 'next/router';

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}) {
    const router = useRouter();
    return (
        <SessionProvider session={session}>
            <Header />
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp