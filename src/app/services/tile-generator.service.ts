import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Parcel } from '../interfaces/parcel';

@Injectable({
  providedIn: 'root'
})
export class TileGeneratorService {
  constructor(
    private firestore: AngularFirestore) {}

  getOpenParcels(): Observable<Parcel[]> {
    return this.firestore.collection<Parcel>('parcels', ref => ref.where('tokenId', '<', 46))
                          .valueChanges({idField: 'id'});
  }

  updateParcel(tokenId: number, data: Partial<Parcel>) {
    const id = tokenId.toString();
    this.firestore.collection<Parcel>('parcels')
                  .doc(id)
                  .update(data);
  }
}
