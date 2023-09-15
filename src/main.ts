// import { otelSdk } from './config/tracer/otel-tracer';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './config/env/constants';
import { mainConfig } from './main.config';

async function bootstrap() {
  // Open Telemetry SDK initialization
  // otelSdk.start();

  // App instance
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      bufferLogs: true,
      ...mainConfig,
    },
  );

  // Environment variables
  const config = app.get(ConfigService);

  // Bind Logger
  app.useLogger(app.get(Logger));
  app.flushLogs();

  // Bind global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: config.get('NODE_ENV') === Environment.prod,
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen();
}
bootstrap();
