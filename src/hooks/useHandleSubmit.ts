import { useCallback } from "react";
import { useAppDispatch } from "./redux";
import { chatSlice } from "../store/reducers/ChatSlice";
import { useNewChatMutation } from "../services/ChatAPI";

export const useHandleSubmit = (
  chatName: string,
  setChatName: (name: string) => void,
  setAddChat: (flag: boolean) => void
) => {
  const dispatch = useAppDispatch();
  const [addChat] = useNewChatMutation();

  const handleSubmit = useCallback(async () => {
    try {
      const newChat = await addChat(chatName).unwrap();
      dispatch(chatSlice.actions.addChat(newChat.data));
      setChatName("");
      setAddChat(false);
    } catch (err) {
      console.error("Failed to add chat: ", err);
    }
  }, [addChat, chatName, dispatch, setChatName, setAddChat]);

  return handleSubmit;
};
