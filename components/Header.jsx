"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const profile_img_placeholder = '/images/profile.jpg';
const logo_img = '/images/logo.png';

function Header() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        document.title = "Flex-Folio";
    })

    useEffect(() => {
        if (status === 'authenticated') {
            const hasShownToast = localStorage.getItem('hasShownLoginToast');
            if (!hasShownToast) {
                toast.success('Login successful!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                localStorage.setItem('hasShownLoginToast', 'true');
            }
        }
    }, [status]);

    const handleAddProjectClick = () => {
        if (session) {
            router.push('/add-project');
        } else {
            toast.info('Login First!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleSignOut = () => {
        toast.info(
            <div className='p-5'>
                <p>Are you sure you want to sign out?</p>
                <button
                    onClick={async () => {
                        await signOut({ redirect: false });
                        toast.dismiss();
                        router.push('/');
                    }}
                    className='bg-red-500 text-white px-4 py-2 rounded mr-2'
                >
                    Yes
                </button>
                <button
                    onClick={() => toast.dismiss()}
                    className='bg-gray-500 text-white px-4 py-2 rounded'
                >
                    No
                </button>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            }
        );
    };

    return (
        <div className='flex justify-between items-center p-4 bg-gray-900 border-b-[2px] border-violet-950'>
            <Link href="/">
                <Image src={logo_img} width={200} height={100} alt="Logo" />
            </Link>
            <ToastContainer />
            <div className='flex items-center gap-3 md:gap-5'>
                <button className='px-6 py-2.5 border-white bg-black transition-all hover:bg-gray-800 hover:text-white text-white rounded-full' onClick={handleAddProjectClick}>
                    <span className='hidden sm:block'>Add Project</span><HiOutlinePencilSquare className='sm:hidden' />
                </button>

                {session ? (
                    <>
                        <button className='px-5 py-2 bg-gray-200 text-black transition-all hover:bg-gray-800 hover:text-white rounded-full' onClick={handleSignOut}>
                            <span className='hidden sm:block'>Sign Out</span><FaSignOutAlt className='sm:hidden' />
                        </button>
                        <div className='w-12 h-12'>
                            <Image src={session.user.image || profile_img_placeholder} width={50} height={50} className='rounded-full cursor-pointer'
                                onClick={() => router.push('/profile')}
                                alt="Profile" />
                        </div>
                    </>
                ) : (
                    <>
                        <button className='px-5 py-2 bg-gray-200 text-black transition-all hover:bg-gray-800 hover:text-white rounded-full' onClick={() => signIn()}>
                            <span className='hidden sm:block'>Sign In</span><FaSignInAlt className='sm:hidden' />
                        </button>
                        <div className='w-12 h-12'>
                            <Image src={profile_img_placeholder} width={50} height={50} className='rounded-full' alt="Profile" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
