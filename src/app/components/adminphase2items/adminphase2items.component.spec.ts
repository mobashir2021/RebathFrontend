import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminphase2itemsComponent } from './adminphase2items.component';

describe('Adminphase2itemsComponent', () => {
  let component: Adminphase2itemsComponent;
  let fixture: ComponentFixture<Adminphase2itemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Adminphase2itemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Adminphase2itemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
