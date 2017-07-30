import { TestBed, inject } from '@angular/core/testing';

import { ExportCodeService } from './export-code.service';

describe('ExportCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportCodeService]
    });
  });

  it('should be created', inject([ExportCodeService], (service: ExportCodeService) => {
    expect(service).toBeTruthy();
  }));
});
