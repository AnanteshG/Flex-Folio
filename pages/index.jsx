import Head from 'next/head';
import '../app/globals.css';

const metadata = {
    title: "Flex-Folio",
    description: "A Next.js application with authentication using NextAuth",
    keywords: "Next.js, NextAuth, React, Authentication",
    author: "Anantesh G",
};

const Home = () => {
    return (
        <div>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="keywords" content={metadata.keywords} />
                <meta name="author" content={metadata.author} />
            </Head>
            <div className="container">
            </div>
        </div>
    );
};

export default Home;
