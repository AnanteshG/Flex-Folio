import React, { useState, useEffect } from 'react';
import Data from '../../Data';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { FaLink, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { app } from './../../shared/firebaseConfig';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Loader from '../Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

const ProjectForm = () => {
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [file, setFile] = useState(null);
    const [input, setInput] = useState({});
    const [loader, setLoader] = useState(false);
    const [docId, setDocId] = useState(Date.now().toString());
    const { data: session } = useSession();
    const db = getFirestore(app);
    const storage = getStorage(app);
    const router = useRouter();

    useEffect(() => {
        if (session) {
            setInput((values) => ({
                ...values, userName: session.user?.name,
                userImage: session.user?.image,
                email: session.user?.email,
                id: docId,
            }));
        }
    }, [session]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput((values) => ({ ...values, [name]: value }));
    };

    useEffect(() => {
        document.title = 'Flex-Folio';
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleFileRemove = () => {
        setFile(null);
    };

    const handleTechSelect = (tech, isSelected) => {
        if (isSelected) {
            setSelectedTechnologies((prev) => [...prev, tech]);
        } else {
            setSelectedTechnologies((prev) =>
                prev.filter((t) => t !== tech)
            );
        }
    };

    const validateForm = () => {
        const { 'app-demo-url': appDemoUrl, 'github-url': githubUrl, 'linkedin-url': linkedinUrl, instagram } = input;
        if (appDemoUrl && !isValidURL(appDemoUrl)) {
            toast.error('Invalid App Demo URL. Please enter a valid URL.', {
                position: "top-center",
                autoClose: 5000,
            });
            return false;
        }
        if (githubUrl && !isValidURL(githubUrl)) {
            toast.error('Invalid GitHub URL. Please enter a valid URL.', {
                position: "top-center",
                autoClose: 5000,
            });
            return false;
        }
        if (linkedinUrl && !isValidURL(linkedinUrl)) {
            toast.error('Invalid LinkedIn URL. Please enter a valid URL.', {
                position: "top-center",
                autoClose: 5000,
            });
            return false;
        }
        if (instagram && !isValidURL(instagram)) {
            toast.error('Invalid Instagram URL. Please enter a valid URL.', {
                position: "top-center",
                autoClose: 5000,
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoader(true);

        try {
            let imageUrl = null;
            if (file) {
                const storageRef = ref(storage, 'flex-folio-images/' + file.name);
                await uploadBytes(storageRef, file);
                imageUrl = await getDownloadURL(storageRef);
            }
            const updatedInput = {
                ...input,
                technologies: selectedTechnologies,
                image: imageUrl,
            };
            await saveDoc(updatedInput);
            toast.success('Project added successfully!', {
                position: "top-center",
                autoClose: 5000,
            });
        } catch (error) {
            console.error('Error: ', error);
            toast.error('Failed to add project. Please try again.', {
                position: "top-center",
                autoClose: 5000,
            });
        } finally {
            setLoader(false);
            router.push('/');
        }
    };

    const saveDoc = async (data) => {
        try {
            await setDoc(doc(db, 'projects', docId), data);
        } catch (error) {
            console.error('Error adding document: ', error);
            throw error;
        }
    };

    return (
        <>
            <Head>
                <title>Flex-Folio</title>
            </Head>
            <div className="flex justify-center mt-10 shadow-md mx-4 md:mx-56 lg:mx-72 p-5 rounded-md border-2 border-purple-500 bg-purple-200 text-black ">
                {loader && <div className='absolute'><Loader /></div>}
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="text-center mb-6">
                        <h2 className="text-[50px] font-pf-reminder">ADD PROJECT</h2>
                        <h2 className="text-gray-700 font-pf-reminder">
                            Create New Projects and Share it with the Community
                        </h2>
                    </div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        required
                        onChange={handleChange}
                        className="w-full mb-4 border-[1px] border-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                    <textarea
                        name="desc"
                        className="w-full mb-4 border-[1px] border-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                        required
                        onChange={handleChange}
                        placeholder="Write Description here"
                    />
                    <h2 className="mb-3 text-[22px] text-gray-700 font-pf-reminder">
                        Select Technologies
                    </h2>
                    <div className="grid grid-cols-2 mb-4 md:grid-cols-3">
                        {Data.Technology.map((item, index) => (
                            <div key={index} className="flex gap-2 items-center cursor-pointer">
                                <input
                                    id={`technology-${index}`}
                                    onChange={(e) =>
                                        handleTechSelect(
                                            item.name,
                                            e.target.checked
                                        )
                                    }
                                    type="checkbox"
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor={`technology-${index}`}>
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center mb-4">
                        <FaLink className="mr-2 text-gray-600" />
                        <input
                            type="text"
                            name="app-demo-url"
                            placeholder="App Demo Url"
                            onChange={handleChange}
                            className="w-full border-[1px] border-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <FaGithub className="mr-2 text-gray-600" />
                        <input
                            type="text"
                            name="github-url"
                            placeholder="GitHub Source Code Url"
                            onChange={handleChange}
                            className="w-full border-[1px] border-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <FaLinkedin className="mr-2 text-gray-600" />
                        <input
                            type="text"
                            name="linkedin-url"
                            placeholder="LinkedIn Profile"
                            onChange={handleChange}
                            className="w-full border-[1px] border-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <FaInstagram className="mr-2 text-gray-600" />
                        <input
                            type="text"
                            name="instagram"
                            placeholder="Instagram Profile (optional)"
                            onChange={handleChange}
                            className="w-full border-[1px] border-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/gif, image/jpeg, image/png"
                        className="mb-5 border-[1px] border-gray-900 w-full p-2 rounded-md"
                        required
                    />
                    {file && (
                        <div className="mb-4">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="w-full h-auto rounded-md mb-2"
                            />
                            <button
                                type="button"
                                className="text-red-500 hover:underline"
                                onClick={handleFileRemove}
                            >
                                Remove File
                            </button>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default ProjectForm;
