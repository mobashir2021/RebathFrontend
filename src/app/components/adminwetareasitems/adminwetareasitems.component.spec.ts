import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminwetareasitemsComponent } from './adminwetareasitems.component';

describe('AdminwetareasitemsComponent', () => {
  let component: AdminwetareasitemsComponent;
  let fixture: ComponentFixture<AdminwetareasitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminwetareasitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminwetareasitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
