import { GrpcOptions, Transport } from '@nestjs/microservices';

/**
 * Return default configuration for the microservice App
 *
 * @returns {GrpcOptions} - Main options
 */
export const mainConfig: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['health', 'base'],
    protoPath: [
      './src/resources/healthcheck/proto/health.proto',
      './src/resources/base/proto/base.proto',
    ],
    url: `${process.env.HOST || 'localhost'}:${process.env.PORT || '5000'}`,
  },
};
