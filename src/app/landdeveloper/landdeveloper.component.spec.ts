import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanddeveloperComponent } from './landdeveloper.component';

describe('LanddeveloperComponent', () => {
  let component: LanddeveloperComponent;
  let fixture: ComponentFixture<LanddeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanddeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanddeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
