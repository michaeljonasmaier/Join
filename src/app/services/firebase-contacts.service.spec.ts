import { TestBed } from '@angular/core/testing';

import { FirebaseContactsService } from './firebase-contacts.service';

describe('FirebaseContactsService', () => {
  let service: FirebaseContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
