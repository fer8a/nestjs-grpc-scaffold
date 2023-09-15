import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { CacheModule } from '@/config/cache/cache.module';
import { ConfigModule } from '@/config/env/config.module';
import { LoggerModule } from '@/config/logger/logger.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { RcpExceptionsFilter } from '@/core/exceptions/rcp-exception.filter';
import { LogInterceptor } from './interceptors/log.interceptor';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { HealthcheckModule } from '@/resources/healthcheck/healthcheck.module';

@Module({
  imports: [CacheModule, ConfigModule, LoggerModule, HealthcheckModule],
  providers: [
    Logger,
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_FILTER, useClass: RcpExceptionsFilter },
  ],
})
export class CoreModule {}
