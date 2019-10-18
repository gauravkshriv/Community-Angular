import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangpassComponent } from './changpass.component';

describe('ChangpassComponent', () => {
  let component: ChangpassComponent;
  let fixture: ComponentFixture<ChangpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
