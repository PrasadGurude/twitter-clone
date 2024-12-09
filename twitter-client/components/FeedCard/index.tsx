import Image from 'next/image'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from 'react-icons/fa';


const FeedCard: React.FC = () => {
    return <div className='border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer '>
        <div className='grid grid-cols-12 gap-2'>
            <div className="col-span-1 ">
                <Image src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png" alt='this is a profile image' height={50} width={50} />
            </div>
            <div className="col-span-11 ">
                <h5>Prasad Gurude</h5>
                <p>
                    Do You Need Canva Pro! lifetime Subscription 🔥

                    If You Need Canva Pro Free Then ;

                    1. Like
                    2. Comment "Canva"
                    3. Repost ( follow me to get it)
                </p>
                <div className='flex justify-between mt-5 text-xl  w-[90%]'>
                    <div className='hover:bg-slate-950 p-2 rounded-full'>
                    <BiMessageRounded/>
                    </div>
                    <div className='hover:bg-slate-950 p-2 rounded-full'>
                        <FaRetweet/>
                    </div>
                    <div className='hover:bg-slate-950 p-2 rounded-full'>
                        <AiOutlineHeart/>
                    </div>
                    <div className='hover:bg-slate-950 p-2 rounded-full'>
                        <BiUpload/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FeedCard