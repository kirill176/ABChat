import { useAppDispatch } from "./redux";
import {
  useDeleteChatMutation,
  useEditChatMutation,
  useNewChatMutation,
} from "../services/ChatAPI";
import { IChatItem } from "../interfaces-submodule/interfaces/dto/chat/dto/ichat-item";
import { newChat, removeChat, updateChat } from "../store/reducers/ChatSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { setChatId } from "../store/reducers/ChatIdSlice";

export const useChatManager = (
  setShow: (flag: boolean) => void,
  chat?: IChatItem,
  setChatName?: (name: string) => void
) => {
  const dispatch = useAppDispatch();
  const [editChat] = useEditChatMutation();
  const [deleteChat] = useDeleteChatMutation();
  const [addChat] = useNewChatMutation();
  const navigate = useNavigate();

  const handleUpdateChat = async (chatName: string) => {
    try {
      const updatedChat = {
        id: chat?.id ?? 0,
        name: chatName,
        accountId: chat?.accountId ?? 0,
      };
      await editChat(updatedChat);
      dispatch(updateChat(updatedChat));
      setShow(false);
    } catch (err) {
      console.error("Failed to edit chat:", err);
    }
  };

  const handleDeleteChat = useCallback(async () => {
    try {
      await deleteChat(chat?.id ?? 0);
      dispatch(removeChat(chat?.id ?? 0));
      setShow(false);
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  }, [chat?.id]);

  const handleAddChat = useCallback(async (chatName: string) => {
    try {
      const response = await addChat(chatName).unwrap();
      dispatch(newChat(response.data));
      dispatch(setChatId(response.data.id));
      setChatName && setChatName("");
      setShow(false);
      navigate("/chat/assistant");
    } catch (error) {
      console.error("Failed to add chat: ", error);
    }
  }, []);

  return { handleUpdateChat, handleDeleteChat, handleAddChat };
};
