"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import {MdGroups3 } from "react-icons/md";

import { User } from "@prisma/client";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import GroupChatModal from "../../components/modals/GroupChatModal";
import useConversation from "../../hooks/useConversation";
import { pusherClient, pusherEvents } from "../../libs/pusher";
import { FullConversationType } from "../../types";
import ConversationBox from "./Chat_element";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems, users }) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        // skip if the conversation already exists
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });

      if (conversationId == conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind(pusherEvents.UPDATE_CONVERSATION, updateHandler);
    pusherClient.bind(pusherEvents.NEW_CONVERSATION, newHandler);
    pusherClient.bind(pusherEvents.DELETE_CONVERSATION, removeHandler);
  }, [conversationId, pusherKey, router]);

  return (
    <>
      <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <aside
        className={clsx(
          `
          fixed 
          inset-y-0 
          pb-20
          lg:pb-0
          lg:left-20 
          lg:w-80 
          lg:block
          overflow-y-auto 
          border-r 
          border-gray-200 
          dark:border-lightgray
        `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-blue-700 dark:text-red-400">Chats</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="
                rounded-full 
                p-2 
                bg-blue-100 
                text-blue-700 
                cursor-pointer 
                hover:bg-blue-200 
                transition
                dark:bg-red-400
                dark:text-gray-200
                dark:hover:bg-red-500
              "
            >
              <MdGroups3 size={20} />
            </div>
          </div>
          <div className="pb-3">
          {items.map((item) => (
              <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
