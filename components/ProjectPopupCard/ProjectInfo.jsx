import React, { useContext, useEffect } from 'react'
import { SelectedProjectContent } from '../Profile/ProjectList';
import UserDetail from './UserDetail';
import Image from 'next/image';

const ProjectInfo = () => {
    const { project, setProject } = useContext(SelectedProjectContent)
    return (
        <div>
            <div>
                <h2 className='font-medium text-[18px] mt-[30px]'>{project.title}</h2>
                <Image src={project.image} alt={project.title}
                    width={500} height={200} className='rounded-lg cursor-pointer'
                    onClick={() => window.open(project.image)} />
                <h2 className='font-bold'>Description</h2>
                <p className='text-[14px] font-light text-gray-500 leading-6 line-clamp-5'>
                    {project.desc}</p>
                <UserDetail />
            </div>
        </div>
    )
}

export default ProjectInfo
