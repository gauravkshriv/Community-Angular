import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventconfirmComponent } from './eventconfirm.component';

describe('EventconfirmComponent', () => {
  let component: EventconfirmComponent;
  let fixture: ComponentFixture<EventconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
