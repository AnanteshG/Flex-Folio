import ProjectList from '@/components/Profile/ProjectList';
import UserInfo from '@/components/Profile/UserInfo'
import { app } from '@/shared/firebaseConfig';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const { data: session } = useSession();
    const db = getFirestore(app);
    const [userProject, setUserProject] = useState([]);

    useEffect(() => {
        getUserProject();
    }, [session])

    const getUserProject = async () => {
        setUserProject([]);
        if (session) {
            const q = query(collection(db, 'projects'), where('email', '==', session.user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                setUserProject(userProject =>
                    [...userProject, data]);

            });
        }
    }
    return (
        <div className='px-10'>
            <UserInfo />
            <ProjectList userProject={userProject} />
        </div>
    )
}

export default Profile
