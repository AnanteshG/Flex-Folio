import Image from 'next/image'
import React from 'react'

const ProjectCard = ({ project }) => {
    return (
        <div className='cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out bg-purple-50 p-2 rounded-lg hover:bg-purple-200'>
            <Image
                src={project.image}
                width={480}
                height={400}
                alt={project.title}
                className='rounded-lg object-cover'
            />
            <p className='text-[13px] mt-2 line-clamp-2'>{project.title}</p>
        </div>
    )
}

export default ProjectCard
