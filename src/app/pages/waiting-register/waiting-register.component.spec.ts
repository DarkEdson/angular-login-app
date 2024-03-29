import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingRegisterComponent } from './waiting-register.component';

describe('WaitingRegisterComponent', () => {
  let component: WaitingRegisterComponent;
  let fixture: ComponentFixture<WaitingRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
