import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatechooseComponent } from './templatechoose.component';

describe('TemplatechooseComponent', () => {
  let component: TemplatechooseComponent;
  let fixture: ComponentFixture<TemplatechooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatechooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatechooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
