import { ApiResponse } from '../ApiResponse';
import { Code } from '../code/Code';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const response: Response = host.switchToHttp().getResponse<Response>();

    let errorResponse: ApiResponse<unknown> = ApiResponse.error(
      Code.INTERNAL_ERROR.code,
      error.message,
    );

    errorResponse = this.handleNestError(error, errorResponse);
    response.status(errorResponse.code).json(errorResponse);
  }

  private handleNestError(
    error: Error,
    errorResponse: ApiResponse<unknown>,
  ): ApiResponse<unknown> {
    if (error instanceof HttpException) {
      errorResponse = ApiResponse.error(error.getStatus(), error.message, null);
    }
    return errorResponse;
  }
}
