import { IChatItem } from "../interfaces-submodule/interfaces/dto/chat/dto/ichat-item";

export interface ApiChat {
  data: IChatItem[];
  error: string ;
  statusCode: number;
  success: boolean;
}
