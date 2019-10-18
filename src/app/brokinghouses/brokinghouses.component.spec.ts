import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokinghousesComponent } from './brokinghouses.component';

describe('BrokinghousesComponent', () => {
  let component: BrokinghousesComponent;
  let fixture: ComponentFixture<BrokinghousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokinghousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokinghousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
