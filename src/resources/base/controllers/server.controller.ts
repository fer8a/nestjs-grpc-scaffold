import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';
import { BaseById } from '../interfaces/base-by-id.interface';
import { Base } from '../interfaces/base.interface';
import { CacheKey } from '@nestjs/cache-manager';

@Controller('base')
export class ServerController {
  private readonly items: Base[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  constructor(private readonly logger: Logger) {
    this.logger = new Logger(ServerController.name);
  }

  @CacheKey('base')
  @GrpcMethod('BaseService')
  findOne(data: BaseById): Base {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod('BaseService')
  findMany(data$: Observable<BaseById>): Observable<Base> {
    const base$ = new Subject<Base>();

    const onNext = (BaseById: BaseById) => {
      const item = this.items.find(({ id }) => id === BaseById.id);
      base$.next(item);
    };
    const onComplete = () => base$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return base$.asObservable();
  }
}
