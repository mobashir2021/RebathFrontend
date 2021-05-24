import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetareapackageComponent } from './wetareapackage.component';

describe('WetareapackageComponent', () => {
  let component: WetareapackageComponent;
  let fixture: ComponentFixture<WetareapackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetareapackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetareapackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
