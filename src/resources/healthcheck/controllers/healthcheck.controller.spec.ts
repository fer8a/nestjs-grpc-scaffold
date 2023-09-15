import { createMock } from '@golevelup/ts-jest';
import { HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { Test } from '@nestjs/testing';
import { HealthcheckController } from './healthcheck.controller';

describe('Healthcheck Controller', () => {
  let controller: HealthcheckController;
  let healthService: HealthCheckService;
  let memoryHealth: MemoryHealthIndicator;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthcheckController],
    })
      .useMocker(() => createMock())
      .compile();

    controller = moduleRef.get(HealthcheckController);
    healthService = moduleRef.get(HealthCheckService);
    memoryHealth = moduleRef.get(MemoryHealthIndicator);
  });

  describe('Test healthCheck function', () => {
    it('Should return OK-UP health indicators', async () => {
      const upMock = { memory_heap: { status: 'up' as const } };

      jest.spyOn(memoryHealth, 'checkHeap').mockResolvedValueOnce(upMock);

      const okMock = {
        status: 'ok' as const,
        info: await memoryHealth.checkHeap('memory_heap', 1),
        error: {},
        details: await memoryHealth.checkHeap('memory_heap', 1),
      };

      jest.spyOn(healthService, 'check').mockResolvedValueOnce(okMock);

      const response = await controller.healthCheck();

      expect(healthService.check).toHaveBeenCalled();
      expect(memoryHealth.checkHeap).toHaveBeenCalled();
      expect(response).toBe(okMock);
    });

    it('Should return ERROR-DOWN health indicators', async () => {
      const downMock = { memory_heap: { status: 'down' as const } };

      jest.spyOn(memoryHealth, 'checkHeap').mockResolvedValueOnce(downMock);

      const errorMock = {
        status: 'error' as const,
        info: {},
        error: await memoryHealth.checkHeap('memory_heap', 1),
        details: await memoryHealth.checkHeap('memory_heap', 1),
      };

      jest.spyOn(memoryHealth, 'checkHeap').mockResolvedValueOnce(downMock);
      jest.spyOn(healthService, 'check').mockResolvedValueOnce(errorMock);

      const response = await controller.healthCheck();

      expect(healthService.check).toHaveBeenCalled();
      expect(memoryHealth.checkHeap).toHaveBeenCalled();
      expect(response).toBe(errorMock);
    });
  });
});
