import { IUpworkFeedDetailItemDTO } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto";

export interface ApiFeedInfo {
  success: boolean;
  statusCode: number;
  data: IUpworkFeedDetailItemDTO;
}
