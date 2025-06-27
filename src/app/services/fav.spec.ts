import { TestBed } from '@angular/core/testing';

import { Fav } from './fav';

describe('Fav', () => {
  let service: Fav;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fav);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
