import React, { useContext } from "react";
import ProjectInfo from "./ProjectInfo";
import TechList from "./TechList";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "../../shared/firebaseConfig";
import { SelectedProjectContent } from "../Profile/ProjectList";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function ProjectPopup({ setShowPopup }) {
    const db = getFirestore(app);
    const context = useContext(SelectedProjectContent);

    if (!context) {
        return <div>Context is not available</div>;
    }

    const { project, setProject } = context;
    const { data: session } = useSession();
    const router = useRouter();

    const deleteProject = async () => {
        try {
            await deleteDoc(doc(db, "projects", project.id));
            setShowPopup(false);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting project: ", error);
        }
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl mt-20">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 p-8">
                            <div>
                                <ProjectInfo />
                            </div>
                            <TechList />
                        </div>

                        <div className="flex items-center justify-end p-2 rounded-b">
                            {session?.user.email === project.email ? (
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={deleteProject}
                                >
                                    Delete
                                </button>
                            ) : null}
                            <button
                                className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowPopup(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default ProjectPopup;
