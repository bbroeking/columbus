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

  generateMetadata(body: any): Observable<MetadataResponse> {
    const headers = { 'content-type': 'application/json'}
    let req = JSON.stringify([...body]);
    return this.http
               .post<MetadataResponse>(`${API_URL}/api/generate-parcel`, req, {'headers':headers})
  }

  getMetadata(tokenId: string): Observable<ParcelMetadata> {
    return this.http
               .get<ParcelMetadata>(`${API_URL}/api/parcel-metadata/${tokenId}`)
  }

}

