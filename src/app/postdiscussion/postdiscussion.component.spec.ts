import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdiscussionComponent } from './postdiscussion.component';

describe('PostdiscussionComponent', () => {
  let component: PostdiscussionComponent;
  let fixture: ComponentFixture<PostdiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostdiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostdiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
