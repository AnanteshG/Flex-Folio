import { useSession } from 'next-auth/react';
import React from 'react'
import Image from 'next/image'

const UserInfo = () => {
    const { data: session } = useSession();
    return (
        <div className='mt-12'>
            {session ? <div className='flex flex-col items-center border-b-[5px] pb-4'>
                <Image src={session.user?.image} width={75} height={75} alt='user_image' className='rounded-full' />
                <h1 className='text-[30px] font-bold text-purple-600'>{session.user?.name}</h1>
                <p>{session.user?.email}</p>

            </div> : null}
        </div>
    )
}

export default UserInfo
