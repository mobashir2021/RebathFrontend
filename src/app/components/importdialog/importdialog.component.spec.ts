import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportdialogComponent } from './importdialog.component';

describe('ImportdialogComponent', () => {
  let component: ImportdialogComponent;
  let fixture: ComponentFixture<ImportdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
