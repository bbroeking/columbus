import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../env';

import { MetadataResponse } from '../models/metadata-response.model';
import { ParcelMetadata } from '../models/parcel-metadata.model';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private http: HttpClient) { }

  generateMetadata(): Observable<MetadataResponse> {
    return this.http
               .get<MetadataResponse>(`${API_URL}/api/generate-parcel`)
  }

  getMetadata(tokenId: string): Observable<ParcelMetadata> {
    return this.http
               .get<ParcelMetadata>(`${API_URL}/api/parcel-metadata/${tokenId}`)
  }

}

