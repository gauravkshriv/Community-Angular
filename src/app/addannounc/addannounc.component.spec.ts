import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddannouncComponent } from './addannounc.component';

describe('AddannouncComponent', () => {
  let component: AddannouncComponent;
  let fixture: ComponentFixture<AddannouncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddannouncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddannouncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
