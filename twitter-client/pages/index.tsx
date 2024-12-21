import { FaTwitter } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { LuSearch } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast, { Toaster } from 'react-hot-toast';


import localFont from "next/font/local";
import React, { useCallback } from "react";
import FeedCard from "@/components/FeedCard";
import { GraphQLClient } from "graphql-request";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { log } from "console";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode
}

const SidebarMenueItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <GrHomeRounded />
  },
  {
    title: "Search",
    icon: <LuSearch />
  },
  {
    title: "Notification",
    icon: <IoNotificationsOutline />
  },
  {
    title: "Mail",
    icon: <IoMail />
  },
  {
    title: "Community",
    icon: <FaUserGroup />
  },
  {
    title: "Bookmark",
    icon: <CiBookmark />
  },
  {
    title: "Profile",
    icon: <BsPerson />
  },
  {
    title: "More",
    icon: <FiMoreHorizontal />
  },
]

export default function Home() {

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential
    if (!googleToken) return toast.error("google token not found")
    const {verifyGoogleToken} = await graphQLClient.request(
      verifyUserGoogleTokenQuery,
      { token: googleToken }
    );
    toast.success('verified Sucess')
    console.log(verifyGoogleToken);

    if(verifyGoogleToken) window.localStorage.setItem('token',verifyGoogleToken)
    
  }, [])
 
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 flex justify-start flex-col pt-2 px-2 ">
          <div className="text-3xl h-fit hover:bg-gray-800 rounded-full p-2 mx-2 w-fit cursor-pointer transition-all">
            <FaTwitter />
          </div>
          <div className="mt-1 text-xl font-normal">
            <ul>
              {
                SidebarMenueItems.map(item => <li key={item.title} className="flex flex-row justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-1 w-fit cursor-pointer mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>)
              }
            </ul>
            <div className="px-3 pr-5 font-semibold">
              <button className="border-2 p-2 rounded-full text-black bg-white hover:bg-slate-300 w-full">Post</button>
            </div>
          </div>
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll ">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          <div className="border p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-xl text-center">New to Twitter</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}