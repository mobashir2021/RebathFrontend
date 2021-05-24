import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepComponent } from './salesrep.component';

describe('SalesrepComponent', () => {
  let component: SalesrepComponent;
  let fixture: ComponentFixture<SalesrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
