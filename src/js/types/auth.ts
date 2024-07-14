interface Account {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  typeAuth: string;
  accountRole: string;
}

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
  account: Account;
  sessionId: string;
}

export interface ApiAuth {
  success: boolean;
  statusCode: number;
  data: SuccessResponse | null;
  error: ErrorResponse | null;
}
