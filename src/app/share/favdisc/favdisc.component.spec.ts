import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavdiscComponent } from './favdisc.component';

describe('FavdiscComponent', () => {
  let component: FavdiscComponent;
  let fixture: ComponentFixture<FavdiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavdiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavdiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
