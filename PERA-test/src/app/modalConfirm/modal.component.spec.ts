import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalConfirmComponent } from './modal.component';

describe('ModalConfirmComponent', () => {
  let component: ModalConfirmComponent;
  let fixture: ComponentFixture<ModalConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmComponent ],
      providers: [
        NgbActiveModal 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call done(false) when cancel button pressed.', () => {
    var doneButton = fixture.debugElement.query(By.css('.cancel')).nativeElement;
    spyOn(component, 'done');
    doneButton.click();
    expect(component.done).toHaveBeenCalledTimes(1);
    expect(component.done).toHaveBeenCalledWith(false);
  });

  it('should call done(true) when okay button pressed.', () => {
    var doneButton = fixture.debugElement.query(By.css('.okay')).nativeElement;
    spyOn(component, 'done');
    doneButton.click();
    expect(component.done).toHaveBeenCalledTimes(1);
    expect(component.done).toHaveBeenCalledWith(true);
  });
});
