import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RemoteService {
  constructor(protected http: HttpClient) {}

  get(url: string, options?: any, params?: any): Observable<any> {
    return this.http
      .get(url, this.addHeaders(options, params))
      .pipe(catchError(this.handleError.bind(this))) as Observable<any>;
  }

  protected handleError(error: any): any {
    return console.log(error);
  }

  protected addHeaders(options?: any, params?: any): any {
    options = options || [];

    if (!options.headers) {
      options.headers = new HttpHeaders();
    }

    if (params) {
      options.params = params;
    }

    return options;
  }
}
