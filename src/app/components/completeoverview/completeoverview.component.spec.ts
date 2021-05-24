import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteoverviewComponent } from './completeoverview.component';

describe('CompleteoverviewComponent', () => {
  let component: CompleteoverviewComponent;
  let fixture: ComponentFixture<CompleteoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
