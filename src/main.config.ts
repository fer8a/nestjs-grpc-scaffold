import { GrpcOptions, Transport } from '@nestjs/microservices';

/**
 * Return default configuration for the microservice App
 *
 * @returns {GrpcOptions} - Main options
 */
export const mainConfig: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['base', 'health'],
    protoPath: [
      './src/resources/base/proto/base.proto',
      './src/resources/healthcheck/proto/health.proto',
    ],
    url: `${process.env.HOST || 'localhost'}:${process.env.PORT || '5000'}`,
  },
};
