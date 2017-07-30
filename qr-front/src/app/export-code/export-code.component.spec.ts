import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCodeComponent } from './export-code.component';

describe('ExportCodeComponent', () => {
  let component: ExportCodeComponent;
  let fixture: ComponentFixture<ExportCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
