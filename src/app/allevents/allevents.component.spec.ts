import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlleventsComponent } from './allevents.component';

describe('AlleventsComponent', () => {
  let component: AlleventsComponent;
  let fixture: ComponentFixture<AlleventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlleventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlleventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
