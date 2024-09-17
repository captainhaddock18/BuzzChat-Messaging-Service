"use client";



import { User } from "@prisma/client";


import { HiUser } from "react-icons/hi";


interface ProfileItemProps {
  currentUser: User;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ currentUser }) => {
 

  return (
    <>
     
      <div onClick={() => alert(`Account Name: ${currentUser.name}`)} className="cursor-pointer hover:opacity-75 transition">
      <HiUser size={30} className="text-red-500"/>
      </div>
    </>
  );
};

export default ProfileItem;
