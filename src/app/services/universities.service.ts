import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RemoteService } from './remote.service';
import { IUniversities } from '../models/universities.interface';

@Injectable({
  providedIn: 'root',
})
export class UniversitiesService {
  constructor(private remote: RemoteService) {}

  getData(): Observable<IUniversities[]> {
    return this.remote.get('http://universities.hipolabs.com/search');
  }
}
