import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmDeleteComponent } from './mat-confirm-delete.component';

describe('MatConfirmDeleteComponent', () => {
  let component: MatConfirmDeleteComponent;
  let fixture: ComponentFixture<MatConfirmDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatConfirmDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
