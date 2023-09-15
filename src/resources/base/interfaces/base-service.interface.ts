import { Observable } from 'rxjs';
import { Base } from './base.interface';
import { BaseById } from './base-by-id.interface';

export interface BaseService {
  findOne(data: BaseById): Observable<Base>;
  findMany(upstream: Observable<BaseById>): Observable<Base>;
}
