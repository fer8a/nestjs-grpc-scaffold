import { Logger, Module } from '@nestjs/common';
import { LoggerModule } from '@/config/logger/logger.module';
import { ServerController } from './controllers/server.controller';
import { ClientController } from './controllers/client.controller';

@Module({
  imports: [LoggerModule],
  controllers: [ServerController, ClientController],
  providers: [Logger],
})
export class BaseModule {}
