import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDeleteChatMutation } from "../services/ChatAPI";
import { chatSlice } from "../store/reducers/ChatSlice";

const useDeleteChat = (
  chatId: number,
  setDeleteShow: (param: boolean) => void
) => {
  const dispatch = useDispatch();
  const [deleteChat] = useDeleteChatMutation();

  const handleDeleteClick = useCallback(async () => {
    try {
      await deleteChat(chatId).unwrap();
      dispatch(chatSlice.actions.deleteChat(chatId));
      setDeleteShow(false);
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  }, [chatId, dispatch, deleteChat, setDeleteShow]);

  return { handleDeleteClick };
};

export default useDeleteChat;
