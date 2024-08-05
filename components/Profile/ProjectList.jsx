import React, { createContext, useState } from 'react';
import ProjectCard from '../ProjectCard';
import ProjectPopup from '../ProjectPopupCard/ProjectPopup';

export const SelectedProjectContent = createContext();

const ProjectList = ({ userProject }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null); // Use null instead of an empty array

    const onProjectClick = (item) => {
        // console.log('Selected Project:', item);
        setSelectedProject(item);
        setShowPopup(true);
    };


    return (
        <div className='mt-10 mb-10'>
            {userProject && (
                <div className='columns-2 md:columns-3 lg:columns-4 mx-auto space-y-3 lg:space-y-4'>
                    {userProject.map((item, index) => (
                        <div key={index} onClick={() => onProjectClick(item)}>
                            <ProjectCard project={item} />
                        </div>
                    ))}
                </div>
            )}

            <SelectedProjectContent.Provider value={{ project: selectedProject, setProject: setSelectedProject }}>
                {showPopup && (
                    <ProjectPopup setShowPopup={setShowPopup} />
                )}
            </SelectedProjectContent.Provider>
        </div>
    );
};

export default ProjectList;
