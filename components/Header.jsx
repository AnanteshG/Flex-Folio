"use client";
import React from 'react';
import Image from 'next/image';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';

const profile_img_placeholder = '/images/profile.jpg';
const logo_img = '/images/logo.png';

function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <div className='flex justify-between items-center p-4 bg-gray-900 border-b-[2px] border-violet-950'>
            <div>
                <Image src={logo_img} width={200} height={100} alt="Logo" />
            </div>
            <div className='flex items-center gap-3 md:gap-5'>
                <button className='px-6 py-2.5 border-white bg-black transition-all hover:bg-gray-800 hover:text-white text-white rounded-full' onClick={() => router.push('/add-project')}>
                    <span className='hidden sm:block'>Add Project</span><HiOutlinePencilSquare className='sm:hidden' />
                </button>
                {session ? (
                    <>
                        <button className='px-5 py-2 bg-gray-200 text-black transition-all hover:bg-gray-800 hover:text-white rounded-full' onClick={() => signOut()}>
                            <span className='hidden sm:block'>Sign Out</span><FaSignOutAlt className='sm:hidden' />
                        </button>
                        <div className='w-12 h-12'>
                            <Image src={session.user.image || profile_img_placeholder} width={50} height={50} className='rounded-full' alt="Profile" />
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
