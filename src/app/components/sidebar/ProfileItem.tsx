"use client";



import { User } from "@prisma/client";

import Avatar from "../Avatar";


interface ProfileItemProps {
  currentUser: User;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ currentUser }) => {
 

  return (
    <>
     
      <div onClick={() => alert(`Account Name: ${currentUser.name}`)} className="cursor-pointer hover:opacity-75 transition">
        <Avatar user={currentUser} />
      </div>
    </>
  );
};

export default ProfileItem;
