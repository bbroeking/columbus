import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CloudFunctionsService } from './cloud-functions.service';
import firebase from "firebase/app";
import { Tile } from './tile-data.service';

export interface UnclaimedLand {
  refresh: number,
  stale_one: boolean,
  flipped_one: boolean,
  attributes_one: Partial<Tile>,
  stale_two: boolean,
  flipped_two: boolean,
  attributes_two: Partial<Tile>,
  stale_three: boolean,
  flipped_three: boolean,
  attributes_three: Partial<Tile>,
  stale_four: boolean,
  flipped_four: boolean,
  attributes_four: Partial<Tile>,
  stale_five: boolean,
  flipped_five: boolean,
  attributes_five: Partial<Tile>,
}

@Injectable({
  providedIn: 'root'
})
export class TileGeneratorService {

  user: firebase.User | null;
  constructor(private cloudFunctionsService: CloudFunctionsService,
    private firestore: AngularFirestore, 
    private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.user.subscribe((user) => {
      this.user = user;
    })
  }

  refreshUnclaimedLands() {
    // return this.cloudFunctionsService.refreshUnclaimedLands({'uid': this.authService.user?.uid})
    return this.cloudFunctionsService.refreshUnclaimedLands({'uid': 'RZLTPoHfBOZII7RLVBvEgG1FTsp2'})
  }

  updateState(data: Partial<UnclaimedLand>){ 
    const userRef: AngularFirestoreDocument<UnclaimedLand> = this.firestore.doc(`unclaimed-land/RZLTPoHfBOZII7RLVBvEgG1FTsp2`);
    userRef.update(data)
  }

  getUnclaimedLand(): Observable<UnclaimedLand | undefined> {
    const userRef: AngularFirestoreDocument<UnclaimedLand> = this.firestore.doc(`unclaimed-land/RZLTPoHfBOZII7RLVBvEgG1FTsp2`);
    return userRef.valueChanges();
  }
}
