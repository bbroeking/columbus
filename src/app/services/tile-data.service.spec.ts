import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { TileDataService } from './tile-data.service';

describe('TileDataService', () => {
  let service: TileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [
        TileDataService,
        {provide: AngularFirestore, useValue: {}}
      ]
    });
    service = TestBed.inject(TileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
