import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeveventComponent } from './addevevent.component';

describe('AddeveventComponent', () => {
  let component: AddeveventComponent;
  let fixture: ComponentFixture<AddeveventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeveventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeveventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
