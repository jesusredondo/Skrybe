import { TestBed } from '@angular/core/testing';

import { UrlServidorService } from './url-servidor.service';

describe('UrlServidorService', () => {
  let service: UrlServidorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlServidorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
