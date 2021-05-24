import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosepackagesComponent } from './choosepackages.component';

describe('ChoosepackagesComponent', () => {
  let component: ChoosepackagesComponent;
  let fixture: ComponentFixture<ChoosepackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosepackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosepackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
