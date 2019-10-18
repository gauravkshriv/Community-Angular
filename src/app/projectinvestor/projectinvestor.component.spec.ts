import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectinvestorComponent } from './projectinvestor.component';

describe('ProjectinvestorComponent', () => {
  let component: ProjectinvestorComponent;
  let fixture: ComponentFixture<ProjectinvestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectinvestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectinvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
