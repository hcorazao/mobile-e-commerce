import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownTimerComponent } from './countdown-timer.component';

describe('CountdownTimerComponent', () => {
  let component: CountdownTimerComponent;
  let fixture: ComponentFixture<CountdownTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownTimerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
