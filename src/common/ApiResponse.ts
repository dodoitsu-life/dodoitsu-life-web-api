import { Code } from './code/Code';
import { Nullable } from './type/Types';

export class ApiResponse<TData> {
  public readonly code: number;

  public readonly message: string;

  public readonly data: Nullable<TData>;

  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
  }

  public static success<TData>(
    data?: TData,
    message?: string,
  ): ApiResponse<TData> {
    const resultCode: number = Code.SUCCESS.code;
    const resultMessage: string = message || Code.SUCCESS.message;

    return new ApiResponse(resultCode, resultMessage, data);
  }

  public static error<TData>(
    code?: number,
    message?: string,
    data?: TData,
  ): ApiResponse<TData> {
    const resultCode: number = code || Code.INTERNAL_ERROR.code;
    const resultMessage: string = message || Code.INTERNAL_ERROR.message;

    return new ApiResponse(resultCode, resultMessage, data);
  }
}
