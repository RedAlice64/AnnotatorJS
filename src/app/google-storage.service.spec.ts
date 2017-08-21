import { TestBed, inject } from '@angular/core/testing';

import { GoogleStorageService } from './google-storage.service';

describe('GoogleStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleStorageService]
    });
  });

  it('should ...', inject([GoogleStorageService], (service: GoogleStorageService) => {
    expect(service).toBeTruthy();
  }));
});
