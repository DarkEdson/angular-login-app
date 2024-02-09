import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionRegistrosComponent } from './revision-registros.component';

describe('RevisionRegistrosComponent', () => {
  let component: RevisionRegistrosComponent;
  let fixture: ComponentFixture<RevisionRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionRegistrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
