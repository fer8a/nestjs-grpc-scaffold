import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { BaseModule } from './resources/base/base.module';

@Module({
  imports: [CoreModule, BaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
