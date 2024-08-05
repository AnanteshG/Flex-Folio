import React, { useContext } from 'react';
import { SelectedProjectContent } from '../Profile/ProjectList';
import Image from 'next/image';

function UserDetail() {
    const context = useContext(SelectedProjectContent);
    if (!context) {
        return <div>Context is not available</div>;
    }

    const { project, setProject } = context;

    if (!project) {
        return <div>No project selected</div>;
    }

    return (
        <div className='mt-4 flex gap-5 items-center border-t-[1px] border-gray-200 pt-2'>
            <Image src={project.userImage}
                className='rounded-full'
                alt='user Image' width={40} height={40} />
            <div>
                <h2>{project.userName}</h2>
                <h2 className='text-[14px] font-light'>{project.email}</h2>
            </div>
        </div>
    );
}

export default UserDetail;
