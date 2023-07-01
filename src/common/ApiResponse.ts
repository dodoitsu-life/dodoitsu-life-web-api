import { Code } from './code/Code';
import { Nullable } from './type/Types';

export class ApiResponse<TData> {
  public readonly code: number;

  public readonly message: string;

  public readonly data: Nullable<TData>;

  public readonly count?: number;

  private constructor(
    code: number,
    message: string,
    data?: TData,
    count?: number,
  ) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.count = count || undefined;
  }

  public static success<TData>(
    data?: TData,
    count?: number,
    message?: string,
  ): ApiResponse<TData> {
    const resultCode: number = Code.SUCCESS.code;
    const resultMessage: string = message || Code.SUCCESS.message;

    return new ApiResponse(resultCode, resultMessage, data, count);
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
