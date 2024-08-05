import Head from 'next/head';
import '../app/globals.css';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { app } from '@/shared/firebaseConfig';
import { useEffect, useState } from 'react';
import ProjectList from '@/components/Profile/ProjectList';

const metadata = {
    title: "Flex-Folio",
    description: "A Next.js application with authentication using NextAuth",
    keywords: "Next.js, NextAuth, React, Authentication",
    author: "Anantesh G",
};

const Home = () => {
    const db = getFirestore(app);
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        loadAllProjects();
    }, [])

    const loadAllProjects = async () => {
        const q = query(collection(db, "projects"), orderBy("id", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setProjects(projects => [...projects, doc.data()]);
        });
    }
    return (
        <div className='p-5'>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="keywords" content={metadata.keywords} />
                <meta name="author" content={metadata.author} />
            </Head>
            <h2 className='text-[35px] font-pf-reminder mb-[-15px]'>All Projects</h2>
            {
                projects ?
                    <ProjectList userProject={projects} /> : null
            }
        </div >
    );
};

export default Home;
