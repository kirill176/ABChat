import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/reducers/MessagesSlice";
import { useSendMessageMutation } from "../services/MessagesAPI";
import { IMessageDTO } from "../interfaces-submodule/interfaces/dto/message/imessage-dto";

export const useChat = (
  chatId: number,
  content: string,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: (prop: boolean) => void
) => {
  const dispatch = useDispatch();
  const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = useCallback(async () => {
    if (content.trim()) {
      try {
        const response = await sendMessage({ chatId, content });
        setIsLoading(true);
        const message: IMessageDTO = {
          id: String(Date.now()),
          content: content,
          created: String(Date.now()),
          isBot: false,
          accountId: 13,
          chatId: chatId,
        };

        if (response.data) {
          dispatch(addMessage(message));
        }
        setContent("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }, [chatId, content, dispatch, sendMessage, setContent]);

  return handleSendMessage;
};
