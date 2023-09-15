import {
  Catch,
  ArgumentsHost,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';

@Catch()
export class RcpExceptionsFilter extends BaseRpcExceptionFilter {
  constructor(private readonly logger: Logger) {
    super();
    this.logger = new Logger(RcpExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof BadRequestException) {
      this.logger.error(exception.getResponse(), 'BadRequestException');
    }

    return super.catch(new RpcException(<object>exception), host);
  }
}
