import { IAccountDTO } from "../interfaces-submodule/interfaces/dto/account/iaccount.interface";
import { IAccessDTO } from "../interfaces-submodule/interfaces/dto/auth/iaccess.interface";

interface FieldValidationError {
  name: string;
  errorMessage: string;
}

interface ParamsError {
  name: string;
  value: string;
}

interface ErrorResponse {
  errorCode: string;
  filedsValidationErrors: FieldValidationError[];
  paramsErrors: ParamsError[];
}

interface SuccessResponse {
  access?: IAccessDTO;
  account: IAccountDTO;
  sessionId: string;
}

export interface ApiAuth {
  success: boolean;
  statusCode: number;
  data: SuccessResponse | null;
  error?: ErrorResponse | null;
}
