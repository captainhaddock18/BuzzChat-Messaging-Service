"use client";

import { useMemo, useState } from "react";
import { HiChevronLeft, HiUser } from "react-icons/hi";
import { HiEllipsisHorizontal, HiUsers } from "react-icons/hi2";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";




interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);


;


  return (
    <>
      <div
        className="
      
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
        bg-blue-900
        border-lightgray
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <HiUsers size={30}/>
          ) : (
            <HiUser size={30} className="text-red-500"/>
          )}

          <div className="flex flex-col text-gray-200">
            <div>{conversation.name || otherUser.name}</div>
         
          </div>
        </div>
  
      </div>
    </>
  );
};

export default Header;
