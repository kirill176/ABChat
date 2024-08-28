import { IMessageDTO } from "../interfaces-submodule/interfaces/dto/message/imessage-dto";

export interface ApiMessage {
  success: boolean;
  statusCode: number;
  data: IMessageDTO[];
  error: null;
}
