import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase2itemsComponent } from './phase2items.component';

describe('Phase2itemsComponent', () => {
  let component: Phase2itemsComponent;
  let fixture: ComponentFixture<Phase2itemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phase2itemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phase2itemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
