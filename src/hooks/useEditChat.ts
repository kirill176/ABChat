import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useEditChatMutation } from "../services/ChatAPI";
import { chatSlice } from "../store/reducers/ChatSlice";
import { IChatItem } from "../interfaces-submodule/interfaces/dto/chat/dto/ichat-item";

const useUpdateChat = (
  chat: IChatItem,
  setEditChat: (param: boolean) => void
) => {
  const dispatch = useDispatch();
  const [editChat] = useEditChatMutation();

  const handleUpdateChat = useCallback(
    async (chatName: string) => {
      try {
        const updatedChat = {
          id: chat.id,
          name: chatName,
          accountId: chat.accountId,
        };
        await editChat(updatedChat).unwrap();

        dispatch(chatSlice.actions.updateChat(updatedChat));
        setEditChat(false);
      } catch (err) {
        console.error("Failed to edit chat:", err);
      }
    },
    [chat.id]
  );

  return { handleUpdateChat };
};

export default useUpdateChat;
