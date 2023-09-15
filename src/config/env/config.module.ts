import { ConfigModule as configModule } from '@nestjs/config';
import { validate } from './env.validation';

/**
 * Module used to access environment varibales (.env file) programatically
 * https://docs.nestjs.com/techniques/configuration
 *
 * @returns {DynamicModule} Nest Application DynamicModule
 */
export const ConfigModule = configModule.forRoot({ cache: true, validate });
