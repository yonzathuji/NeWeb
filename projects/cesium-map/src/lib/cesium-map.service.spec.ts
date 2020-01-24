import { TestBed } from '@angular/core/testing';

import { CesiumMapService } from './cesium-map.service';

describe('CesiumMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CesiumMapService = TestBed.get(CesiumMapService);
    expect(service).toBeTruthy();
  });
});
