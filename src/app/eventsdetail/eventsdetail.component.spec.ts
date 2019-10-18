import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsdetailComponent } from './eventsdetail.component';

describe('EventsdetailComponent', () => {
  let component: EventsdetailComponent;
  let fixture: ComponentFixture<EventsdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
