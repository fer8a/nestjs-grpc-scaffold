import { Get, Injectable, OnModuleInit, Param } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BaseById } from '../interfaces/base-by-id.interface';
import { Base } from '../interfaces/base.interface';
import { BaseService } from '../interfaces/base-service.interface';
import { Observable, ReplaySubject, toArray } from 'rxjs';

@Injectable()
export class ClientController implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'base',
      protoPath: join(__dirname, '../proto/base.proto'),
    },
  })
  client: ClientGrpc;

  private baseService: BaseService;

  onModuleInit() {
    this.baseService = this.client.getService<BaseService>('BaseService');
  }

  @Get()
  getMany(): Observable<Base[]> {
    const ids$ = new ReplaySubject<BaseById>();
    ids$.next({ id: 1 });
    ids$.next({ id: 2 });
    ids$.complete();

    const stream = this.baseService.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<Base> {
    return this.baseService.findOne({ id: +id });
  }
}
