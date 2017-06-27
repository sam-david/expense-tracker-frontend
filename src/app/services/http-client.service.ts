import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class HttpClient {
  http: Http;
  urlPrefix: string;

  constructor(http: Http) {
    this.http = http;
    this.urlPrefix = 'http://localhost:3001';
  }

  get(url) {
    return this.http.get(this.urlPrefix + url);
  }

  post(url, data) {
    return this.http.post(this.urlPrefix + url, data);
  }
}
