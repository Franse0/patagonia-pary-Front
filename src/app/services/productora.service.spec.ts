import { TestBed } from '@angular/core/testing';

import { ProductoraService } from './productora.service';

describe('EntidadesService', () => {
  let service: ProductoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
