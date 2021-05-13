import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../env';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private http: HttpClient) { }

  generateMetadata(tokenId: number) {
    return this.http
      .get(`${API_URL}/api/parcel/${tokenId}`)
    }
  }
