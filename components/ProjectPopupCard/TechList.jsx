import React, { useContext } from 'react';
import { SelectedProjectContent } from '../Profile/ProjectList';
import Image from 'next/image';

function TechList() {
    const { project } =
        useContext(SelectedProjectContent)

    // console.log('TechList Project:', project);
    // console.log('TechList techList:', project?.technologies);
    // console.log('App Demo URL:', project['app-demo-url']);


    return (
        <div className='mt-10 p-5'>
            <h2 className='font-bold'>Technology</h2>
            <div className='grid grid-cols-3 text-center gap-2 mt-2'>
                {project.technologies && project.technologies.length > 0 ? (
                    project.technologies.map((tech, index) => (
                        <h2 key={index} className='border-[1px] border-sky-300 px- rounded-full text-[14px]'>{tech}</h2>
                    ))
                ) : (
                    <p>No technologies listed</p>
                )}
            </div>
            <div className='w-[500px]'>
                <h2 className='font-bold mt-6'>Links</h2>
                {project['app-demo-url'] &&
                    <h2 className='font-light mt-4 cursor-pointer flex items-center gap-2' onClick={() => window.open(project['app-demo-url'])}>
                        <Image src='/images/link.png' width={20} height={20} alt='icon'
                            className='w-[20px]' />
                        {project['app-demo-url']}
                    </h2>
                }
                {project['github-url'] &&
                    <h2 className='font-light mt-4 cursor-pointer flex items-center gap-2' onClick={() => window.open(project['github-url'])}>
                        <Image src='/images/github.png' width={20} height={20} alt='icon'
                            className='w-[20px]' /> {project['github-url']}
                    </h2>
                }
                {project['linkedin-url'] &&
                    <h2 className='font-light max-w-[75ch] flex items-center gap-2 mt-4 cursor-pointer' onClick={() => window.open(project['linkedin-url'])}>
                        <Image src='/images/linkedin.png' width={20} height={20} alt='icon'
                            className='w-[20px]' /> {project['linkedin-url']}
                    </h2>
                }
                {project['instagram'] &&
                    <h2 className='font-light flex items-center gap-2 mt-4 cursor-pointer' onClick={() => window.open(project['instagram'])}>
                        <Image src='/images/insta.png' width={20} height={20} alt='icon'
                            className='w-[20px]' /> {project['instagram']}
                    </h2>
                }
            </div>
        </div>
    );
}

export default TechList;
