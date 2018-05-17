import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsmainComponent } from './buildingsmain.component';

describe('BuildingsmainComponent', () => {
  let component: BuildingsmainComponent;
  let fixture: ComponentFixture<BuildingsmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingsmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingsmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
