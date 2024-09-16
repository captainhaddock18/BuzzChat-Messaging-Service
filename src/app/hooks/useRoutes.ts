import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiArrowLeftCircle, HiUser,HiChatBubbleLeftRight } from "react-icons/hi2";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChatBubbleLeftRight,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUser,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        onClick: () => signOut(),
        href: "#",
        icon:HiArrowLeftCircle,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
