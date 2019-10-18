import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteventComponent } from './postevent.component';

describe('PosteventComponent', () => {
  let component: PosteventComponent;
  let fixture: ComponentFixture<PosteventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosteventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
