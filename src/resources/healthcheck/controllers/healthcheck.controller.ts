import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthcheckController {
  constructor(
    private healthService: HealthCheckService,
    private memory: MemoryHealthIndicator,
  ) {}

  @GrpcMethod('HealthService')
  async health() {
    // Check Services connection
    return this.healthService.check([
      // The process should not use more than 150MB memory
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }
}
