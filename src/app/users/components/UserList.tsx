"use client";

import { useState } from "react";

import { User } from "@prisma/client";


import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const [searchBy, setSearchBy] = useState("");

  const filterBySearch = (user: User) => {
    if (searchBy) {
      const lowerCaseSearch = searchBy.toLocaleLowerCase();
      const email = user.email || "";
      const name = user.name || "";
      return email.includes(lowerCaseSearch) || name.includes(lowerCaseSearch);
    }
    return true;
  };

  return (
    <aside
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        
        block w-full left-0
        border-lightgray
      "
    >
      <div className="px-5">
        <div className="flex-col ">
          <div
            className="
              mt-4
              text-2xl 
              font-bold 
             
            text-red-400
            "
          >
            Users
          </div>
        </div>
        {items.filter(filterBySearch).map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
